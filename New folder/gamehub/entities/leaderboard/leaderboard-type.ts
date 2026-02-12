import { LeaderboardScore } from './leaderboard-score-type.js';

/**
 * Plain object representation of a Leaderboard.
 */
export type PlainLeaderboard = {
  /**
   * The unique identifier of the leaderboard.
   */
  leaderboardId: string;

  /**
   * The unique identifier of the game associated with this leaderboard.
   */
  gameId: string;

  /**
   * A list of score entries for this leaderboard.
   */
  scores: LeaderboardScore[];
};