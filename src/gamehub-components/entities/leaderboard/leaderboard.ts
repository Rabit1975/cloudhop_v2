import { PlainLeaderboard } from './leaderboard-type.js';
import { LeaderboardScore } from './leaderboard-score-type.js';

/**
 * Represents a game leaderboard containing user scores.
 */
export class Leaderboard {
  constructor(
    /**
     * The unique identifier of the leaderboard.
     */
    readonly leaderboardId: string,

    /**
     * The unique identifier of the game associated with this leaderboard.
     */
    readonly gameId: string,

    /**
     * A list of score entries for this leaderboard.
     */
    readonly scores: LeaderboardScore[] = []
  ) {}

  /**
   * Gets the unique identifier of the leaderboard.
   * Serves as a virtual ID property.
   */
  get id(): string {
    return this.leaderboardId;
  }

  /**
   * Serializes the Leaderboard entity into a plain object.
   * @returns A plain object representation of the leaderboard.
   */
  toObject(): PlainLeaderboard {
    return {
      leaderboardId: this.leaderboardId,
      gameId: this.gameId,
      scores: this.scores.map((score) => ({ ...score })),
    };
  }

  /**
   * Creates a Leaderboard entity from a plain object.
   * @param plain The plain object data.
   * @returns A new Leaderboard instance.
   */
  static from(plain: PlainLeaderboard): Leaderboard {
    return new Leaderboard(
      plain.leaderboardId,
      plain.gameId,
      plain.scores || []
    );
  }
}