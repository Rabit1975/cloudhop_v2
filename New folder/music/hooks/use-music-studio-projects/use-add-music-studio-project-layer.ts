import { useMutation, gql } from '@apollo/client';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';

const ADD_MUSIC_STUDIO_PROJECT_LAYER = gql`
  mutation AddMusicStudioProjectLayer($projectId: ID!, $trackId: ID!) {
    musicAddStudioProjectLayer(projectId: $projectId, trackId: $trackId) {
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

export type AddMusicStudioProjectLayerResult = {
  /**
   * Function to execute the mutation.
   */
  addLayer: (projectId: string, trackId: string) => Promise<MusicStudioProject | undefined>;
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
 * Hook to add a track layer to a music studio project.
 * @returns An object containing the add layer function, loading state, and error.
 */
export function useAddMusicStudioProjectLayer(): AddMusicStudioProjectLayerResult {
  const [mutate, { loading, error }] = useMutation(ADD_MUSIC_STUDIO_PROJECT_LAYER);

  const addLayer = async (projectId: string, trackId: string) => {
    const result = await mutate({
      variables: { projectId, trackId },
    });

    if (result.data?.musicAddStudioProjectLayer) {
      return MusicStudioProject.from(result.data.musicAddStudioProjectLayer);
    }
    return undefined;
  };

  return {
    addLayer,
    loading,
    error,
  };
}