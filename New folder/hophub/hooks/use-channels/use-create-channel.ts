import { useMutation, gql } from '@apollo/client';
import { Channel } from '@cloudrabbit/hophub.entities.channel';
import { mapToChannel } from './channel-mapper.js';

const CREATE_CHANNEL_MUTATION = gql`
  mutation CreateChannel($options: HophubCreateConversationOptions!) {
    hophubCreateConversation(options: $options) {
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

export type CreateChannelFunction = (
  name: string,
  description: string,
  imageUrl?: string,
  memberIds?: string[]
) => Promise<Channel | undefined>;

export type UseCreateChannelResult = {
  /**
   * Function to create a new channel.
   */
  createChannel: CreateChannelFunction;
  /**
   * The created channel data.
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
 * Hook to create a new HopHub channel.
 */
export function useCreateChannel(): UseCreateChannelResult {
  const [mutate, { data, loading, error }] = useMutation(CREATE_CHANNEL_MUTATION);

  const createChannel: CreateChannelFunction = async (
    name,
    description,
    imageUrl,
    memberIds
  ) => {
    try {
      const result = await mutate({
        variables: {
          options: {
            type: 'CHANNEL',
            name,
            description,
            imageUrl,
            memberIds,
          },
        },
      });

      return result.data?.hophubCreateConversation
        ? mapToChannel(result.data.hophubCreateConversation)
        : undefined;
    } catch (err) {
      console.error('Failed to create channel:', err);
      throw err;
    }
  };

  const channel = data?.hophubCreateConversation
    ? mapToChannel(data.hophubCreateConversation)
    : undefined;

  return {
    createChannel,
    data: channel,
    loading,
    error,
  };
}