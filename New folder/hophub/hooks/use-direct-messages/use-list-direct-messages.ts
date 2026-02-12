import { useQuery, gql } from '@apollo/client';
import { DirectMessage } from '@cloudrabbit/hophub.entities.direct-message';

export type UseListDirectMessagesOptions = {
  /**
   * mock data to use for testing or previewing.
   */
  mockData?: DirectMessage[];
};

export type UseListDirectMessagesResult = {
  /**
   * the list of direct message conversations.
   */
  directMessages: DirectMessage[];

  /**
   * indicates if the data is currently loading.
   */
  loading: boolean;

  /**
   * error object if the query failed.
   */
  error?: Error;

  /**
   * function to refetch the data.
   */
  refetch: () => Promise<unknown>;
};

// Interface for GraphQL response structure
interface GraphQLDirectMessageMember {
  userId: string;
}

interface GraphQLDirectMessageConversation {
  id: string;
  members: GraphQLDirectMessageMember[];
  createdAt: string;
  updatedAt: string;
}

interface ListDirectMessagesResponse {
  hophubListConversations: GraphQLDirectMessageConversation[];
}

const LIST_DIRECT_MESSAGES = gql`
  query ListDirectMessages {
    hophubListConversations(options: { type: DM }) {
      id
      members {
        userId
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * hook to list all direct message conversations for the current user.
 */
export function useListDirectMessages(options?: UseListDirectMessagesOptions): UseListDirectMessagesResult {
  const { mockData } = options || {};
  const skip = Boolean(mockData);

  const { data, loading, error, refetch } = useQuery<ListDirectMessagesResponse>(LIST_DIRECT_MESSAGES, {
    skip,
  });

  if (mockData) {
    return {
      directMessages: mockData,
      loading: false,
      error: undefined,
      refetch: async () => undefined,
    };
  }

  const directMessages = data?.hophubListConversations
    ? data.hophubListConversations.map((conversation) =>
        DirectMessage.from({
          id: conversation.id,
          participantIds: conversation.members.map((m) => m.userId),
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
        })
      )
    : [];

  return {
    directMessages,
    loading,
    error: error ? new Error(error.message) : undefined,
    refetch,
  };
}