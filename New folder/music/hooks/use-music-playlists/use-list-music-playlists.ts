import { useQuery, gql } from '@apollo/client';
import { MusicPlaylist, MusicPlaylistPlain } from '@cloudrabbit/music.entities.music-playlist';
import { MusicListPlaylistsOptions } from './music-playlist-types.js';

export const LIST_music_PLAYLISTS_QUERY = gql`
  query MusicListPlaylists($options: MusicListPlaylistsOptions) {
    musicListPlaylists(options: $options) {
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

export type UseListMusicPlaylistsOptions = {
  variables?: MusicListPlaylistsOptions;
  mockData?: MusicPlaylist[];
  skip?: boolean;
};

export type UseListMusicPlaylistsResult = [
  MusicPlaylist[] | undefined,
  {
    loading: boolean;
    error?: Error;
    refetch: () => Promise<any>;
  }
];

/**
 * Hook to list music playlists.
 * @param options - Options for filtering and pagination.
 * @returns A tuple containing the list of playlists and query state.
 */
export function useListMusicPlaylists(options?: UseListMusicPlaylistsOptions): UseListMusicPlaylistsResult {
  const { variables, mockData, skip } = options || {};

  const { data, loading, error, refetch } = useQuery(LIST_music_PLAYLISTS_QUERY, {
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

  const playlists = data?.musicListPlaylists?.map((item: any) => {
    // Mapping GraphQL response (trackIds) to Entity expectation (tracks)
    // Since GraphQL only returns IDs, we initialize tracks as empty.
    const plain: MusicPlaylistPlain = {
      ...item,
      tracks: [],
    };
    return MusicPlaylist.from(plain);
  });

  return [
    playlists,
    {
      loading,
      error,
      refetch,
    },
  ];
}