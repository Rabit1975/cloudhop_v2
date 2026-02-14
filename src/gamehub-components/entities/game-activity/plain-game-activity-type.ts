import type { GameActivityType } from './game-activity-type.js';
import type { GameActivityDetails } from './game-activity-details-type.js';

/**
 * Plain object representation of a game activity.
 */
export type PlainGameActivity = {
  /**
   * Unique identifier for the activity.
   */
  id?: string;

  /**
   * The ID of the user who performed the activity.
   */
  userId: string;

  /**
   * The ID of the game associated with the activity.
   */
  gameId: string;

  /**
   * The type of activity (e.g., played, streamed, achieved).
   */
  type: GameActivityType;

  /**
   * The timestamp when the activity occurred.
   */
  timestamp: string;

  /**
   * Additional details specific to the activity type.
   */
  details?: GameActivityDetails;
};