import { useQuery, gql, type ApolloQueryResult } from '@apollo/client';
import { UserProfile, type PlainUserProfile } from '@cloudrabbit/people.entities.user-profile';

export type UseUserProfileOptions = {
  /**
   * Mock data to return instead of executing the query.
   */
  mockData?: UserProfile;
};

export type UseUserProfileResult = {
  /**
   * The user profile entity.
   */
  userProfile?: UserProfile;

  /**
   * Whether the query is loading.
   */
  loading: boolean;

  /**
   * Error object if the query failed.
   */
  error?: Error;

  /**
   * Function to refetch the query.
   */
  refetch: (variables?: Partial<{ userId: string }>) => Promise<ApolloQueryResult<any>>;
};

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    peopleGetUserProfile(options: { userId: $userId }) {
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

/**
 * Hook to fetch a single user profile.
 * @param userId The ID of the user to fetch.
 * @param options Options for the hook.
 */
export function useUserProfile(userId?: string, options?: UseUserProfileOptions): UseUserProfileResult {
  const skip = !userId || !!options?.mockData;
  const { data, loading, error, refetch } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
    skip,
  });

  if (options?.mockData) {
    return {
      userProfile: options.mockData,
      loading: false,
      error: undefined,
      refetch: async () => ({ data: options.mockData, loading: false, networkStatus: 7 } as ApolloQueryResult<any>),
    };
  }

  const userProfile = data?.peopleGetUserProfile
    ? mapToUserProfile(data.peopleGetUserProfile)
    : undefined;

  return {
    userProfile,
    loading,
    error,
    refetch,
  };
}

function mapToUserProfile(data: any): UserProfile {
  const [firstName, ...rest] = (data.displayName || data.username || '').split(' ');
  const lastName = rest.join(' ') || '';

  const plainProfile: PlainUserProfile = {
    id: data.userId,
    userId: data.userId,
    firstName: firstName || 'Unknown',
    lastName,
    email: data.email,
    profilePicture: data.imageUrl,
    statusMessage: data.statusMessage,
    presenceStatus: data.presenceStatus,
    socialConnections: [],
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  return UserProfile.from(plainProfile);
}