import { useMutation, gql } from '@apollo/client';
import { Channel } from '@cloudrabbit/hophub.entities.channel';
import { mapToChannel } from './channel-mapper.js';

const UPDATE_CHANNEL_MUTATION = gql`
  mutation UpdateChannel($options: HophubUpdateConversationOptions!) {
    hophubUpdateConversation(options: $options) {
      id
      name
      description
      type
      createdAt
      updatedAt
      members {
        userId
        role
      }
    }
  }
`;

export type UpdateChannelFunction = (
  channelId: string,
  name?: string,
  description?: string,
  imageUrl?: string
) => Promise<Channel | undefined>;

export type UseUpdateChannelResult = {
  /**
   * Function to update an existing channel.
   */
  updateChannel: UpdateChannelFunction;
  /**
   * The updated channel data.
   */
  data?: Channel;
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
 * Hook to update an existing HopHub channel.
 */
export function useUpdateChannel(): UseUpdateChannelResult {
  const [mutate, { data, loading, error }] = useMutation(UPDATE_CHANNEL_MUTATION);

  const updateChannel: UpdateChannelFunction = async (
    channelId,
    name,
    description,
    imageUrl
  ) => {
    try {
      const result = await mutate({
        variables: {
          options: {
            conversationId: channelId,
            name,
            description,
            imageUrl,
          },
        },
      });

      return result.data?.hophubUpdateConversation
        ? mapToChannel(result.data.hophubUpdateConversation)
        : undefined;
    } catch (err) {
      console.error('Failed to update channel:', err);
      throw err;
    }
  };

  const channel = data?.hophubUpdateConversation
    ? mapToChannel(data.hophubUpdateConversation)
    : undefined;

  return {
    updateChannel,
    data: channel,
    loading,
    error,
  };
}