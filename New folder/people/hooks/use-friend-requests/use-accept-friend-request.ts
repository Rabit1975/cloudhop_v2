import { gql, useMutation } from '@apollo/client';
import { AcceptFriendRequestOptions } from './friend-request-types.js';
import { Friendship } from './friendship-type.js';

const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation AcceptFriendRequest($options: PeopleAcceptFriendRequestOptions!) {
    peopleAcceptFriendRequest(options: $options) {
      id
      userId1
      userId2
      createdAt
    }
  }
`;

export type UseAcceptFriendRequestResult = {
  acceptFriendRequest: (requestId: string) => Promise<Friendship | undefined>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to accept a friend request.
 */
export function useAcceptFriendRequest(): UseAcceptFriendRequestResult {
  const [mutation, { loading, error }] = useMutation(ACCEPT_FRIEND_REQUEST_MUTATION);

  const acceptFriendRequest = async (requestId: string) => {
    const options: AcceptFriendRequestOptions = { requestId };
    const result = await mutation({
      variables: { options },
    });

    return result.data?.peopleAcceptFriendRequest as Friendship | undefined;
  };

  return {
    acceptFriendRequest,
    loading,
    error,
  };
}