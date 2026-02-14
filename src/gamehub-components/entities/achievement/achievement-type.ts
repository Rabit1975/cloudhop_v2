export type PlainAchievement = {
  /**
   * unique identifier for the achievement.
   */
  id: string;

  /**
   * identifier of the game the achievement belongs to.
   */
  gameId: string;

  /**
   * name or title of the achievement.
   */
  name: string;

  /**
   * description of the achievement.
   */
  description: string;

  /**
   * url to the achievement icon.
   */
  iconUrl?: string;

  /**
   * points awarded for unlocking the achievement.
   */
  points?: number;

  /**
   * creation timestamp.
   */
  createdAt: string;

  /**
   * last update timestamp.
   */
  updatedAt?: string;
};