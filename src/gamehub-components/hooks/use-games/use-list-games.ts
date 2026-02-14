import { useQuery, gql } from '@apollo/client';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { type GamehubListGamesOptions, type GamehubGame } from './game-types.js';

export const LIST_GAMES_QUERY = gql`
  query ListGames($options: GamehubListGamesOptions) {
    gamehubListGames(options: $options) {
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

export type UseListGamesOptions = {
  mockData?: Game[];
}

export type UseListGamesResult = {
  games: Game[];
  loading: boolean;
  error?: Error;
  refetch: (variables?: { options: GamehubListGamesOptions }) => Promise<any>;
};

/**
 * Hook to list games with filtering options.
 */
export function useListGames(
  options?: GamehubListGamesOptions,
  queryOptions?: UseListGamesOptions
): UseListGamesResult {
  const skip = Boolean(queryOptions?.mockData);
  
  const { data, loading, error, refetch } = useQuery(LIST_GAMES_QUERY, {
    variables: { options },
    skip,
  });

  const games = queryOptions?.mockData || (data?.gamehubListGames?.map((g: GamehubGame) => Game.from(g)) ?? []);

  return {
    games,
    loading: loading && !queryOptions?.mockData,
    error,
    refetch,
  };
}