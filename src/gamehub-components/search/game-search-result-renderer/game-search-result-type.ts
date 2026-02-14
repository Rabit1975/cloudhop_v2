export type GameSearchContent = {
  /**
   * The title of the game.
   */
  title: string;

  /**
   * A brief description of the game.
   */
  description: string;

  /**
   * URL for the game thumbnail image.
   */
  thumbnail?: string;

  /**
   * The platform or engine the game runs on (e.g., Unity, HTML5).
   */
  platform?: string;

  /**
   * The URL to navigate to when the result is clicked.
   */
  url: string;
};

export type GameSearchResult = {
  /**
   * Unique identifier for the result.
   */
  id: string;

  /**
   * The specific content data for the game.
   */
  content: GameSearchContent;

  /**
   * Relevance score of the result.
   */
  relevanceScore?: number;
};