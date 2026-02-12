import { PlainAchievement } from './achievement-type.js';

export class Achievement {
  constructor(
    /**
     * unique identifier for the achievement.
     */
    readonly id: string,

    /**
     * identifier of the game the achievement belongs to.
     */
    readonly gameId: string,

    /**
     * name or title of the achievement.
     */
    readonly name: string,

    /**
     * description of the achievement.
     */
    readonly description: string,

    /**
     * url to the achievement icon.
     */
    readonly iconUrl: string | undefined,

    /**
     * points awarded for unlocking the achievement.
     */
    readonly points: number | undefined,

    /**
     * creation timestamp.
     */
    readonly createdAt: string,

    /**
     * last update timestamp.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * serialize an Achievement into a plain object.
   */
  toObject(): PlainAchievement {
    return {
      id: this.id,
      gameId: this.gameId,
      name: this.name,
      description: this.description,
      iconUrl: this.iconUrl,
      points: this.points,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * create an Achievement object from a plain object.
   */
  static from(plainAchievement: PlainAchievement): Achievement {
    return new Achievement(
      plainAchievement.id,
      plainAchievement.gameId,
      plainAchievement.name,
      plainAchievement.description,
      plainAchievement.iconUrl,
      plainAchievement.points,
      plainAchievement.createdAt,
      plainAchievement.updatedAt
    );
  }
}