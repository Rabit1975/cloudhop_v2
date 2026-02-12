import { useQuery, gql } from '@apollo/client';
import { Session } from '@cloudrabbit/ai.entities.session';
import { GetSessionOptions } from './use-session-types.js';

const GET_SESSION_QUERY = gql`
  query AiGetSession($options: AiGetSessionOptions!) {
    aiGetSession(options: $options) {
      id
      name
      provider
      model
      userId
      createdAt
      updatedAt
    }
  }
`;

export type UseSessionResult = {
  /**
   * The retrieved AI session, or undefined if not found or loading.
   */
  session?: Session;

  /**
   * Indicates if the query is currently loading.
   */
  loading: boolean;

  /**
   * Error object if the query failed.
   */
  error?: Error;

  /**
   * Function to refetch the query.
   */
  refetch: (variables?: { options?: GetSessionOptions }) => Promise<any>;
};

/**
 * Hook to retrieve a specific AI session by its ID.
 * @param variables - Options containing the session ID.
 * @param options - Hook options, including mock data.
 * @returns An object containing the session, loading state, error, and refetch function.
 */
export function useSession(
  variables: GetSessionOptions,
  options?: { mockData?: Session }
): UseSessionResult {
  const skip = !!options?.mockData;

  const { data, loading, error, refetch } = useQuery(GET_SESSION_QUERY, {
    variables: { options: variables },
    skip,
  });

  if (options?.mockData) {
    return {
      session: options.mockData,
      loading: false,
      error: undefined,
      refetch: async () => {},
    };
  }

  const session = data?.aiGetSession
    ? Session.from(data.aiGetSession)
    : undefined;

  return {
    session,
    loading,
    error,
    refetch,
  };
}