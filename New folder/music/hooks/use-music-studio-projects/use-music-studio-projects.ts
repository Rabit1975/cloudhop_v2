import { useQuery, gql } from '@apollo/client';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';

const LIST_MUSIC_STUDIO_PROJECTS = gql`
  query ListMusicStudioProjects($ownerId: ID, $limit: Int, $offset: Int) {
    musicListStudioProjects(ownerId: $ownerId, limit: $limit, offset: $offset) {
      id
      name
      ownerId
      lastEditedAt
      layers {
        id
        title
        artist
        duration
        sourceType
        sourceIdentifier
        thumbnailUrl
        uploaderId
        isPublic
        createdAt
        updatedAt
      }
    }
  }
`;

export type UseMusicStudioProjectsOptions = {
  /**
   * Mock data to return instead of executing the query.
   */
  mockData?: MusicStudioProject[];
  /**
   * Whether to skip the query.
   */
  skip?: boolean;
  /**
   * The max number of items to return.
   */
  limit?: number;
  /**
   * The number of items to skip.
   */
  offset?: number;
};

export type UseMusicStudioProjectsResult = {
  /**
   * The list of music studio projects.
   */
  projects: MusicStudioProject[];
  /**
   * Whether the query is loading.
   */
  loading: boolean;
  /**
   * Any error that occurred during the query.
   */
  error?: Error;
  /**
   * Function to refetch the query.
   */
  refetch: () => void;
};

/**
 * Hook to list music studio projects, optionally filtered by owner.
 * @param ownerId The ID of the owner to filter by.
 * @param options Configuration options for the hook.
 * @returns An object containing the list of projects, loading state, and error.
 */
export function useMusicStudioProjects(
  ownerId?: string,
  options?: UseMusicStudioProjectsOptions
): UseMusicStudioProjectsResult {
  const { mockData, skip, limit, offset } = options || {};

  const { data, loading, error, refetch } = useQuery(LIST_MUSIC_STUDIO_PROJECTS, {
    variables: { ownerId, limit, offset },
    skip: skip || !!mockData,
  });

  if (mockData) {
    return {
      projects: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const projects = data?.musicListStudioProjects
    ? data.musicListStudioProjects.map((p: any) => MusicStudioProject.from(p))
    : [];

  return {
    projects,
    loading,
    error,
    refetch,
  };
}