import { useMutation, gql } from '@apollo/client';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { type GamehubUpdateGameOptions, type GamehubGame } from './game-types.js';

export const UPDATE_GAME_MUTATION = gql`
  mutation UpdateGame($options: GamehubUpdateGameOptions!) {
    gamehubUpdateGame(options: $options) {
      id
      name
      description
      categoryId
      gameType
      playUrl
      unityGameId
      imageUrls
      videoUrls
      publisher
      developer
      releaseDate
      tags
      createdAt
      updatedAt
    }
  }
`;

export type UseUpdateGameResult = {
  updateGame: (options: GamehubUpdateGameOptions) => Promise<Game>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to update an existing game.
 */
export function useUpdateGame(): UseUpdateGameResult {
  const [mutate, { loading, error }] = useMutation(UPDATE_GAME_MUTATION);

  const updateGame = async (options: GamehubUpdateGameOptions) => {
    const result = await mutate({
      variables: { options },
    });

    return Game.from(result.data.gamehubUpdateGame as GamehubGame);
  };

  return {
    updateGame,
    loading,
    error,
  };
}