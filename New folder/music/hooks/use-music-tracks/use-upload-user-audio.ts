import { useMutation, gql } from '@apollo/client';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import type { MusicUploadUserAudioOptions } from './music-track-types.js';

const UPLOAD_USER_AUDIO_MUTATION = gql`
  mutation MusicUploadUserAudio($options: MusicUploadUserAudioOptions!) {
    musicUploadUserAudio(options: $options) {
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
 * A hook to upload and register a new user audio track.
 */
export function useUploadUserAudio() {
  const [mutate, { data, loading, error }] = useMutation(UPLOAD_USER_AUDIO_MUTATION);

  const uploadUserAudio = async (options: MusicUploadUserAudioOptions) => {
    const response = await mutate({
      variables: { options },
    });
    return response.data?.musicUploadUserAudio
      ? MusicTrack.from(response.data.musicUploadUserAudio)
      : undefined;
  };

  return {
    uploadUserAudio,
    data: data?.musicUploadUserAudio ? MusicTrack.from(data.musicUploadUserAudio) : undefined,
    loading,
    error,
  };
}