export type PlainContent = {
  /**
   * Unique identifier of the content.
   */
  id: string;

  /**
   * The ID of the space this content belongs to.
   */
  spaceId: string;

  /**
   * The title of the content.
   */
  title: string;

  /**
   * The main body text of the content.
   */
  body?: string;

  /**
   * The type of content (e.g., 'document', 'image', 'video', 'design').
   */
  type: string;

  /**
   * The ID of the user who created the content.
   */
  creatorId: string;

  /**
   * List of asset IDs associated with this content.
   */
  assets?: string[];

  /**
   * ISO timestamp of when the content was created.
   */
  createdAt: string;

  /**
   * ISO timestamp of when the content was last updated.
   */
  updatedAt?: string;
};