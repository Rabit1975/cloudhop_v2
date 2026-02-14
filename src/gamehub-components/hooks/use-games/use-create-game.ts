import { useMutation, gql } from '@apollo/client';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { type GamehubCreateGameOptions, type GamehubGame } from './game-types.js';

export const CREATE_GAME_MUTATION = gql`
  mutation CreateGame($options: GamehubCreateGameOptions!) {
    gamehubCreateGame(options: $options) {
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

export type UseCreateGameResult = {
  createGame: (options: GamehubCreateGameOptions) => Promise<Game>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to create a new game.
 */
export function useCreateGame(): UseCreateGameResult {
  const [mutate, { loading, error }] = useMutation(CREATE_GAME_MUTATION);

  const createGame = async (options: GamehubCreateGameOptions) => {
    const result = await mutate({
      variables: { options },
    });

    return Game.from(result.data.gamehubCreateGame as GamehubGame);
  };

  return {
    createGame,
    loading,
    error,
  };
}