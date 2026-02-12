import { useQuery, gql, type ApolloQueryResult } from '@apollo/client';
import { Message } from '@cloudrabbit/hophub.entities.message';
import { ListMessagesOptionsType } from './list-messages-options-type.js';

const LIST_MESSAGES_QUERY = gql`
  query ListMessages($options: HophubListMessagesOptions!) {
    hophubListMessages(options: $options) {
      id
      conversationId
      senderId
      text
      type
      createdAt
      updatedAt
      mediaAttachments {
        id
        url
        type
        filename
        size
      }
    }
  }
`;

export type UseListMessagesReturn = {
  messages: Message[] | undefined;
  loading: boolean;
  error?: Error;
  refetch: (variables?: Partial<ListMessagesOptionsType>) => Promise<ApolloQueryResult<any>>;
};

/**
 * A hook to fetch messages for a specific conversation.
 * Supports pagination and mock data.
 */
export function useListMessages(options: ListMessagesOptionsType): UseListMessagesReturn {
  const { mockData, ...queryOptions } = options;
  const skip = Boolean(mockData);

  const { data, loading, error, refetch } = useQuery(LIST_MESSAGES_QUERY, {
    variables: { options: queryOptions },
    skip,
  });

  const messages = mockData || (data?.hophubListMessages
    ? data.hophubListMessages.map((msg: any) => Message.from(msg))
    : undefined);

  return {
    messages,
    loading,
    error: error as Error | undefined,
    refetch,
  };
}