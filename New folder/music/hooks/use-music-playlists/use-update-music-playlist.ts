import { useMutation, gql } from '@apollo/client';
import { MusicPlaylist, MusicPlaylistPlain } from '@cloudrabbit/music.entities.music-playlist';
import { MusicUpdatePlaylistOptions } from './music-playlist-types.js';

export const UPDATE_music_PLAYLIST_MUTATION = gql`
  mutation MusicUpdatePlaylist($options: MusicUpdatePlaylistOptions!) {
    musicUpdatePlaylist(options: $options) {
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

export type UseUpdateMusicPlaylistResult = [
  (options: MusicUpdatePlaylistOptions) => Promise<MusicPlaylist | undefined>,
  {
    loading: boolean;
    error?: Error;
    data?: MusicPlaylist;
  }
];

/**
 * Hook to update a music playlist.
 * @returns A tuple containing the update function and mutation state.
 */
export function useUpdateMusicPlaylist(): UseUpdateMusicPlaylistResult {
  const [mutate, { loading, error, data }] = useMutation(UPDATE_music_PLAYLIST_MUTATION);

  const updatePlaylist = async (options: MusicUpdatePlaylistOptions) => {
    const result = await mutate({
      variables: { options },
    });

    if (result.data?.musicUpdatePlaylist) {
      const plain: MusicPlaylistPlain = {
        ...result.data.musicUpdatePlaylist,
        tracks: [],
      };
      return MusicPlaylist.from(plain);
    }
    return undefined;
  };

  const playlist = data?.musicUpdatePlaylist
    ? MusicPlaylist.from({ ...data.musicUpdatePlaylist, tracks: [] })
    : undefined;

  return [
    updatePlaylist,
    {
      loading,
      error,
      data: playlist,
    },
  ];
}