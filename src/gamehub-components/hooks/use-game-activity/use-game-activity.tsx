import { useCallback } from 'react';
import { PlainGameActivity, GameActivity } from '@cloudrabbit/gamehub.entities.game-activity';
import { useUserAchievements } from './use-user-achievements.js';
import { useSubmitScore } from './use-submit-score.js';
import { useAwardAchievement } from './use-award-achievement.js';

export type UseGameActivityOptions = {
  /**
   * The ID of the user to fetch activities for.
   */
  userId?: string;
  
  /**
   * Optional mock data for testing or preview.
   */
  mockData?: GameActivity[];
};

export type GameActivityHookValue = {
  /**
   * The list of game activities for the user.
   */
  activities: GameActivity[];
  
  /**
   * Indicates if the activities are currently loading.
   */
  loading: boolean;
  
  /**
   * Error object if the fetch or mutation failed.
   */
  error?: Error;
  
  /**
   * Function to log a new activity (played, achieved, etc.).
   */
  logActivity: (activity: PlainGameActivity) => Promise<void>;
  
  /**
   * Refetch the activities list.
   */
  refetch: () => void;
};

/**
 * A React Hook for fetching and managing user game activity data.
 * Exposes functions for listing a user's game activities, and logging new activities 
 * (e.g., game played, achievement unlocked) using GraphQL mutations.
 */
export function useGameActivity({ userId, mockData }: UseGameActivityOptions = {}): GameActivityHookValue {
  const { 
    activities, 
    loading: loadingActivities, 
    error: fetchError, 
    refetch 
  } = useUserAchievements({ userId, mockData });

  const { 
    submitScore, 
    loading: loadingScore, 
    error: scoreError 
  } = useSubmitScore();

  const { 
    awardAchievement, 
    loading: loadingAward, 
    error: awardError 
  } = useAwardAchievement();

  const logActivity = useCallback(async (activity: PlainGameActivity) => {
    try {
      if (activity.type === 'played') {
        if (!activity.details?.score) {
          throw new Error('Score is required for played activity');
        }
        await submitScore(activity.gameId, activity.details.score);
      } else if (activity.type === 'achieved') {
        if (!activity.details?.achievementId) {
          throw new Error('Achievement ID is required for achieved activity');
        }
        await awardAchievement(activity.userId, activity.details.achievementId, activity.gameId);
      } else {
        console.warn(`Activity type ${activity.type} is not supported for logging via this hook.`);
      }
      
      // Optionally refetch activities after logging
      refetch();
    } catch (err) {
      console.error('Failed to log activity:', err);
      throw err;
    }
  }, [submitScore, awardAchievement, refetch]);

  const combinedError = fetchError || scoreError || awardError;
  const combinedLoading = loadingActivities || loadingScore || loadingAward;

  return {
    activities,
    loading: combinedLoading,
    error: combinedError,
    logActivity,
    refetch,
  };
}