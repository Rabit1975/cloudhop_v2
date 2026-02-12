import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Game, mockGames } from '@cloudrabbit/gamehub.entities.game';
import { vi } from 'vitest';
import { useGames } from './use-games.js';

const mockGame = mockGames()[0];

const mockCreateGame = vi.fn(() => Promise.resolve(mockGame));
const mockUpdateGame = vi.fn(() => Promise.resolve(mockGame));
const mockDeleteGame = vi.fn(() => Promise.resolve(true));

vi.mock('./use-create-game.js', () => ({
  useCreateGame: () => ({ createGame: mockCreateGame, loading: false, error: undefined }),
}));

vi.mock('./use-update-game.js', () => ({
  useUpdateGame: () => ({ updateGame: mockUpdateGame, loading: false, error: undefined }),
}));

vi.mock('./use-delete-game.js', () => ({
  useDeleteGame: () => ({ deleteGame: mockDeleteGame, loading: false, error: undefined }),
}));

describe('useGames', () => {
  it('should return games from useListGames', () => {
    const mockData = mockGames();
    const { result } = renderHook(() => useGames({}, { mockData }), {
      wrapper: MockProvider,
    });

    expect(result.current.games).toEqual(mockData);
  });

  it('should call createGame with correct options', async () => {
    const { result } = renderHook(() => useGames(), {
      wrapper: MockProvider,
    });

    const createOptions = {
      name: 'Test Game',
      description: 'Test Description',
      categoryId: 'test-category',
      gameType: 'html5' as const,
      imageUrls: [],
    };

    await act(async () => {
      await result.current.createGame(createOptions);
    });

    expect(mockCreateGame).toHaveBeenCalledWith(createOptions);
  });

  it('should call deleteGame with correct options', async () => {
    const { result } = renderHook(() => useGames(), {
      wrapper: MockProvider,
    });

    const deleteOptions = {
      gameId: '123',
    };

    await act(async () => {
      await result.current.deleteGame(deleteOptions);
    });

    expect(mockDeleteGame).toHaveBeenCalledWith(deleteOptions);
  });
});