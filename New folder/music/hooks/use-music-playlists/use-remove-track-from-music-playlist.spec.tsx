import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useRemoveTrackFromMusicPlaylist } from './use-remove-track-from-music-playlist.js';

// Mocking the useMutation hook
const mockRemoveTrackMutation = vi.fn();

vi.mock('@apollo/client', async () => {
  const actualApolloClient = await vi.importActual('@apollo/client');
  return {
    ...actualApolloClient,
    useMutation: vi.fn(() => [mockRemoveTrackMutation, { loading: false, error: undefined, data: undefined }]),
  };
});

it('should call the removeTrack function', async () => {
  // This mock object represents the GraphQL response shape, which includes `trackIds`.
  // The type annotation `MusicPlaylistPlain` has been removed to avoid type conflicts,
  // as MusicPlaylistPlain is expected to have `tracks` not `trackIds`.
  const mockPlaylistPlain = {
    id: 'playlist1',
    name: 'Test Playlist',
    ownerId: 'user1',
    isPublic: true,
    trackIds: [], // Track removed
    createdAt: '2023-01-01T00:00:00Z',
    description: 'A test playlist',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  mockRemoveTrackMutation.mockResolvedValueOnce({
    data: {
      musicRemoveTrackFromPlaylist: mockPlaylistPlain,
    },
  });

  const { result } = renderHook(() => useRemoveTrackFromMusicPlaylist(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  const removeTrack = result.current[0];
  const mockTrackOptions = { playlistId: '123', trackId: '456' };

  await act(async () => {
    await removeTrack(mockTrackOptions);
  });

  expect(mockRemoveTrackMutation).toHaveBeenCalledWith({
    variables: { options: mockTrackOptions },
  });
});