import { useQuery, gql } from '@apollo/client';
import { PresenceStatus } from '@cloudrabbit/people.entities.presence-status';

export const GET_USER_PRESENCE = gql`
  query GetUserPresence($userId: ID!) {
    peopleGetUserPresence(options: { userId: $userId }) {
      userId
      status
      lastSeenAt
    }
  }
`;

export type UsePresenceStatusOptions = {
  /**
   * Mock data to be returned for testing or preview.
   */
  mockData?: PresenceStatus;

  /**
   * If true, the query will be skipped.
   */
  skip?: boolean;
};

export type UsePresenceStatusResult = {
  /**
   * The current presence status of the user.
   */
  presence?: PresenceStatus;

  /**
   * Indicates if the query is currently loading.
   */
  loading: boolean;

  /**
   * Any error that occurred during the query.
   */
  error?: Error;

  /**
   * Function to refetch the query.
   */
  refetch: () => Promise<any>;
};

/**
 * Hook to fetch a user's presence status.
 * @param userId The ID of the user to fetch presence for.
 * @param options Options for the hook, including mock data.
 * @returns The user's presence status, loading state, error, and refetch function.
 */
export function usePresenceStatus(userId: string, options?: UsePresenceStatusOptions): UsePresenceStatusResult {
  const { mockData, skip: optionsSkip } = options || {};

  // useQuery must be called unconditionally at the top level of the component/hook.
  // The 'skip' option is used to prevent the query from executing when mockData is provided or options.skip is true.
  const { data, loading, error, refetch: apolloRefetch } = useQuery(GET_USER_PRESENCE, {
    variables: { userId },
    skip: Boolean(optionsSkip || mockData), // Skip the query if mockData is present or options.skip is true
  });

  // If mockData is provided, return a mock result and bypass the actual query results.
  if (mockData) {
    return {
      presence: mockData,
      loading: false,
      error: undefined,
      // Provide a refetch function that returns mock data consistent with Apollo Client's data structure
      refetch: async () => ({
        data: { peopleGetUserPresence: mockData.toObject() },
        loading: false,
        networkStatus: 7, // A common network status for a successful fetch
      }),
    };
  }

  // If not using mockData, process the results from the actual useQuery hook.
  const presence = data?.peopleGetUserPresence
    ? PresenceStatus.from(data.peopleGetUserPresence)
    : undefined;

  return {
    presence,
    loading,
    error,
    refetch: apolloRefetch, // Use the actual Apollo Client refetch function
  };
}