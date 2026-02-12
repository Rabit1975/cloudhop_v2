import { useQuery, gql } from '@apollo/client';
import { useIsMock } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { UserProfile } from './user-profile-type.js';

export const LIST_FRIENDS = gql`
  query ListFriends($userId: ID, $limit: Int, $offset: Int) {
    peopleListFriends(options: { userId: $userId, limit: $limit, offset: $offset }) {
      userId
      username
      email
      displayName
      imageUrl
      bio
      company
      statusMessage
      presenceStatus
      createdAt
      updatedAt
    }
  }
`;

export type UseFriendsOptions = {
  userId?: string;
  limit?: number;
  offset?: number;
  mockData?: UserProfile[];
};

export type UseFriendsResult = {
  friends: UserProfile[];
  loading: boolean;
  error?: Error;
  refetch: () => void;
};

/**
 * Hook to fetch a user's friends list.
 * @param options - Options for pagination and targeting a specific user.
 * @returns An object containing the friends list, loading state, error, and refetch function.
 */
export function useFriends(options: UseFriendsOptions = {}): UseFriendsResult {
  const isMock = useIsMock();
  const shouldSkip = Boolean(options.mockData) || isMock;

  const { data, loading, error, refetch } = useQuery(LIST_FRIENDS, {
    variables: {
      userId: options.userId,
      limit: options.limit,
      offset: options.offset,
    },
    skip: shouldSkip,
  });

  if (shouldSkip) {
    return {
      friends: options.mockData || [],
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const friends: UserProfile[] = data?.peopleListFriends || [];

  return {
    friends,
    loading,
    error,
    refetch,
  };
}