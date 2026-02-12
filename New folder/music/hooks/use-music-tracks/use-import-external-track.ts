import { useMutation, gql } from '@apollo/client';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import type { MusicImportExternalTrackOptions } from './music-track-types.js';

const IMPORT_EXTERNAL_TRACK_MUTATION = gql`
  mutation MusicImportExternalTrack($options: MusicImportExternalTrackOptions!) {
    musicImportExternalTrack(options: $options) {
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
`;

/**
 * A hook to import an external track (e.g. from YouTube) into the library.
 */
export function useImportExternalTrack() {
  const [mutate, { data, loading, error }] = useMutation(IMPORT_EXTERNAL_TRACK_MUTATION);

  const importExternalTrack = async (options: MusicImportExternalTrackOptions) => {
    const response = await mutate({
      variables: { options },
    });
    return response.data?.musicImportExternalTrack
      ? MusicTrack.from(response.data.musicImportExternalTrack)
      : undefined;
  };

  return {
    importExternalTrack,
    data: data?.musicImportExternalTrack ? MusicTrack.from(data.musicImportExternalTrack) : undefined,
    loading,
    error,
  };
}