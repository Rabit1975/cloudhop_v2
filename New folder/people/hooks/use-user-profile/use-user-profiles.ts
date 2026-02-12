import { useQuery, gql, type ApolloQueryResult } from '@apollo/client';
import { UserProfile, type PlainUserProfile } from '@cloudrabbit/people.entities.user-profile';

export type UseUserProfilesOptions = {
  /**
   * The number of items to skip.
   */
  offset?: number;

  /**
   * The maximum number of items to return.
   */
  limit?: number;

  /**
   * Search term to filter profiles.
   */
  search?: string;

  /**
   * Mock data to return instead of executing the query.
   */
  mockData?: UserProfile[];
};

export type UseUserProfilesResult = {
  /**
   * The list of user profile entities.
   */
  userProfiles: UserProfile[];

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
  refetch: (variables?: Partial<UseUserProfilesOptions>) => Promise<ApolloQueryResult<any>>;
};

const LIST_USER_PROFILES = gql`
  query ListUserProfiles($offset: Int, $limit: Int, $search: String) {
    peopleListUserProfiles(options: { offset: $offset, limit: $limit, search: $search }) {
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
 * Hook to list multiple user profiles.
 * @param options Options for filtering and pagination.
 */
export function useUserProfiles(options?: UseUserProfilesOptions): UseUserProfilesResult {
  const skip = !!options?.mockData;
  const { data, loading, error, refetch } = useQuery(LIST_USER_PROFILES, {
    variables: {
      offset: options?.offset,
      limit: options?.limit,
      search: options?.search,
    },
    skip,
  });

  if (options?.mockData) {
    return {
      userProfiles: options.mockData,
      loading: false,
      error: undefined,
      refetch: async () => ({ data: options.mockData, loading: false, networkStatus: 7 } as ApolloQueryResult<any>),
    };
  }

  const userProfiles = data?.peopleListUserProfiles
    ? data.peopleListUserProfiles.map(mapToUserProfile)
    : [];

  return {
    userProfiles,
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