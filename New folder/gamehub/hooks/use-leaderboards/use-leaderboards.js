import { useCallback } from 'react';
import { Leaderboard } from '@cloudrabbit/gamehub.entities.leaderboard';
import { useGetLeaderboardLazy } from './use-get-leaderboard.js';
import { useSubmitScoreMutation } from './use-submit-score.js';
import type { GamehubLeaderboardEntry } from './leaderboard-types.js';

export type UseLeaderboardsOptions = {
  /**
   * Mock data for the leaderboard entries.
   */
  mockData?: GamehubLeaderboardEntry[];
};

export type UseLeaderboardsResult = {
  /**
   * The currently loaded leaderboard entity.
   */
  leaderboard?: Leaderboard;
  
  /**
   * The raw leaderboard entries with additional user data.
   */
  entries?: GamehubLeaderboardEntry[];

  /**
   * Loading state for fetching or submitting.
   */
  loading: boolean;

  /**
   * Error object if any operation failed.
   */
  error?: Error;

  /**
   * Fetches the leaderboard for a specific game.
   * @param gameId The ID of the game to fetch.
   * @param options Pagination options.
   */
  getLeaderboard: (gameId: string, options?: { limit?: number; offset?: number }) => Promise<void>;

  /**
   * Submits a new score for a game.
   * @param gameId The ID of the game.
   * @param score The score value.
   */
  submitScore: (gameId: string, score: number) => Promise<void>;
};

/**
 * A React Hook for managing game leaderboards.
 * Allows fetching leaderboards and submitting scores.
 */
export function useLeaderboards(options?: UseLeaderboardsOptions): UseLeaderboardsResult {
  const [
    fetchLeaderboard, 
    { leaderboard, entries, loading: queryLoading, error: queryError }
  ] = useGetLeaderboardLazy({ mockData: options?.mockData });

  const { 
    submitScore: executeSubmit, 
    loading: mutationLoading, 
    error: mutationError 
  } = useSubmitScoreMutation();

  const getLeaderboard = useCallback(async (gameId: string, fetchOptions?: { limit?: number; offset?: number }) => {
    await fetchLeaderboard({
      gameId,
      limit: fetchOptions?.limit,
      offset: fetchOptions?.offset,
    });
  }, [fetchLeaderboard]);

  const submitScore = useCallback(async (gameId: string, score: number) => {
    await executeSubmit(gameId, score);
    // Optionally we could refetch here if we tracked the current gameId
  }, [executeSubmit]);

  return {
    leaderboard,
    entries,
    loading: queryLoading || mutationLoading,
    error: queryError || mutationError,
    getLeaderboard,
    submitScore,
  };
}