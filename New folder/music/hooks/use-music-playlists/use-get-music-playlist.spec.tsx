import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MusicPlaylist, mockMusicPlaylists } from '@cloudrabbit/music.entities.music-playlist';
import { useGetMusicPlaylist } from './use-get-music-playlist.js';

it('should return a music playlist', () => {
  // Assuming mockMusicPlaylists() returns MusicPlaylist[] based on error message, taking the first element.
  // If the API explicitly states it returns a single MusicPlaylist, this adjustment might be due to mocking behavior.
  const mockPlaylist: MusicPlaylist = mockMusicPlaylists()[0];
  const { result } = renderHook(() => useGetMusicPlaylist({ variables: { playlistId: '1' }, mockData: mockPlaylist }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current[0]).toEqual(mockPlaylist);
  expect(result.current[1].loading).toBe(false);
});