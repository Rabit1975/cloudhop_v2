export type GameType = 'html5' | 'unity' | 'external_stream';

export type PlainGame = {
  /**
   * Unique identifier for the game.
   */
  id: string;

  /**
   * Name of the game.
   */
  name: string;

  /**
   * Description of the game.
   */
  description: string;

  /**
   * Identifier for the category the game belongs to.
   */
  categoryId: string;

  /**
   * Type of the game (HTML5, Unity, or External Stream).
   */
  gameType: GameType;

  /**
   * URL to play the game or stream.
   */
  playUrl?: string;

  /**
   * Identifier for Unity games.
   */
  unityGameId?: string;

  /**
   * Array of image URLs for the game (thumbnail, screenshots).
   */
  imageUrls: string[];

  /**
   * Array of video URLs for the game.
   */
  videoUrls?: string[];

  /**
   * Publisher of the game.
   */
  publisher?: string;

  /**
   * Developer of the game.
   */
  developer?: string;

  /**
   * Release date of the game.
   */
  releaseDate?: string;

  /**
   * Tags associated with the game.
   */
  tags?: string[];

  /**
   * Date when the game was created.
   */
  createdAt: string;

  /**
   * Date when the game was last updated.
   */
  updatedAt?: string;
};