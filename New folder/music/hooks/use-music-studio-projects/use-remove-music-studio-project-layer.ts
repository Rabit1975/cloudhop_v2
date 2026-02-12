import { useMutation, gql } from '@apollo/client';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';

const REMOVE_MUSIC_STUDIO_PROJECT_LAYER = gql`
  mutation RemoveMusicStudioProjectLayer($projectId: ID!, $trackId: ID!) {
    musicRemoveStudioProjectLayer(projectId: $projectId, trackId: $trackId) {
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

export type RemoveMusicStudioProjectLayerResult = {
  /**
   * Function to execute the mutation.
   */
  removeLayer: (projectId: string, trackId: string) => Promise<MusicStudioProject | undefined>;
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
 * Hook to remove a track layer from a music studio project.
 * @returns An object containing the remove layer function, loading state, and error.
 */
export function useRemoveMusicStudioProjectLayer(): RemoveMusicStudioProjectLayerResult {
  const [mutate, { loading, error }] = useMutation(REMOVE_MUSIC_STUDIO_PROJECT_LAYER);

  const removeLayer = async (projectId: string, trackId: string) => {
    const result = await mutate({
      variables: { projectId, trackId },
    });

    if (result.data?.musicRemoveStudioProjectLayer) {
      return MusicStudioProject.from(result.data.musicRemoveStudioProjectLayer);
    }
    return undefined;
  };

  return {
    removeLayer,
    loading,
    error,
  };
}