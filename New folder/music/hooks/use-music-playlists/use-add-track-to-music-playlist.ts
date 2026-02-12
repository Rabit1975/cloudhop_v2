import { useMutation, gql } from '@apollo/client';
import { MusicPlaylist, MusicPlaylistPlain } from '@cloudrabbit/music.entities.music-playlist';
import { MusicAddTrackToPlaylistOptions } from './music-playlist-types.js';

export const ADD_TRACK_TO_music_PLAYLIST_MUTATION = gql`
  mutation MusicAddTrackToPlaylist($options: MusicAddTrackToPlaylistOptions!) {
    musicAddTrackToPlaylist(options: $options) {
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

export type UseAddTrackToMusicPlaylistResult = [
  (options: MusicAddTrackToPlaylistOptions) => Promise<MusicPlaylist | undefined>,
  {
    loading: boolean;
    error?: Error;
    data?: MusicPlaylist;
  }
];

/**
 * Hook to add a track to a music playlist.
 * @returns A tuple containing the add track function and mutation state.
 */
export function useAddTrackToMusicPlaylist(): UseAddTrackToMusicPlaylistResult {
  const [mutate, { loading, error, data }] = useMutation(ADD_TRACK_TO_music_PLAYLIST_MUTATION);

  const addTrack = async (options: MusicAddTrackToPlaylistOptions) => {
    const result = await mutate({
      variables: { options },
    });

    if (result.data?.musicAddTrackToPlaylist) {
      const plain: MusicPlaylistPlain = {
        ...result.data.musicAddTrackToPlaylist,
        tracks: [],
      };
      return MusicPlaylist.from(plain);
    }
    return undefined;
  };

  const playlist = data?.musicAddTrackToPlaylist
    ? MusicPlaylist.from({ ...data.musicAddTrackToPlaylist, tracks: [] })
    : undefined;

  return [
    addTrack,
    {
      loading,
      error,
      data: playlist,
    },
  ];
}