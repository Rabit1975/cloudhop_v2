import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useCreateMusicPlaylist } from './use-create-music-playlist.js';

// Mocking the useMutation hook
const mockCreatePlaylistMutation = vi.fn();

vi.mock('@apollo/client', async () => {
  const actualApolloClient = await vi.importActual('@apollo/client');
  return {
    ...actualApolloClient,
    useMutation: vi.fn(() => [mockCreatePlaylistMutation, { loading: false, error: undefined, data: undefined }]),
  };
});

it('should call the createPlaylist function', async () => {
  // This mock object represents the GraphQL response shape, which includes `trackIds`.
  // The type annotation `MusicPlaylistPlain` has been removed to avoid type conflicts,
  // as MusicPlaylistPlain is expected to have `tracks` not `trackIds`.
  const mockPlaylistPlain = {
    id: 'newPlaylist1',
    name: 'Test Playlist',
    ownerId: 'user1',
    isPublic: false,
    trackIds: [],
    createdAt: '2023-01-01T00:00:00Z',
    description: 'A test playlist',
  };

  mockCreatePlaylistMutation.mockResolvedValueOnce({
    data: {
      musicCreatePlaylist: mockPlaylistPlain,
    },
  });

  const { result } = renderHook(() => useCreateMusicPlaylist(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  const createPlaylist = result.current[0];
  const mockPlaylistOptions = { name: 'Test Playlist' };

  await act(async () => {
    await createPlaylist(mockPlaylistOptions);
  });

  expect(mockCreatePlaylistMutation).toHaveBeenCalledWith({
    variables: { options: mockPlaylistOptions },
  });
});