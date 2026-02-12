import { gql, useMutation } from '@apollo/client';
import { CancelFriendRequestOptions } from './friend-request-types.js';

// Reusing the reject mutation as the API uses the same underlying operation to cancel/reject requests
const CANCEL_FRIEND_REQUEST_MUTATION = gql`
  mutation CancelFriendRequest($options: PeopleRejectFriendRequestOptions!) {
    peopleRejectFriendRequest(options: $options)
  }
`;

export type UseCancelFriendRequestResult = {
  cancelFriendRequest: (requestId: string) => Promise<boolean>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to cancel an outgoing friend request.
 */
export function useCancelFriendRequest(): UseCancelFriendRequestResult {
  const [mutation, { loading, error }] = useMutation(CANCEL_FRIEND_REQUEST_MUTATION);

  const cancelFriendRequest = async (requestId: string) => {
    const options: CancelFriendRequestOptions = { requestId };
    const result = await mutation({
      variables: { options },
    });

    return Boolean(result.data?.peopleRejectFriendRequest);
  };

  return {
    cancelFriendRequest,
    loading,
    error,
  };
}