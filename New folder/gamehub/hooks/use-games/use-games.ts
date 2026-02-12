import { useApolloClient } from '@apollo/client';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { useListGames, type UseListGamesOptions, type UseListGamesResult } from './use-list-games.js';
import { useCreateGame, type UseCreateGameResult } from './use-create-game.js';
import { useUpdateGame, type UseUpdateGameResult } from './use-update-game.js';
import { useDeleteGame, type UseDeleteGameResult } from './use-delete-game.js';
import { type GamehubListGamesOptions, type GamehubGame } from './game-types.js';
import { GET_GAME_QUERY } from './use-get-game.js';

export type UseGamesResult = UseListGamesResult & {
  createGame: UseCreateGameResult['createGame'];
  updateGame: UseUpdateGameResult['updateGame'];
  deleteGame: UseDeleteGameResult['deleteGame'];
  getGame: (gameId: string) => Promise<Game>;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  createError?: Error;
  updateError?: Error;
  deleteError?: Error;
};

/**
 * A comprehensive hook for fetching and managing game data.
 * Exposes functions for listing games, retrieving a single game, creating, updating, and deleting games.
 */
export function useGames(
  listOptions?: GamehubListGamesOptions,
  queryOptions?: UseListGamesOptions
): UseGamesResult {
  const client = useApolloClient();
  const listQuery = useListGames(listOptions, queryOptions);
  
  const { createGame, loading: creating, error: createError } = useCreateGame();
  const { updateGame, loading: updating, error: updateError } = useUpdateGame();
  const { deleteGame, loading: deleting, error: deleteError } = useDeleteGame();

  const getGame = async (gameId: string): Promise<Game> => {
    const { data } = await client.query({
      query: GET_GAME_QUERY,
      variables: { gameId },
      fetchPolicy: 'network-only',
    });
    return Game.from(data.gamehubGetGame as GamehubGame);
  };

  return {
    ...listQuery,
    createGame,
    updateGame,
    deleteGame,
    getGame,
    creating,
    updating,
    deleting,
    createError,
    updateError,
    deleteError,
  };
}