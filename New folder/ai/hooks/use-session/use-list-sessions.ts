import { useQuery, gql } from '@apollo/client';
import { Session } from '@cloudrabbit/ai.entities.session';
import { ListSessionsOptions } from './use-session-types.js';

const LIST_SESSIONS_QUERY = gql`
  query AiListSessions($options: ListSessionsOptions) {
    aiListSessions(options: $options) {
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

export type UseListSessionsResult = {
  /**
   * The list of AI sessions.
   */
  sessions: Session[];

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
  refetch: (variables?: { options?: ListSessionsOptions }) => Promise<any>;
};

/**
 * Hook to retrieve a list of AI sessions.
 * @param variables - Options for filtering and pagination.
 * @param options - Hook options, including mock data.
 * @returns An object containing the list of sessions, loading state, error, and refetch function.
 */
export function useListSessions(
  variables?: ListSessionsOptions,
  options?: { mockData?: Session[] }
): UseListSessionsResult {
  const skip = !!options?.mockData;

  const { data, loading, error, refetch } = useQuery(LIST_SESSIONS_QUERY, {
    variables: { options: variables },
    skip,
  });

  if (options?.mockData) {
    return {
      sessions: options.mockData,
      loading: false,
      error: undefined,
      refetch: async () => {},
    };
  }

  const sessions = data?.aiListSessions
    ? data.aiListSessions.map((session: any) => Session.from(session))
    : [];

  return {
    sessions,
    loading,
    error,
    refetch,
  };
}