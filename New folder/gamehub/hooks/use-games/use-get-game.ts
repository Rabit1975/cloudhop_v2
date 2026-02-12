import { useQuery, gql } from '@apollo/client';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { type GamehubGame } from './game-types.js';

export const GET_GAME_QUERY = gql`
  query GetGame($gameId: ID!) {
    gamehubGetGame(options: { gameId: $gameId }) {
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

export type UseGetGameOptions = {
  mockData?: Game;
}

export type UseGetGameResult = {
  game?: Game;
  loading: boolean;
  error?: Error;
  refetch: (variables?: { gameId: string }) => Promise<any>;
};

/**
 * Hook to retrieve a single game by ID.
 */
export function useGetGame(
  gameId: string,
  queryOptions?: UseGetGameOptions
): UseGetGameResult {
  const skip = Boolean(queryOptions?.mockData) || !gameId;

  const { data, loading, error, refetch } = useQuery(GET_GAME_QUERY, {
    variables: { gameId },
    skip,
  });

  const game = queryOptions?.mockData || (data?.gamehubGetGame ? Game.from(data.gamehubGetGame as GamehubGame) : undefined);

  return {
    game,
    loading: loading && !queryOptions?.mockData,
    error,
    refetch,
  };
}