import { useMutation, gql } from '@apollo/client';
import { DirectMessage } from '@cloudrabbit/hophub.entities.direct-message';

export type UseCreateDirectMessageResult = {
  /**
   * function to create a new direct message conversation.
   */
  createDirectMessage: (memberIds: string[]) => Promise<DirectMessage | undefined>;

  /**
   * indicates if the mutation is currently executing.
   */
  loading: boolean;

  /**
   * error object if the mutation failed.
   */
  error?: Error;

  /**
   * the created direct message conversation.
   */
  data?: DirectMessage;
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

interface CreateDirectMessageResponse {
  hophubCreateConversation: GraphQLDirectMessageConversation;
}

const CREATE_DIRECT_MESSAGE = gql`
  mutation CreateDirectMessage($memberIds: [ID!]) {
    hophubCreateConversation(options: { type: DM, memberIds: $memberIds }) {
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
 * hook to create a new direct message conversation.
 */
export function useCreateDirectMessage(): UseCreateDirectMessageResult {
  const [mutate, { loading, error, data }] = useMutation<CreateDirectMessageResponse>(CREATE_DIRECT_MESSAGE);

  const createDirectMessage = async (memberIds: string[]) => {
    const result = await mutate({
      variables: {
        memberIds,
      },
    });

    if (result.data?.hophubCreateConversation) {
      return DirectMessage.from({
        id: result.data.hophubCreateConversation.id,
        participantIds: result.data.hophubCreateConversation.members.map(
          (m) => m.userId
        ),
        createdAt: result.data.hophubCreateConversation.createdAt,
        updatedAt: result.data.hophubCreateConversation.updatedAt,
      });
    }
    return undefined;
  };

  const createdDirectMessage = data?.hophubCreateConversation
    ? DirectMessage.from({
        id: data.hophubCreateConversation.id,
        participantIds: data.hophubCreateConversation.members.map((m) => m.userId),
        createdAt: data.hophubCreateConversation.createdAt,
        updatedAt: data.hophubCreateConversation.updatedAt,
      })
    : undefined;

  return {
    createDirectMessage,
    loading,
    error: error ? new Error(error.message) : undefined,
    data: createdDirectMessage,
  };
}