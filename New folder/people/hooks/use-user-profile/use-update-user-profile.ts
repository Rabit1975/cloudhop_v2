import { useMutation, gql } from '@apollo/client';
import { UserProfile, type PlainUserProfile } from '@cloudrabbit/people.entities.user-profile';

export type UpdateUserProfileValues = {
  /**
   * The new display name for the user.
   */
  displayName?: string;

  /**
   * The new bio for the user.
   */
  bio?: string;

  /**
   * The new company for the user.
   */
  company?: string;

  /**
   * The new image URL for the user's profile.
   */
  imageUrl?: string;
};

export type UseUpdateUserProfileResult = {
  /**
   * Function to execute the update mutation.
   */
  updateUserProfile: (values: UpdateUserProfileValues) => Promise<UserProfile | undefined>;

  /**
   * The updated user profile entity.
   */
  data?: UserProfile;

  /**
   * Whether the mutation is in progress.
   */
  loading: boolean;

  /**
   * Error object if the mutation failed.
   */
  error?: Error;
};

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($displayName: String, $bio: String, $company: String, $imageUrl: String) {
    peopleUpdateUserProfile(options: { displayName: $displayName, bio: $bio, company: $company, imageUrl: $imageUrl }) {
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
 * Hook to update the current user's profile.
 */
export function useUpdateUserProfile(): UseUpdateUserProfileResult {
  const [mutate, { data, loading, error }] = useMutation(UPDATE_USER_PROFILE);

  const updateUserProfile = async (values: UpdateUserProfileValues) => {
    try {
      const result = await mutate({
        variables: values,
      });

      if (result.data?.peopleUpdateUserProfile) {
        return mapToUserProfile(result.data.peopleUpdateUserProfile);
      }
      return undefined;
    } catch (err) {
      console.error('Failed to update user profile:', err);
      throw err;
    }
  };

  const userProfile = data?.peopleUpdateUserProfile
    ? mapToUserProfile(data.peopleUpdateUserProfile)
    : undefined;

  return {
    updateUserProfile,
    data: userProfile,
    loading,
    error,
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