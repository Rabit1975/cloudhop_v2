import { useMutation, gql } from '@apollo/client';
import { Message } from '@cloudrabbit/ai.entities.message';
import { CreateMessageOptions } from './messages-types.js';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($options: AiCreateMessageOptions!) {
    aiCreateMessage(options: $options) {
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

export type UseCreateMessageResult = {
  /**
   * Function to create a message.
   */
  createMessage: (options: CreateMessageOptions) => Promise<Message | undefined>;

  /**
   * The created message data.
   */
  data?: Message;

  /**
   * Whether the mutation is loading.
   */
  loading: boolean;

  /**
   * The error object if the mutation failed.
   */
  error?: Error;
};

/**
 * A hook to create a new message in a session.
 */
export function useCreateMessage(): UseCreateMessageResult {
  const [mutate, { data, loading, error }] = useMutation(CREATE_MESSAGE_MUTATION);

  const createMessage = async (options: CreateMessageOptions) => {
    const result = await mutate({
      variables: { options },
    });
    return result.data?.aiCreateMessage
      ? Message.from(result.data.aiCreateMessage)
      : undefined;
  };

  return {
    createMessage,
    data: data?.aiCreateMessage ? Message.from(data.aiCreateMessage) : undefined,
    loading,
    error,
  };
}