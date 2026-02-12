import { useQuery, gql } from '@apollo/client';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { type GetSpaceOptions } from './get-space-options-type.js';

const GET_SPACE = gql`
  query SpacesGetSpace($options: SpacesGetSpaceOptions!) {
    spacesGetSpace(options: $options) {
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

export type UseSpaceResult = {
  /**
   * The retrieved space entity, or undefined if loading or not found.
   */
  space?: Space;

  /**
   * Indicates if the query is currently loading.
   */
  loading: boolean;

  /**
   * Error object if the query failed.
   */
  error?: Error;
};

/**
 * Hook to fetch a single space by its ID.
 * @param spaceId The ID of the space to fetch.
 * @param options Configuration options, including mock data injection.
 * @returns The space data, loading state, and error state.
 */
export function useSpace(spaceId: string, options?: { mockData?: Space }): UseSpaceResult {
  const { data, loading, error } = useQuery(GET_SPACE, {
    variables: { options: { spaceId } },
    skip: !!options?.mockData,
  });

  if (options?.mockData) {
    return { space: options.mockData, loading: false };
  }

  const space = data?.spacesGetSpace
    ? Space.from({ ...data.spacesGetSpace, members: [] })
    : undefined;

  return { space, loading, error };
}