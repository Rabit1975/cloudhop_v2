import { gql, useMutation } from '@apollo/client';
import { FriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { SendFriendRequestOptions } from './friend-request-types.js';

const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation SendFriendRequest($options: PeopleSendFriendRequestOptions!) {
    peopleSendFriendRequest(options: $options) {
      id
      fromUserId
      toUserId
      status
      createdAt
    }
  }
`;

export type UseSendFriendRequestResult = {
  sendFriendRequest: (toUserId: string) => Promise<FriendRequest | undefined>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to send a new friend request.
 */
export function useSendFriendRequest(): UseSendFriendRequestResult {
  const [mutation, { loading, error }] = useMutation(SEND_FRIEND_REQUEST_MUTATION);

  const sendFriendRequest = async (toUserId: string) => {
    const options: SendFriendRequestOptions = { toUserId };
    const result = await mutation({
      variables: { options },
    });

    if (result.data?.peopleSendFriendRequest) {
      return FriendRequest.from(result.data.peopleSendFriendRequest);
    }
    return undefined;
  };

  return {
    sendFriendRequest,
    loading,
    error,
  };
}