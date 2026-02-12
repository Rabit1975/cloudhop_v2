import { useMutation, gql } from '@apollo/client';
import { SocialConnection, SocialConnectionStatus } from '@cloudrabbit/people.entities.social-connection';

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($toUserId: ID!) {
    peopleSendFriendRequest(options: { toUserId: $toUserId }) {
      id
      fromUserId
      toUserId
      status
      createdAt
    }
  }
`;

export type UseAddFriendResult = {
  addFriend: (toUserId: string) => Promise<SocialConnection | null>;
  loading: boolean;
  error?: Error;
  data?: SocialConnection | null;
};

/**
 * Hook to send a friend request (add a connection).
 * @returns An object containing the addFriend function and mutation state.
 */
export function useAddFriend(): UseAddFriendResult {
  const [mutate, { loading, error, data }] = useMutation(SEND_FRIEND_REQUEST);

  const addFriend = async (toUserId: string) => {
    try {
      const result = await mutate({
        variables: { toUserId },
      });

      if (result.data?.peopleSendFriendRequest) {
        const raw = result.data.peopleSendFriendRequest;
        // Map the GraphQL result to SocialConnection entity
        const connection = SocialConnection.from({
          id: raw.id,
          userId1: raw.fromUserId,
          userId2: raw.toUserId,
          status: raw.status as SocialConnectionStatus,
          createdAt: raw.createdAt,
        });
        return connection;
      }
      return null;
    } catch (err) {
      console.error('Failed to send friend request:', err);
      throw err;
    }
  };

  const connectionData = data?.peopleSendFriendRequest
    ? SocialConnection.from({
        id: data.peopleSendFriendRequest.id,
        userId1: data.peopleSendFriendRequest.fromUserId,
        userId2: data.peopleSendFriendRequest.toUserId,
        status: data.peopleSendFriendRequest.status as SocialConnectionStatus,
        createdAt: data.peopleSendFriendRequest.createdAt,
      })
    : null;

  return {
    addFriend,
    loading,
    error,
    data: connectionData,
  };
}