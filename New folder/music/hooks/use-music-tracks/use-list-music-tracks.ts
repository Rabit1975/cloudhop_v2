import { useQuery, gql } from '@apollo/client';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import type { MusicListTracksOptions } from './music-track-types.js';

const LIST_TRACKS_QUERY = gql`
  query MusicListTracks($options: MusicListTracksOptions) {
    musicListTracks(options: $options) {
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

export type UseListMusicTracksOptions = {
  variables?: MusicListTracksOptions;
  mockData?: MusicTrack[];
};

/**
 * A hook to fetch a list of music tracks with optional filtering.
 */
export function useListMusicTracks({ variables, mockData }: UseListMusicTracksOptions = {}) {
  const { data, loading, error, refetch } = useQuery(LIST_TRACKS_QUERY, {
    variables: { options: variables },
    skip: !!mockData,
  });

  const tracks = mockData || data?.musicListTracks?.map((track: any) => MusicTrack.from(track)) || [];

  return {
    tracks,
    loading: loading && !mockData,
    error,
    refetch,
  };
}