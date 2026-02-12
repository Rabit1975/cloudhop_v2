export type SearchResult = {
  /**
   * Unique identifier of the search result.
   */
  id: string;

  /**
   * Title of the content.
   */
  title: string;

  /**
   * Brief description or excerpt of the content.
   */
  description?: string;

  /**
   * URL of the thumbnail image.
   */
  imageUrl?: string;

  /**
   * Link to the content resource.
   */
  link: string;

  /**
   * Type of the content (e.g., "Channel", "User", "Game").
   */
  type: string;

  /**
   * Additional data associated with the result.
   */
  data?: Record<string, any>;
};