export type PlainSearchableContent = {
  /**
   * Unique identifier of the content.
   */
  id: string;

  /**
   * Type of the content (e.g., 'user', 'chat', 'meeting', 'music', 'game', 'asset').
   */
  type: string;

  /**
   * Title or name of the content.
   */
  title: string;

  /**
   * Description of the content.
   */
  description?: string; // Made optional

  /**
   * URL to access the content.
   */
  url: string;

  /**
   * Optional thumbnail image URL.
   */
  thumbnail?: string;

  /**
   * List of keywords for tagging and filtering.
   */
  keywords?: string[]; // Made optional
};