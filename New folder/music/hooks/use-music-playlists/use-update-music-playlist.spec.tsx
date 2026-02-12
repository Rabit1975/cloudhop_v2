import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useUpdateMusicPlaylist } from './use-update-music-playlist.js';

// Mocking the useMutation hook
const mockUpdatePlaylistMutation = vi.fn();

vi.mock('@apollo/client', async () => {
  const actualApolloClient = await vi.importActual('@apollo/client');
  return {
    ...actualApolloClient,
    useMutation: vi.fn(() => [mockUpdatePlaylistMutation, { loading: false, error: undefined, data: undefined }]),
  };
});

it('should call the updatePlaylist function', async () => {
  // This mock object represents the GraphQL response shape, which includes `trackIds`.
  // The type annotation `MusicPlaylistPlain` has been removed to avoid type conflicts,
  // as MusicPlaylistPlain is expected to have `tracks` not `trackIds`.
  const mockPlaylistPlain = {
    id: '123',
    name: 'Updated Playlist',
    ownerId: 'user1',
    isPublic: true,
    trackIds: [],
    createdAt: '2023-01-01T00:00:00Z',
    description: 'A test playlist',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  mockUpdatePlaylistMutation.mockResolvedValueOnce({
    data: {
      musicUpdatePlaylist: mockPlaylistPlain,
    },
  });

  const { result } = renderHook(() => useUpdateMusicPlaylist(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  const updatePlaylist = result.current[0];
  const mockPlaylistOptions = { playlistId: '123', name: 'Updated Playlist' };

  await act(async () => {
    await updatePlaylist(mockPlaylistOptions);
  });

  expect(mockUpdatePlaylistMutation).toHaveBeenCalledWith({
    variables: { options: mockPlaylistOptions },
  });
});