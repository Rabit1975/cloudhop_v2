import { useMutation, gql, type FetchResult } from '@apollo/client';
import { MarkMessagesAsReadOptionsType } from './mark-messages-as-read-options-type.js';

export const MARK_MESSAGES_AS_READ_MUTATION = gql`
  mutation MarkMessagesAsRead($options: HophubMarkMessagesAsReadOptions!) {
    hophubMarkMessagesAsRead(options: $options) {
      id
      unreadCount
    }
  }
`;

export type MarkAsReadResult = {
  id: string;
  unreadCount: number;
};

export type MarkMessagesAsReadFunction = (
  options: MarkMessagesAsReadOptionsType
) => Promise<FetchResult<{ hophubMarkMessagesAsRead: MarkAsReadResult }>>;

export type UseMarkMessagesAsReadReturn = {
  markMessagesAsRead: MarkMessagesAsReadFunction;
  data?: MarkAsReadResult;
  loading: boolean;
  error?: Error;
};

/**
 * A hook to mark messages in a conversation as read.
 * Updates the unread count for the conversation.
 */
export function useMarkMessagesAsRead(): UseMarkMessagesAsReadReturn {
  const [mutate, { data, loading, error }] = useMutation(MARK_MESSAGES_AS_READ_MUTATION);

  const markMessagesAsRead: MarkMessagesAsReadFunction = async (options) => {
    return mutate({
      variables: { options },
    });
  };

  return {
    markMessagesAsRead,
    data: data?.hophubMarkMessagesAsRead,
    loading,
    error: error as Error | undefined,
  };
}