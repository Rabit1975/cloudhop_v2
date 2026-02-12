import { useQuery, gql } from '@apollo/client';
import { Channel } from '@cloudrabbit/hophub.entities.channel';
import { mapToChannel } from './channel-mapper.js';

const GET_CHANNEL_QUERY = gql`
  query GetChannel($options: HophubGetConversationOptions!) {
    hophubGetConversation(options: $options) {
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

export type UseChannelOptions = {
  /**
   * Optional mock data for testing.
   */
  mockData?: Channel;
};

export type UseChannelResult = {
  /**
   * The fetched channel.
   */
  channel?: Channel;
  /**
   * Whether the query is loading.
   */
  loading: boolean;
  /**
   * Any error that occurred.
   */
  error?: Error;
  /**
   * Function to refetch the data.
   */
  refetch: () => Promise<unknown>;
};

/**
 * Hook to fetch a single HopHub channel by ID.
 */
export function useChannel(channelId: string, options?: UseChannelOptions): UseChannelResult {
  const { mockData } = options || {};
  const skip = !!mockData || !channelId;

  const { data, loading, error, refetch } = useQuery(GET_CHANNEL_QUERY, {
    variables: {
      options: {
        conversationId: channelId,
      },
    },
    skip,
  });

  const channel = mockData || (data?.hophubGetConversation
    ? mapToChannel(data.hophubGetConversation)
    : undefined);

  return {
    channel,
    loading: mockData ? false : loading,
    error: mockData ? undefined : error,
    refetch,
  };
}