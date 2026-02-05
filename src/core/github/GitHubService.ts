export interface GitHubBranch {
  name: string;
  commit: {
    sha: string;
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  protected: boolean;
  ahead: number;
  behind: number;
  forced: boolean;
}

export interface ForcedUpdateInfo {
  branch: string;
  oldSha: string;
  newSha: string;
  forcePushedBy: string;
  timestamp: string;
  commitsLost: number;
}

export class GitHubService {
  private token: string | null = null;
  private repoOwner: string;
  private repoName: string;

  constructor(repoOwner: string, repoName: string) {
    this.repoOwner = repoOwner;
    this.repoName = repoName;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async makeRequest(endpoint: string): Promise<any> {
    const response = await fetch(`https://api.github.com${endpoint}`, {
      headers: {
        Authorization: this.token ? `token ${this.token}` : '',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getAllBranches(): Promise<GitHubBranch[]> {
    const branches = await this.makeRequest(`/repos/${this.repoOwner}/${this.repoName}/branches`);

    return Promise.all(
      branches.map(async (branch: any) => {
        const commits = await this.makeRequest(
          `/repos/${this.repoOwner}/${this.repoName}/commits?sha=${branch.name}&per_page=1`
        );

        return {
          name: branch.name,
          commit: {
            sha: branch.commit.sha,
            message: commits[0]?.commit?.message || '',
            author: {
              name: commits[0]?.commit?.author?.name || '',
              email: commits[0]?.commit?.author?.email || '',
              date: commits[0]?.commit?.author?.date || '',
            },
          },
          protected: branch.protected,
          ahead: 0,
          behind: 0,
          forced: false,
        };
      })
    );
  }

  async checkForcedUpdates(): Promise<ForcedUpdateInfo[]> {
    const branches = await this.getAllBranches();
    const forcedUpdates: ForcedUpdateInfo[] = [];

    for (const branch of branches) {
      try {
        const events = await this.makeRequest(
          `/repos/${this.repoOwner}/${this.repoName}/events?per_page=100`
        );

        const forcePushEvents = events.filter(
          (event: any) =>
            event.type === 'PushEvent' &&
            event.payload.forced &&
            event.payload.ref === `refs/heads/${branch.name}`
        );

        for (const event of forcePushEvents) {
          const commitsLost = event.payload.size - event.payload.distinct_size;

          forcedUpdates.push({
            branch: branch.name,
            oldSha: event.payload.before,
            newSha: event.payload.head,
            forcePushedBy: event.actor.login,
            timestamp: event.created_at,
            commitsLost: commitsLost > 0 ? commitsLost : 0,
          });
        }
      } catch (error) {
        console.warn(`Failed to check forced updates for branch ${branch.name}:`, error);
      }
    }

    return forcedUpdates;
  }

  async getBranchComparison(
    branch1: string,
    branch2: string
  ): Promise<{
    ahead: number;
    behind: number;
    status: string;
  }> {
    try {
      const comparison = await this.makeRequest(
        `/repos/${this.repoOwner}/${this.repoName}/compare/${branch1}...${branch2}`
      );

      return {
        ahead: comparison.ahead_by || 0,
        behind: comparison.behind_by || 0,
        status: comparison.status,
      };
    } catch (error) {
      return { ahead: 0, behind: 0, status: 'unknown' };
    }
  }
}
