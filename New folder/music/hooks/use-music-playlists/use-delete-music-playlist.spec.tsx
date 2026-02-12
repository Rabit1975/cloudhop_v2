import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useDeleteMusicPlaylist } from './use-delete-music-playlist.js';

// Mocking the useMutation hook
const mockDeletePlaylistMutation = vi.fn();

vi.mock('@apollo/client', async () => {
  const actualApolloClient = await vi.importActual('@apollo/client');
  return {
    ...actualApolloClient,
    useMutation: vi.fn(() => [mockDeletePlaylistMutation, { loading: false, error: undefined, data: undefined }]),
  };
});

it('should call the deletePlaylist function', async () => {
  mockDeletePlaylistMutation.mockResolvedValueOnce({
    data: {
      musicDeletePlaylist: true,
    },
  });

  const { result } = renderHook(() => useDeleteMusicPlaylist(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  const deletePlaylist = result.current[0];
  const mockPlaylistOptions = { playlistId: '123' };

  let deleted = false;
  await act(async () => {
    deleted = await deletePlaylist(mockPlaylistOptions);
  });

  expect(mockDeletePlaylistMutation).toHaveBeenCalledWith({
    variables: { options: mockPlaylistOptions },
  });
  expect(deleted).toBe(true);
});