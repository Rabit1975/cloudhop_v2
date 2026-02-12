import { useQuery, gql } from '@apollo/client';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';

const GET_MUSIC_STUDIO_PROJECT = gql`
  query GetMusicStudioProject($projectId: ID!) {
    musicGetStudioProject(projectId: $projectId) {
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

export type UseMusicStudioProjectOptions = {
  /**
   * Mock data to return instead of executing the query.
   */
  mockData?: MusicStudioProject;
  /**
   * Whether to skip the query.
   */
  skip?: boolean;
};

export type UseMusicStudioProjectResult = {
  /**
   * The requested music studio project.
   */
  project?: MusicStudioProject;
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
 * Hook to fetch a single music studio project by ID.
 * @param projectId The ID of the project to fetch.
 * @param options Configuration options for the hook.
 * @returns An object containing the project, loading state, and error.
 */
export function useMusicStudioProject(
  projectId: string,
  options?: UseMusicStudioProjectOptions
): UseMusicStudioProjectResult {
  const { mockData, skip } = options || {};

  const { data, loading, error, refetch } = useQuery(GET_MUSIC_STUDIO_PROJECT, {
    variables: { projectId },
    skip: skip || !!mockData,
  });

  if (mockData) {
    return {
      project: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const project = data?.musicGetStudioProject
    ? MusicStudioProject.from(data.musicGetStudioProject)
    : undefined;

  return {
    project,
    loading,
    error,
    refetch,
  };
}