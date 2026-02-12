import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useAddTrackToMusicPlaylist } from './use-add-track-to-music-playlist.js';

// Mocking the useMutation hook
const mockAddTrackMutation = vi.fn();

vi.mock('@apollo/client', async () => {
  const actualApolloClient = await vi.importActual('@apollo/client');
  return {
    ...actualApolloClient,
    useMutation: vi.fn(() => [mockAddTrackMutation, { loading: false, error: undefined, data: undefined }]),
  };
});

it('should call the addTrack function', async () => {
  // This mock object represents the GraphQL response shape, which includes `trackIds`.
  // The type annotation `MusicPlaylistPlain` has been removed to avoid type conflicts,
  // as MusicPlaylistPlain is expected to have `tracks` not `trackIds`.
  const mockPlaylistPlain = {
    id: 'playlist1',
    name: 'Test Playlist',
    ownerId: 'user1',
    isPublic: true,
    trackIds: ['456'],
    createdAt: '2023-01-01T00:00:00Z',
    description: 'A test playlist',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  mockAddTrackMutation.mockResolvedValueOnce({
    data: {
      musicAddTrackToPlaylist: mockPlaylistPlain,
    },
  });

  const { result } = renderHook(() => useAddTrackToMusicPlaylist(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  const addTrack = result.current[0];
  const mockTrackOptions = { playlistId: '123', trackId: '456' };

  await act(async () => {
    await addTrack(mockTrackOptions);
  });

  expect(mockAddTrackMutation).toHaveBeenCalledWith({
    variables: { options: mockTrackOptions },
  });
});