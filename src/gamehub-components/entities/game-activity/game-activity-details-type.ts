/**
 * Detailed information regarding the game activity.
 * Properties are optional based on the activity type.
 */
export type GameActivityDetails = {
  /**
   * The score achieved by the user, applicable if type is 'played'.
   */
  score?: number;

  /**
   * The ID of the achievement unlocked, applicable if type is 'achieved'.
   */
  achievementId?: string;

  /**
   * The ID of the stream, applicable if type is 'streamed'.
   */
  streamId?: string;
};