import { useMutation, gql, type FetchResult } from '@apollo/client';
import { Message } from '@cloudrabbit/hophub.entities.message';
import { SendMessageOptionsType } from './send-message-options-type.js';

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($options: HophubSendMessageOptions!) {
    hophubSendMessage(options: $options) {
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

export type SendMessageFunction = (
  options: SendMessageOptionsType
) => Promise<FetchResult<{ hophubSendMessage: any }>>;

export type UseSendMessageReturn = {
  sendMessage: SendMessageFunction;
  data?: Message;
  loading: boolean;
  error?: Error;
};

/**
 * A hook to send a message to a conversation.
 * Handles text and optional media attachments.
 */
export function useSendMessage(): UseSendMessageReturn {
  const [mutate, { data, loading, error }] = useMutation(SEND_MESSAGE_MUTATION);

  const sendMessage: SendMessageFunction = async (options) => {
    return mutate({
      variables: { options },
    });
  };

  const message = data?.hophubSendMessage
    ? Message.from(data.hophubSendMessage)
    : undefined;

  return {
    sendMessage,
    data: message,
    loading,
    error: error as Error | undefined,
  };
}