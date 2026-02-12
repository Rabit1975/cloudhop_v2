import { useQuery, gql } from '@apollo/client';
import { MusicPlaylist, MusicPlaylistPlain } from '@cloudrabbit/music.entities.music-playlist';
import { MusicGetPlaylistOptions } from './music-playlist-types.js';

export const GET_music_PLAYLIST_QUERY = gql`
  query MusicGetPlaylist($options: MusicGetPlaylistOptions!) {
    musicGetPlaylist(options: $options) {
      id
      name
      description
      ownerId
      isPublic
      trackIds
      createdAt
      updatedAt
    }
  }
`;

export type UseGetMusicPlaylistOptions = {
  variables: MusicGetPlaylistOptions;
  mockData?: MusicPlaylist;
  skip?: boolean;
};

export type UseGetMusicPlaylistResult = [
  MusicPlaylist | undefined,
  {
    loading: boolean;
    error?: Error;
    refetch: () => Promise<any>;
  }
];

/**
 * Hook to fetch a single music playlist.
 * @param options - Options containing the playlist ID.
 * @returns A tuple containing the playlist entity and query state.
 */
export function useGetMusicPlaylist(options: UseGetMusicPlaylistOptions): UseGetMusicPlaylistResult {
  const { variables, mockData, skip } = options;

  const { data, loading, error, refetch } = useQuery(GET_music_PLAYLIST_QUERY, {
    variables: { options: variables },
    skip: skip || !!mockData,
  });

  if (mockData) {
    return [
      mockData,
      {
        loading: false,
        error: undefined,
        refetch: async () => {},
      },
    ];
  }

  let playlist: MusicPlaylist | undefined;

  if (data?.musicGetPlaylist) {
    const plain: MusicPlaylistPlain = {
      ...data.musicGetPlaylist,
      tracks: [],
    };
    playlist = MusicPlaylist.from(plain);
  }

  return [
    playlist,
    {
      loading,
      error,
      refetch,
    },
  ];
}