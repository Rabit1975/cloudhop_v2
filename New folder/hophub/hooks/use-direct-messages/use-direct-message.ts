import { useQuery, gql } from '@apollo/client';
import { DirectMessage } from '@cloudrabbit/hophub.entities.direct-message';

export type UseDirectMessageOptions = {
  /**
   * mock data to use for testing or previewing.
   */
  mockData?: DirectMessage;
  
  /**
   * skip the query execution.
   */
  skip?: boolean;
};

export type UseDirectMessageResult = {
  /**
   * the direct message conversation.
   */
  directMessage?: DirectMessage;

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

interface GetDirectMessageResponse {
  hophubGetConversation: GraphQLDirectMessageConversation;
}

const GET_DIRECT_MESSAGE = gql`
  query GetDirectMessage($conversationId: ID!) {
    hophubGetConversation(options: { conversationId: $conversationId }) {
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
 * hook to fetch a single direct message conversation by id.
 */
export function useDirectMessage(
  conversationId: string,
  options?: UseDirectMessageOptions
): UseDirectMessageResult {
  const { mockData, skip: skipOption } = options || {};
  const skip = Boolean(mockData) || skipOption || !conversationId;

  const { data, loading, error, refetch } = useQuery<GetDirectMessageResponse>(GET_DIRECT_MESSAGE, {
    variables: { conversationId },
    skip,
  });

  if (mockData) {
    return {
      directMessage: mockData,
      loading: false,
      error: undefined,
      refetch: async () => undefined,
    };
  }

  const directMessage = data?.hophubGetConversation
    ? DirectMessage.from({
        id: data.hophubGetConversation.id,
        participantIds: data.hophubGetConversation.members.map((m) => m.userId),
        createdAt: data.hophubGetConversation.createdAt,
        updatedAt: data.hophubGetConversation.updatedAt,
      })
    : undefined;

  return {
    directMessage,
    loading,
    error: error ? new Error(error.message) : undefined,
    refetch,
  };
}