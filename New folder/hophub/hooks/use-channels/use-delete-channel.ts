import { useMutation, gql } from '@apollo/client';

const DELETE_CHANNEL_MUTATION = gql`
  mutation DeleteChannel($options: HophubDeleteConversationOptions!) {
    hophubDeleteConversation(options: $options)
  }
`;

export type DeleteChannelFunction = (channelId: string) => Promise<boolean>;

export type UseDeleteChannelResult = {
  /**
   * Function to delete a channel.
   */
  deleteChannel: DeleteChannelFunction;
  /**
   * Whether the mutation is in flight.
   */
  loading: boolean;
  /**
   * Any error that occurred.
   */
  error?: Error;
};

/**
 * Hook to delete a HopHub channel.
 */
export function useDeleteChannel(): UseDeleteChannelResult {
  const [mutate, { loading, error }] = useMutation(DELETE_CHANNEL_MUTATION);

  const deleteChannel: DeleteChannelFunction = async (channelId) => {
    try {
      const result = await mutate({
        variables: {
          options: {
            conversationId: channelId,
          },
        },
      });

      return Boolean(result.data?.hophubDeleteConversation);
    } catch (err) {
      console.error('Failed to delete channel:', err);
      throw err;
    }
  };

  return {
    deleteChannel,
    loading,
    error,
  };
}