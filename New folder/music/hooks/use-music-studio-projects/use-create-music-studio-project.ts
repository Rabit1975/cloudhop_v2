import { useMutation, gql } from '@apollo/client';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';

const CREATE_MUSIC_STUDIO_PROJECT = gql`
  mutation CreateMusicStudioProject($name: String!) {
    musicCreateStudioProject(name: $name) {
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

export type CreateMusicStudioProjectResult = {
  /**
   * Function to execute the mutation.
   */
  createProject: (name: string) => Promise<MusicStudioProject | undefined>;
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
 * Hook to create a new music studio project.
 * @returns An object containing the create function, loading state, and error.
 */
export function useCreateMusicStudioProject(): CreateMusicStudioProjectResult {
  const [mutate, { loading, error }] = useMutation(CREATE_MUSIC_STUDIO_PROJECT);

  const createProject = async (name: string) => {
    const result = await mutate({
      variables: { name },
    });

    if (result.data?.musicCreateStudioProject) {
      return MusicStudioProject.from(result.data.musicCreateStudioProject);
    }
    return undefined;
  };

  return {
    createProject,
    loading,
    error,
  };
}