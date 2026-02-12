import { useMutation, gql } from '@apollo/client';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';

const UPDATE_MUSIC_STUDIO_PROJECT = gql`
  mutation UpdateMusicStudioProject($projectId: ID!, $name: String) {
    musicUpdateStudioProject(projectId: $projectId, name: $name) {
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

export type UpdateMusicStudioProjectResult = {
  /**
   * Function to execute the mutation.
   */
  updateProject: (projectId: string, name: string) => Promise<MusicStudioProject | undefined>;
  /**
   * Whether the mutation is loading.
   */
  loading: boolean;
  /**
   * Any error that occurred during the mutation.
   */
  error?: Error;
};

/**
 * Hook to update a music studio project's details.
 * @returns An object containing the update function, loading state, and error.
 */
export function useUpdateMusicStudioProject(): UpdateMusicStudioProjectResult {
  const [mutate, { loading, error }] = useMutation(UPDATE_MUSIC_STUDIO_PROJECT);

  const updateProject = async (projectId: string, name: string) => {
    const result = await mutate({
      variables: { projectId, name },
    });

    if (result.data?.musicUpdateStudioProject) {
      return MusicStudioProject.from(result.data.musicUpdateStudioProject);
    }
    return undefined;
  };

  return {
    updateProject,
    loading,
    error,
  };
}