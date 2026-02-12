import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockSearchResults, SearchResult } from '@cloudrabbit/search.entities.search-result';
import { SearchableContent } from '@cloudrabbit/search.entities.searchable-content';
import { vi, beforeEach } from 'vitest';
import { useSearch } from './use-search.js';

// Control variable for useQuery mock
let currentUseQueryMock: {
  loading: boolean;
  error: Error | undefined;
  data: any;
};

// Mock Apollo Client's useQuery. This needs to be done once globally.
vi.mock('@apollo/client', async () => {
  const actualApolloClient = await vi.importActual('@apollo/client');
  return {
    ...actualApolloClient,
    useQuery: vi.fn(() => currentUseQueryMock), // Hook into the dynamic variable
    gql: actualApolloClient.gql
  };
});

// Reset the mock state before each test
beforeEach(() => {
  currentUseQueryMock = {
    loading: false,
    error: undefined,
    data: {
      search: mockSearchResults().map(result => ({
        id: result.id,
        type: result.content.type,
        title: result.content.title,
        description: result.content.description,
        imageUrl: result.content.thumbnail,
        link: result.content.url,
        data: [], // Ensure this matches the GraphQL schema and `SearchResult` expectation
      })),
    },
  };
});

it('should return search results', () => {
  const { result } = renderHook(() => useSearch(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  act(() => {
    result.current.search('test');
  });

  expect(result.current.results.length).toBe(mockSearchResults().length);
});

it('should handle loading state', () => {
  // Set the mock to be loading before rendering the hook
  currentUseQueryMock = {
    loading: true,
    error: undefined,
    data: undefined,
  };

  const { result } = renderHook(() => useSearch(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  // Trigger a search to ensure the hook tries to fetch
  act(() => {
    result.current.search('test');
  });

  expect(result.current.isLoading).toBe(true);
  expect(result.current.results).toEqual([]); // While loading, results should be empty
});

it('should handle error state', () => {
  // Set the mock to an error state
  currentUseQueryMock = {
    loading: false,
    error: new Error('GraphQL Error!'),
    data: undefined,
  };

  const { result } = renderHook(() => useSearch(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  act(() => {
    result.current.search('test');
  });

  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBeInstanceOf(Error);
  expect(result.current.error?.message).toBe('GraphQL Error!');
  expect(result.current.results).toEqual([]);
});

it('should use mock data when provided', () => {
  const mockData: SearchResult[] = [
    new SearchResult(
      '1',
      new SearchableContent(
        '1',
        'test',
        'Test Result',
        'This is a test result',
        '/test',
        [],
        'thumb-test'
      ),
      1
    ),
  ];
  const { result } = renderHook(() => useSearch({ mockData }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  act(() => {
    result.current.search('test');
  });
  // When mockData is provided, useSearch should return it directly
  expect(result.current.results).toEqual(mockData);
  expect(result.current.isLoading).toBe(false); // Should not be loading if mockData is used
  expect(result.current.error).toBeUndefined(); // Should not have error if mockData is used
});