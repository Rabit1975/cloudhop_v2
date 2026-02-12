import { PlainContent } from './content-type.js';

export class Content {
  constructor(
    /**
     * Unique identifier of the content.
     */
    readonly id: string,

    /**
     * The ID of the space this content belongs to.
     */
    readonly spaceId: string,

    /**
     * The title of the content.
     */
    readonly title: string,

    /**
     * The type of content (e.g., 'document', 'image', 'video', 'design').
     */
    readonly type: string,

    /**
     * The ID of the user who created the content.
     */
    readonly creatorId: string,

    /**
     * ISO timestamp of when the content was created.
     */
    readonly createdAt: string,

    /**
     * The main body text of the content.
     */
    readonly body?: string,

    /**
     * List of asset IDs associated with this content.
     */
    readonly assets: string[] = [],

    /**
     * ISO timestamp of when the content was last updated.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serializes the Content entity into a plain object.
   */
  toObject(): PlainContent {
    return {
      id: this.id,
      spaceId: this.spaceId,
      title: this.title,
      type: this.type,
      creatorId: this.creatorId,
      createdAt: this.createdAt,
      body: this.body,
      assets: this.assets,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a Content entity from a plain object.
   */
  static from(plainContent: PlainContent): Content {
    return new Content(
      plainContent.id,
      plainContent.spaceId,
      plainContent.title,
      plainContent.type,
      plainContent.creatorId,
      plainContent.createdAt,
      plainContent.body,
      plainContent.assets,
      plainContent.updatedAt
    );
  }
}