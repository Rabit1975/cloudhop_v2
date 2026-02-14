import { PlainGame, GameType } from './game-type.js';

export class Game {
  constructor(
    /**
     * Unique identifier for the game.
     */
    readonly id: string,

    /**
     * Name of the game.
     */
    readonly name: string,

    /**
     * Description of the game.
     */
    readonly description: string,

    /**
     * Identifier for the category the game belongs to.
     */
    readonly categoryId: string,

    /**
     * Type of the game (HTML5, Unity, or External Stream).
     */
    readonly gameType: GameType,

    /**
     * Date when the game was created.
     */
    readonly createdAt: string,

    /**
     * Array of image URLs for the game (thumbnail, screenshots).
     */
    readonly imageUrls: string[] = [],

    /**
     * URL to play the game or stream.
     */
    readonly playUrl?: string,

    /**
     * Identifier for Unity games.
     */
    readonly unityGameId?: string,

    /**
     * Array of video URLs for the game.
     */
    readonly videoUrls: string[] = [],

    /**
     * Publisher of the game.
     */
    readonly publisher?: string,

    /**
     * Developer of the game.
     */
    readonly developer?: string,

    /**
     * Release date of the game.
     */
    readonly releaseDate?: string,

    /**
     * Tags associated with the game.
     */
    readonly tags: string[] = [],

    /**
     * Date when the game was last updated.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serialize the Game entity into a plain object.
   */
  toObject(): PlainGame {
    const obj: PlainGame = {
      id: this.id,
      name: this.name,
      description: this.description,
      categoryId: this.categoryId,
      gameType: this.gameType,
      createdAt: this.createdAt,
      imageUrls: this.imageUrls,
    };

    if (this.playUrl !== undefined) {
      obj.playUrl = this.playUrl;
    }
    if (this.unityGameId !== undefined) {
      obj.unityGameId = this.unityGameId;
    }
    // Only include videoUrls if it's not an empty array
    if (this.videoUrls.length > 0) {
      obj.videoUrls = this.videoUrls;
    }
    if (this.publisher !== undefined) {
      obj.publisher = this.publisher;
    }
    if (this.developer !== undefined) {
      obj.developer = this.developer;
    }
    if (this.releaseDate !== undefined) {
      obj.releaseDate = this.releaseDate;
    }
    // Only include tags if it's not an empty array
    if (this.tags.length > 0) {
      obj.tags = this.tags;
    }
    if (this.updatedAt !== undefined) {
      obj.updatedAt = this.updatedAt;
    }

    return obj;
  }

  /**
   * Create a Game entity from a plain object.
   */
  static from(plain: PlainGame): Game {
    return new Game(
      plain.id,
      plain.name,
      plain.description,
      plain.categoryId,
      plain.gameType,
      plain.createdAt,
      plain.imageUrls, // imageUrls is required by PlainGame, so it's always an array
      plain.playUrl,
      plain.unityGameId,
      plain.videoUrls || [], // Default to empty array if not provided in plain object
      plain.publisher,
      plain.developer,
      plain.releaseDate,
      plain.tags || [], // Default to empty array if not provided in plain object
      plain.updatedAt
    );
  }
}