import { useMutation, gql } from '@apollo/client';
import { MusicPlaylist, MusicPlaylistPlain } from '@cloudrabbit/music.entities.music-playlist';
import { MusicRemoveTrackFromPlaylistOptions } from './music-playlist-types.js';

export const REMOVE_TRACK_FROM_music_PLAYLIST_MUTATION = gql`
  mutation MusicRemoveTrackFromPlaylist($options: MusicRemoveTrackFromPlaylistOptions!) {
    musicRemoveTrackFromPlaylist(options: $options) {
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

export type UseRemoveTrackFromMusicPlaylistResult = [
  (options: MusicRemoveTrackFromPlaylistOptions) => Promise<MusicPlaylist | undefined>,
  {
    loading: boolean;
    error?: Error;
    data?: MusicPlaylist;
  }
];

/**
 * Hook to remove a track from a music playlist.
 * @returns A tuple containing the remove track function and mutation state.
 */
export function useRemoveTrackFromMusicPlaylist(): UseRemoveTrackFromMusicPlaylistResult {
  const [mutate, { loading, error, data }] = useMutation(REMOVE_TRACK_FROM_music_PLAYLIST_MUTATION);

  const removeTrack = async (options: MusicRemoveTrackFromPlaylistOptions) => {
    const result = await mutate({
      variables: { options },
    });

    if (result.data?.musicRemoveTrackFromPlaylist) {
      const plain: MusicPlaylistPlain = {
        ...result.data.musicRemoveTrackFromPlaylist,
        tracks: [],
      };
      return MusicPlaylist.from(plain);
    }
    return undefined;
  };

  const playlist = data?.musicRemoveTrackFromPlaylist
    ? MusicPlaylist.from({ ...data.musicRemoveTrackFromPlaylist, tracks: [] })
    : undefined;

  return [
    removeTrack,
    {
      loading,
      error,
      data: playlist,
    },
  ];
}