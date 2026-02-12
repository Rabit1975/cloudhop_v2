import { useMutation, gql } from '@apollo/client';
import { type GamehubDeleteGameOptions } from './game-types.js';

export const DELETE_GAME_MUTATION = gql`
  mutation DeleteGame($options: GamehubDeleteGameOptions!) {
    gamehubDeleteGame(options: $options)
  }
`;

export type UseDeleteGameResult = {
  deleteGame: (options: GamehubDeleteGameOptions) => Promise<boolean>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to delete a game.
 */
export function useDeleteGame(): UseDeleteGameResult {
  const [mutate, { loading, error }] = useMutation(DELETE_GAME_MUTATION);

  const deleteGame = async (options: GamehubDeleteGameOptions) => {
    const result = await mutate({
      variables: { options },
    });

    return Boolean(result.data.gamehubDeleteGame);
  };

  return {
    deleteGame,
    loading,
    error,
  };
}