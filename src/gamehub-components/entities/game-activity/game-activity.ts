import { v4 as uuid } from 'uuid';
import type { PlainGameActivity } from './plain-game-activity-type.js';
import type { GameActivityType } from './game-activity-type.js';
import type { GameActivityDetails } from './game-activity-details-type.js';

export class GameActivity {
  constructor(
    /**
     * Unique identifier for the activity.
     */
    readonly id: string,

    /**
     * The ID of the user who performed the activity.
     */
    readonly userId: string,

    /**
     * The ID of the game associated with the activity.
     */
    readonly gameId: string,

    /**
     * The type of activity.
     */
    readonly type: GameActivityType,

    /**
     * The timestamp when the activity occurred.
     */
    readonly timestamp: string,

    /**
     * Additional details specific to the activity type.
     */
    readonly details: GameActivityDetails = {}
  ) {}

  /**
   * Serializes the GameActivity into a plain object.
   */
  toObject(): PlainGameActivity {
    return {
      id: this.id,
      userId: this.userId,
      gameId: this.gameId,
      type: this.type,
      timestamp: this.timestamp,
      details: this.details,
    };
  }

  /**
   * Creates a GameActivity instance from a plain object.
   * Generates a new ID if one is not provided.
   */
  static from(plain: PlainGameActivity) {
    const { id, userId, gameId, type, timestamp, details } = plain;
    return new GameActivity(
      id || uuid(),
      userId,
      gameId,
      type,
      timestamp,
      details
    );
  }
}