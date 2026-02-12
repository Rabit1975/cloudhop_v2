import { useQuery, gql } from '@apollo/client';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import type { MusicGetTrackOptions } from './music-track-types.js';

const GET_TRACK_QUERY = gql`
  query MusicGetTrack($options: MusicGetTrackOptions!) {
    musicGetTrack(options: $options) {
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

export type UseGetMusicTrackOptions = {
  variables: MusicGetTrackOptions;
  mockData?: MusicTrack;
};

/**
 * A hook to fetch details for a specific music track.
 */
export function useGetMusicTrack({ variables, mockData }: UseGetMusicTrackOptions) {
  const { data, loading, error, refetch } = useQuery(GET_TRACK_QUERY, {
    variables: { options: variables },
    skip: !!mockData,
  });

  const track = mockData || (data?.musicGetTrack
    ? MusicTrack.from(data.musicGetTrack)
    : undefined);

  return {
    track,
    loading: loading && !mockData,
    error,
    refetch,
  };
}