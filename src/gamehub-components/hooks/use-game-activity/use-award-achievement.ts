import { gql, useMutation } from '@apollo/client';
import { GameActivity } from '@cloudrabbit/gamehub.entities.game-activity';

export const AWARD_ACHIEVEMENT_MUTATION = gql`
  mutation AwardAchievement($userId: ID!, $achievementId: ID!) {
    gamehubAwardAchievement(options: { userId: $userId, achievementId: $achievementId }) {
      id
      userId
      achievementId
      unlockedAt
    }
  }
`;

export type AwardAchievementMutationFn = (
  userId: string,
  achievementId: string,
  gameId?: string // Optional as schema doesn't return it
) => Promise<GameActivity>;

export type UseAwardAchievementResult = {
  awardAchievement: AwardAchievementMutationFn;
  loading: boolean;
  error?: Error;
};

export function useAwardAchievement(): UseAwardAchievementResult {
  const [mutate, { loading, error }] = useMutation(AWARD_ACHIEVEMENT_MUTATION);

  const awardAchievement = async (userId: string, achievementId: string, gameId = 'unknown') => {
    const response = await mutate({
      variables: {
        userId,
        achievementId,
      },
    });

    const data = response.data?.gamehubAwardAchievement;

    return GameActivity.from({
      id: data.id,
      userId: data.userId,
      gameId, 
      type: 'achieved',
      timestamp: data.unlockedAt,
      details: {
        achievementId: data.achievementId,
      },
    });
  };

  return {
    awardAchievement,
    loading,
    error: error || undefined,
  };
}