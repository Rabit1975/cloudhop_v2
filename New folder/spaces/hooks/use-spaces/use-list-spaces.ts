import { useQuery, gql } from '@apollo/client';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { type ListSpacesOptions } from './list-spaces-options-type.js';

const LIST_SPACES = gql`
  query SpacesListSpaces($options: SpacesListSpacesOptions) {
    spacesListSpaces(options: $options) {
      id
      name
      description
      ownerId
      createdAt
      updatedAt
      visibility
    }
  }
`;

export type UseListSpacesResult = {
  /**
   * List of retrieved space entities.
   */
  spaces: Space[];

  /**
   * Indicates if the query is currently loading.
   */
  loading: boolean;

  /**
   * Error object if the query failed.
   */
  error?: Error;

  /**
   * Function to refetch the data.
   */
  refetch: (variables?: Partial<{ options: ListSpacesOptions }>) => Promise<any>;
};

/**
 * Hook to list spaces with optional filters.
 * @param filters Filtering options for the list.
 * @param options Configuration options, including mock data injection.
 * @returns The list of spaces, loading state, error state, and refetch function.
 */
export function useListSpaces(filters?: ListSpacesOptions, options?: { mockData?: Space[] }): UseListSpacesResult {
  const { data, loading, error, refetch } = useQuery(LIST_SPACES, {
    variables: { options: filters },
    skip: !!options?.mockData,
  });

  if (options?.mockData) {
    return { spaces: options.mockData, loading: false, refetch: async () => {} };
  }

  const spaces = data?.spacesListSpaces?.map((s: any) => Space.from({ ...s, members: [] })) || [];

  return { spaces, loading, error, refetch };
}