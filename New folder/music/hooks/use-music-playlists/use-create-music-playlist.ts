import { useMutation, gql } from '@apollo/client';
import { MusicPlaylist, MusicPlaylistPlain } from '@cloudrabbit/music.entities.music-playlist';
import { MusicCreatePlaylistOptions } from './music-playlist-types.js';

export const CREATE_music_PLAYLIST_MUTATION = gql`
  mutation MusicCreatePlaylist($options: MusicCreatePlaylistOptions!) {
    musicCreatePlaylist(options: $options) {
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

export type UseCreateMusicPlaylistResult = [
  (options: MusicCreatePlaylistOptions) => Promise<MusicPlaylist | undefined>,
  {
    loading: boolean;
    error?: Error;
    data?: MusicPlaylist;
  }
];

/**
 * Hook to create a new music playlist.
 * @returns A tuple containing the create function and mutation state.
 */
export function useCreateMusicPlaylist(): UseCreateMusicPlaylistResult {
  const [mutate, { loading, error, data }] = useMutation(CREATE_music_PLAYLIST_MUTATION);

  const createPlaylist = async (options: MusicCreatePlaylistOptions) => {
    const result = await mutate({
      variables: { options },
    });

    if (result.data?.musicCreatePlaylist) {
      const plain: MusicPlaylistPlain = {
        ...result.data.musicCreatePlaylist,
        tracks: [],
      };
      return MusicPlaylist.from(plain);
    }
    return undefined;
  };

  const playlist = data?.musicCreatePlaylist
    ? MusicPlaylist.from({ ...data.musicCreatePlaylist, tracks: [] })
    : undefined;

  return [
    createPlaylist,
    {
      loading,
      error,
      data: playlist,
    },
  ];
}