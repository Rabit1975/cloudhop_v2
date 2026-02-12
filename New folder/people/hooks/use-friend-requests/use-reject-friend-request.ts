import { gql, useMutation } from '@apollo/client';
import { RejectFriendRequestOptions } from './friend-request-types.js';

const REJECT_FRIEND_REQUEST_MUTATION = gql`
  mutation RejectFriendRequest($options: PeopleRejectFriendRequestOptions!) {
    peopleRejectFriendRequest(options: $options)
  }
`;

export type UseRejectFriendRequestResult = {
  rejectFriendRequest: (requestId: string) => Promise<boolean>;
  loading: boolean;
  error?: Error;
};

/**
 * Hook to reject a friend request.
 */
export function useRejectFriendRequest(): UseRejectFriendRequestResult {
  const [mutation, { loading, error }] = useMutation(REJECT_FRIEND_REQUEST_MUTATION);

  const rejectFriendRequest = async (requestId: string) => {
    const options: RejectFriendRequestOptions = { requestId };
    const result = await mutation({
      variables: { options },
    });

    return Boolean(result.data?.peopleRejectFriendRequest);
  };

  return {
    rejectFriendRequest,
    loading,
    error,
  };
}