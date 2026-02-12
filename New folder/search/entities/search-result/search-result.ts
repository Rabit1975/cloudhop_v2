import { SearchableContent, PlainSearchableContent } from '@cloudrabbit/search.entities.searchable-content';

export type PlainSearchResult = {
  /**
   * Unique identifier of the search result.
   */
  id: string;

  /**
   * The searchable content associated with this result.
   */
  content: PlainSearchableContent;

  /**
   * Relevance score of the result, typically between 0 and 1.
   */
  relevanceScore: number;
};

export class SearchResult {
  constructor(
    /**
     * Unique identifier of the search result.
     */
    readonly id: string,

    /**
     * The searchable content associated with this result.
     */
    readonly content: SearchableContent,

    /**
     * Relevance score of the result, typically between 0 and 1.
     */
    readonly relevanceScore: number
  ) {}

  /**
   * Serializes the SearchResult into a plain object.
   */
  toObject(): PlainSearchResult {
    return {
      id: this.id,
      content: this.content.toObject(),
      relevanceScore: this.relevanceScore,
    };
  }

  /**
   * Creates a SearchResult instance from a plain object.
   */
  static from(plain: PlainSearchResult): SearchResult {
    return new SearchResult(
      plain.id,
      SearchableContent.from(plain.content),
      plain.relevanceScore
    );
  }
}