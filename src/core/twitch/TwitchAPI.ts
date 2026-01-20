// TwitchAPI.ts
// Actual HTTP calls to Twitch API (public endpoints)

export interface TwitchStream {
  id: string;
  user_name: string;
  login: string;
  is_live: boolean;
  title: string;
  viewers: number;
  category: string;
}

export interface TwitchStreamInfo {
  id: string;
  user_name: string;
  is_live: boolean;
  title: string;
  viewers: number;
  category: string;
}

export class TwitchAPI {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;

  constructor() {
    // You can use a public client ID for non-authenticated calls
    this.clientId = "kimne78kx3ncx6brgo4mv6wki5h1ko"; // Twitch web client ID
    this.clientSecret = ""; // not needed for public endpoints
  }

  // -----------------------------
  // Internal helper: fetch wrapper
  // -----------------------------
  private async request(url: string, options: any = {}) {
    const headers = {
      "Client-ID": this.clientId,
      "Content-Type": "application/json",
      ...options.headers,
    };

    const res = await fetch(url, { ...options, headers });
    return res.json();
  }

  // -----------------------------
  // Get followed streams (public)
  // -----------------------------
  async getFollowedStreams(): Promise<TwitchStream[]> {
    // Twitch GQL endpoint (public)
    const query = {
      query: `
        query {
          currentUser {
            followedLiveUsers {
              id
              login
              displayName
              stream {
                id
                title
                viewersCount
                game {
                  name
                }
              }
            }
          }
        }
      `,
    };

    const res = await this.request("https://gql.twitch.tv/gql", {
      method: "POST",
      body: JSON.stringify(query),
    });

    const list = res?.data?.currentUser?.followedLiveUsers ?? [];

    return list.map((u: any) => ({
      id: u.id,
      user_name: u.displayName,
      login: u.login,
      is_live: !!u.stream,
      title: u.stream?.title ?? "",
      viewers: u.stream?.viewersCount ?? 0,
      category: u.stream?.game?.name ?? "",
    }));
  }

  // -----------------------------
  // Recommended streams (public)
  // -----------------------------
  async getRecommendedStreams(): Promise<TwitchStream[]> {
    const query = {
      query: `
        query {
          recommendations {
            edges {
              node {
                id
                login
                displayName
                stream {
                  id
                  title
                  viewersCount
                  game {
                    name
                  }
                }
              }
            }
          }
        }
      `,
    };

    const res = await this.request("https://gql.twitch.tv/gql", {
      method: "POST",
      body: JSON.stringify(query),
    });

    const edges = res?.data?.recommendations?.edges ?? [];

    return edges.map((e: any) => ({
      id: e.node.id,
      user_name: e.node.displayName,
      login: e.node.login,
      is_live: !!e.node.stream,
      title: e.node.stream?.title ?? "",
      viewers: e.node.stream?.viewersCount ?? 0,
      category: e.node.stream?.game?.name ?? "",
    }));
  }

  // -----------------------------
  // Get stream info for a channel
  // -----------------------------
  async getStreamInfo(channel: string): Promise<TwitchStreamInfo | null> {
    const query = {
      query: `
        query {
          user(login: "${channel}") {
            id
            displayName
            stream {
              id
              title
              viewersCount
              game {
                name
              }
            }
          }
        }
      `,
    };

    const res = await this.request("https://gql.twitch.tv/gql", {
      method: "POST",
      body: JSON.stringify(query),
    });

    const user = res?.data?.user;

    if (!user) return null;

    return {
      id: user.id,
      user_name: user.displayName,
      is_live: !!user.stream,
      title: user.stream?.title ?? "",
      viewers: user.stream?.viewersCount ?? 0,
      category: user.stream?.game?.name ?? "",
    };
  }

  // -----------------------------
  // Chat messages (optional)
  // -----------------------------
  async getChatMessages(channel: string): Promise<string[]> {
    // Twitch does not expose chat via public HTTP.
    // You can simulate chat by polling the "recent messages" endpoint
    // used by Twitch web clients (undocumented).
    const url = `https://recent-messages.robotty.de/api/v2/recent-messages/${channel}`;
    const res = await fetch(url);
    const data = await res.json();

    return data?.messages ?? [];
  }
}
