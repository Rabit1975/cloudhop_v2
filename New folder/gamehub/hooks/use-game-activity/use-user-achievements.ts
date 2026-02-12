import { gql, useQuery } from '@apollo/client';
import { GameActivity } from '@cloudrabbit/gamehub.entities.game-activity';

export const GET_USER_ACHIEVEMENTS_QUERY = gql`
  query GetUserAchievements($userId: ID!, $limit: Int, $offset: Int) {
    gamehubGetUserAchievements(options: { userId: $userId, limit: $limit, offset: $offset }) {
      id
      userId
      achievementId
      unlockedAt
    }
  }
`;

export type UseUserAchievementsOptions = {
  userId?: string;
  limit?: number;
  offset?: number;
  mockData?: GameActivity[];
};

export type UseUserAchievementsResult = {
  activities: GameActivity[];
  loading: boolean;
  error?: Error;
  refetch: () => void;
};

export function useUserAchievements(options: UseUserAchievementsOptions = {}): UseUserAchievementsResult {
  const { userId, limit, offset, mockData } = options;
  const skip = !!mockData || !userId;

  const { data, loading, error, refetch } = useQuery(GET_USER_ACHIEVEMENTS_QUERY, {
    variables: {
      userId,
      limit,
      offset,
    },
    skip,
  });

  if (mockData) {
    return {
      activities: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const activities = (data?.gamehubGetUserAchievements || []).map((item: any) => {
    // Note: The schema for UserAchievement does not include gameId. 
    // We strictly follow the schema, so we cannot populate real gameId here.
    // Using a placeholder or potentially mapping externally would be required.
    return GameActivity.from({
      id: item.id,
      userId: item.userId,
      gameId: 'unknown', 
      type: 'achieved',
      timestamp: item.unlockedAt,
      details: {
        achievementId: item.achievementId,
      },
    });
  });

  return {
    activities,
    loading,
    error: error || undefined,
    refetch,
  };
}