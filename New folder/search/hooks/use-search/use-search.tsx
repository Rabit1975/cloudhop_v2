import { useState, useCallback, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { SearchOptionsInput } from './search-input-type.js';

/**
 * GraphQL query for performing global search.
 */
const SEARCH_QUERY = gql`
  query Search($options: SearchOptions!) {
    search(options: $options) {
      id
      type
      title
      description
      imageUrl
      link
      data {
        key
        value
      }
    }
  }
`;

/**
 * Props for the useSearch hook.
 */
export type UseSearchOptions = {
  /**
   * mock data to use for testing or previewing.
   */
  mockData?: SearchResult[];
};

/**
 * Return value of the useSearch hook.
 */
export type UseSearchReturn = {
  /**
   * list of search results found.
   */
  results: SearchResult[];

  /**
   * indicates if the search query is currently loading.
   */
  isLoading: boolean;

  /**
   * error object if the search query failed.
   */
  error?: Error;

  /**
   * function to trigger a new search.
   * @param query the search query string.
   * @param filters optional key-value pairs for filtering.
   */
  search: (query: string, filters?: Record<string, unknown>) => void;
};

/**
 * A React Hook for performing global searches.
 * Manages search state and fetches results using GraphQL.
 * 
 * @param options configuration options for the hook.
 * @returns an object containing the search results, loading state, error, and a search function.
 */
export function useSearch(options?: UseSearchOptions): UseSearchReturn {
  const [searchVariables, setSearchVariables] = useState<SearchOptionsInput | null>(null);

  const { data, loading, error } = useQuery(SEARCH_QUERY, {
    skip: !!options?.mockData || !searchVariables,
    variables: { 
      options: searchVariables 
    },
    // Ensure we don't cache search results too aggressively
    fetchPolicy: 'network-only',
  });

  const search = useCallback((query: string, filters: Record<string, unknown> = {}) => {
    const filterArray = Object.entries(filters).map(([key, value]) => ({
      key,
      value: String(value),
    }));

    setSearchVariables({
      query,
      filters: filterArray,
      limit: 20,
      offset: 0,
    });
  }, []);

  const results = useMemo(() => {
    if (options?.mockData) {
      return options.mockData;
    }

    if (!data?.search) {
      return [];
    }

    return data.search.map((item: any) => {
      // Map the GraphQL response to the PlainSearchResult structure expected by the entity
      return SearchResult.from({
        id: item.id,
        relevanceScore: 1, // Default score as API doesn't return it
        content: {
          id: item.id,
          type: item.type,
          title: item.title,
          description: item.description,
          url: item.link,
          thumbnail: item.imageUrl,
          keywords: [],
        },
      });
    });
  }, [data, options?.mockData]);

  return {
    results,
    isLoading: loading,
    error,
    search,
  };
}