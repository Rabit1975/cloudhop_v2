import { gql, useQuery } from '@apollo/client';
import { Achievement } from '@cloudrabbit/gamehub.entities.achievement';
import { GamehubListAchievementsOptions, GamehubAchievement } from './achievement-types.js';

export const LIST_ACHIEVEMENTS_QUERY = gql`
  query GamehubListAchievements($options: GamehubListAchievementsOptions) {
    gamehubListAchievements(options: $options) {
      id
      gameId
      name
      description
      iconUrl
      points
      createdAt
      updatedAt
    }
  }
`;

export type UseListAchievementsOptions = {
  variables?: GamehubListAchievementsOptions;
  mockData?: Achievement[];
};

/**
 * Hook to list achievements.
 * @param options configuration options including variables and mock data.
 * @returns object containing the list of achievements and loading state.
 */
export function useListAchievements({ variables, mockData }: UseListAchievementsOptions = {}) {
  const { data, loading, error, refetch } = useQuery(LIST_ACHIEVEMENTS_QUERY, {
    variables: { options: variables },
    skip: !!mockData,
  });

  const achievements = mockData || (data?.gamehubListAchievements?.map((a: GamehubAchievement) => Achievement.from(a)) ?? []);

  return {
    achievements,
    loading: loading && !mockData,
    error,
    refetch,
  };
}