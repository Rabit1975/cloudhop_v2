import { useQuery, gql } from '@apollo/client';
import { Message } from '@cloudrabbit/ai.entities.message';
import { ListMessagesOptions } from './messages-types.js';

export const LIST_MESSAGES_QUERY = gql`
  query ListMessages($options: ListMessagesOptions!) {
    aiListMessages(options: $options) {
      id
      sessionId
      text
      role
      createdAt
      updatedAt
      userId
    }
  }
`;

export type UseMessagesOptions = ListMessagesOptions & {
  /**
   * Mock data to use for testing or previewing.
   */
  mockData?: Message[];

  /**
   * Skip the query.
   */
  skip?: boolean;
};

export type UseMessagesResult = {
  /**
   * The list of messages.
   */
  messages: Message[];

  /**
   * Whether the query is loading.
   */
  loading: boolean;

  /**
   * The error object if the query failed.
   */
  error?: Error;

  /**
   * Function to refetch the messages.
   */
  refetch: (variables?: Partial<ListMessagesOptions>) => Promise<any>;
};

/**
 * A hook to list messages for a session.
 */
export function useMessages({ mockData, skip, ...options }: UseMessagesOptions): UseMessagesResult {
  const { data, loading, error, refetch } = useQuery(LIST_MESSAGES_QUERY, {
    variables: { options },
    skip: skip || !!mockData,
  });

  const messages = mockData || data?.aiListMessages?.map((msg: any) => Message.from(msg)) || [];

  return {
    messages,
    loading: loading && !mockData,
    error,
    refetch,
  };
}