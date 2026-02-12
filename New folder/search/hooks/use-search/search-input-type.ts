/**
 * key value pair for search filters.
 */
export type SearchFilterKeyValuePair = {
  key: string;
  value: string;
};

/**
 * input options for the search query.
 */
export type SearchOptionsInput = {
  query: string;
  limit?: number;
  offset?: number;
  types?: string[];
  filters?: SearchFilterKeyValuePair[];
};