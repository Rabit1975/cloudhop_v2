/**
 * Represents a score entry in a leaderboard.
 */
export type LeaderboardScore = {
  /**
   * The unique identifier of the user who achieved the score.
   */
  userId: string;

  /**
   * The score value achieved by the user.
   */
  score: number;

  /**
   * The timestamp when the score was recorded (e.g., Unix timestamp).
   */
  timestamp: number;
};