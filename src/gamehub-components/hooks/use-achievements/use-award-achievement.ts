import { gql, useMutation } from '@apollo/client';
import { GamehubAwardAchievementOptions } from './achievement-types.js';

export const AWARD_ACHIEVEMENT_MUTATION = gql`
  mutation GamehubAwardAchievement($options: GamehubAwardAchievementOptions!) {
    gamehubAwardAchievement(options: $options) {
      id
      userId
      achievementId
      unlockedAt
    }
  }
`;

/**
 * Hook to award an achievement to a user.
 * @returns an object containing the award function and mutation state.
 */
export function useAwardAchievement() {
  const [mutate, { data, loading, error }] = useMutation(AWARD_ACHIEVEMENT_MUTATION);

  const awardAchievement = async (userId: string, achievementId: string) => {
    try {
      await mutate({
        variables: {
          options: {
            userId,
            achievementId,
          },
        },
      });
    } catch (err) {
      console.error('Failed to award achievement:', err);
      throw err;
    }
  };

  return {
    awardAchievement,
    data,
    loading,
    error,
  };
}