import { gql, useQuery } from '@apollo/client';
import { FriendRequest, PlainFriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { ListFriendRequestsOptions } from './friend-request-types.js';

const LIST_INCOMING_FRIEND_REQUESTS = gql`
  query ListIncomingFriendRequests($options: PeopleListFriendRequestsOptions) {
    peopleListFriendRequests(options: $options) {
      id
      fromUserId
      toUserId
      status
      createdAt
    }
  }
`;

export type UseIncomingFriendRequestsOptions = ListFriendRequestsOptions & {
  mockData?: FriendRequest[];
  skip?: boolean;
};

export type UseIncomingFriendRequestsResult = {
  friendRequests: FriendRequest[];
  loading: boolean;
  error?: Error;
  refetch: () => void;
};

/**
 * Hook to fetch incoming friend requests.
 */
export function useIncomingFriendRequests({
  mockData,
  skip,
  ...options
}: UseIncomingFriendRequestsOptions = {}): UseIncomingFriendRequestsResult {
  const { data, loading, error, refetch } = useQuery(LIST_INCOMING_FRIEND_REQUESTS, {
    skip: skip || !!mockData,
    variables: {
      options: {
        ...options,
        type: 'incoming',
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