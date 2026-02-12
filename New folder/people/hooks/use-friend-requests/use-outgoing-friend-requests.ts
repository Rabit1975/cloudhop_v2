import { gql, useQuery } from '@apollo/client';
import { FriendRequest, PlainFriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { ListFriendRequestsOptions } from './friend-request-types.js';

const LIST_OUTGOING_FRIEND_REQUESTS = gql`
  query ListOutgoingFriendRequests($options: PeopleListFriendRequestsOptions) {
    peopleListFriendRequests(options: $options) {
      id
      fromUserId
      toUserId
      status
      createdAt
    }
  }
`;

export type UseOutgoingFriendRequestsOptions = ListFriendRequestsOptions & {
  mockData?: FriendRequest[];
  skip?: boolean;
};

export type UseOutgoingFriendRequestsResult = {
  friendRequests: FriendRequest[];
  loading: boolean;
  error?: Error;
  refetch: () => void;
};

/**
 * Hook to fetch outgoing friend requests.
 */
export function useOutgoingFriendRequests({
  mockData,
  skip,
  ...options
}: UseOutgoingFriendRequestsOptions = {}): UseOutgoingFriendRequestsResult {
  const { data, loading, error, refetch } = useQuery(LIST_OUTGOING_FRIEND_REQUESTS, {
    skip: skip || !!mockData,
    variables: {
      options: {
        ...options,
        type: 'outgoing',
      },
    },
  });

  if (mockData) {
    return {
      friendRequests: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const friendRequests = (data?.peopleListFriendRequests || []).map(
    (plain: PlainFriendRequest) => FriendRequest.from(plain)
  );

  return {
    friendRequests,
    loading,
    error,
    refetch,
  };
}