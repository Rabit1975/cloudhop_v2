import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MusicPlaylist, mockMusicPlaylists } from '@cloudrabbit/music.entities.music-playlist';
import { useListMusicPlaylists } from './use-list-music-playlists.js';

it('should return the list of music playlists', () => {
  // Assuming mockMusicPlaylists() returns MusicPlaylist[] based on error message.
  // If the API explicitly states it returns a single MusicPlaylist, this adjustment might be due to mocking behavior.
  const mockPlaylists: MusicPlaylist[] = mockMusicPlaylists();
  const { result } = renderHook(() => useListMusicPlaylists({ mockData: mockPlaylists }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current[0]).toEqual(mockPlaylists);
  expect(result.current[1].loading).toBe(false);
});

it('should handle loading state', () => {
  const { result } = renderHook(() => useListMusicPlaylists({ skip: true }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current[0]).toBeUndefined();
  // When skip is true, useQuery typically returns loading: false as no actual request is made.
  expect(result.current[1].loading).toBe(false);
});