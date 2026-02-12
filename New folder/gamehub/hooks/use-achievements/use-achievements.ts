import { Achievement } from '@cloudrabbit/gamehub.entities.achievement';
import { useListAchievements } from './use-list-achievements.js';
import { useAwardAchievement } from './use-award-achievement.js';
import { GamehubListAchievementsOptions } from './achievement-types.js';

export type UseAchievementsProps = {
  /**
   * Filter achievements by game ID.
   */
  gameId?: string;
  /**
   * Provide mock data for testing or preview.
   */
  mockData?: Achievement[];
};

/**
 * A React Hook for fetching and managing game achievement data.
 * @returns An object containing achievements list, retrieval functions, and award operations.
 */
export function useAchievements({ gameId, mockData }: UseAchievementsProps = {}) {
  const listOptions: GamehubListAchievementsOptions = {};
  if (gameId) {
    listOptions.gameId = gameId;
  }

  const { achievements, loading, error, refetch } = useListAchievements({
    variables: listOptions,
    mockData,
  });

  const { awardAchievement, loading: awarding, error: awardError } = useAwardAchievement();

  const getAchievement = (achievementId: string) => {
    return achievements.find((achievement) => achievement.id === achievementId);
  };

  return {
    achievements,
    getAchievement,
    awardAchievement,
    loading,
    error,
    refetch,
    isAwarding: awarding,
    awardError,
  };
}