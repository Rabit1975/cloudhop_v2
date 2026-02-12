import { PlainSearchableContent } from './searchable-content-type.js';

export class SearchableContent {
  constructor(
    /**
     * Unique identifier of the content.
     */
    readonly id: string,

    /**
     * Type of the content.
     */
    readonly type: string,

    /**
     * Title of the content.
     */
    readonly title: string,

    /**
     * Description of the content.
     */
    readonly description: string,

    /**
     * URL of the content.
     */
    readonly url: string,

    /**
     * Keywords associated with the content.
     */
    readonly keywords: string[],

    /**
     * Thumbnail image URL.
     */
    readonly thumbnail?: string
  ) {}

  /**
   * Serializes the SearchableContent into a plain object.
   */
  toObject(): PlainSearchableContent {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      description: this.description,
      url: this.url,
      thumbnail: this.thumbnail,
      keywords: this.keywords,
    };
  }

  /**
   * Creates a SearchableContent instance from a plain object.
   */
  static from(plain: PlainSearchableContent): SearchableContent {
    // Ensure description and keywords are strings/arrays, handling undefined
    const description = plain.description ?? '';
    const keywords = plain.keywords ?? [];

    return new SearchableContent(
      plain.id,
      plain.type,
      plain.title,
      description,
      plain.url,
      keywords,
      plain.thumbnail
    );
  }
}