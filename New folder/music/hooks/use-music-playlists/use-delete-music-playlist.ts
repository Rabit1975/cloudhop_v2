import { useMutation, gql } from '@apollo/client';
import { MusicDeletePlaylistOptions } from './music-playlist-types.js';

export const DELETE_music_PLAYLIST_MUTATION = gql`
  mutation MusicDeletePlaylist($options: MusicDeletePlaylistOptions!) {
    musicDeletePlaylist(options: $options)
  }
`;

export type UseDeleteMusicPlaylistResult = [
  (options: MusicDeletePlaylistOptions) => Promise<boolean>,
  {
    loading: boolean;
    error?: Error;
    data?: boolean;
  }
];

/**
 * Hook to delete a music playlist.
 * @returns A tuple containing the delete function and mutation state.
 */
export function useDeleteMusicPlaylist(): UseDeleteMusicPlaylistResult {
  const [mutate, { loading, error, data }] = useMutation(DELETE_music_PLAYLIST_MUTATION);

  const deletePlaylist = async (options: MusicDeletePlaylistOptions) => {
    const result = await mutate({
      variables: { options },
    });
    return result.data?.musicDeletePlaylist ?? false;
  };

  return [
    deletePlaylist,
    {
      loading,
      error,
      data: data?.musicDeletePlaylist,
    },
  ];
}