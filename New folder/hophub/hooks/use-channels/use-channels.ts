import { useQuery, gql } from '@apollo/client';
import { Channel } from '@cloudrabbit/hophub.entities.channel';
import { mapToChannel, type GqlConversation } from './channel-mapper.js';

const LIST_CHANNELS_QUERY = gql`
  query ListChannels($options: HophubListConversationsOptions) {
    hophubListConversations(options: $options) {
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

export type UseChannelsOptions = {
  /**
   * The number of items to skip.
   */
  offset?: number;
  /**
   * The number of items to fetch.
   */
  limit?: number;
  /**
   * Optional mock data for testing or previewing.
   */
  mockData?: Channel[];
};

export type UseChannelsResult = {
  /**
   * The list of channels.
   */
  channels: Channel[];
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
 * Hook to list all HopHub channels.
 */
export function useChannels(options?: UseChannelsOptions): UseChannelsResult {
  const { offset, limit, mockData } = options || {};
  const skip = !!mockData;

  const { data, loading, error, refetch } = useQuery(LIST_CHANNELS_QUERY, {
    variables: {
      options: {
        type: 'CHANNEL',
        offset,
        limit,
      },
    },
    skip,
  });

  const channels = mockData || data?.hophubListConversations?.map((c: GqlConversation) => mapToChannel(c)) || [];

  return {
    channels,
    loading: mockData ? false : loading,
    error: mockData ? undefined : error,
    refetch,
  };
}