import { useMutation, gql } from '@apollo/client';
import { PresenceStatus, type UserPresenceStatus } from '@cloudrabbit/people.entities.presence-status';

export const UPDATE_USER_PRESENCE = gql`
  mutation UpdateUserPresence($status: PeopleUserPresenceStatus!) {
    peopleUpdateUserPresence(options: { status: $status }) {
      userId
      status
      lastSeenAt
    }
  }
`;

export type UseUpdatePresenceStatusResult = {
  /**
   * Function to trigger the presence status update.
   */
  updateStatus: (status: UserPresenceStatus) => Promise<PresenceStatus | undefined>;

  /**
   * Indicates if the mutation is currently loading.
   */
  loading: boolean;

  /**
   * Any error that occurred during the mutation.
   */
  error?: Error;
};

/**
 * Hook to update the current user's presence status.
 * @returns An object containing the update function, loading state, and error.
 */
export function useUpdatePresenceStatus(): UseUpdatePresenceStatusResult {
  const [mutate, { loading, error }] = useMutation(UPDATE_USER_PRESENCE);

  const updateStatus = async (status: UserPresenceStatus) => {
    const result = await mutate({
      variables: { status },
    });

    return result.data?.peopleUpdateUserPresence
      ? PresenceStatus.from(result.data.peopleUpdateUserPresence)
      : undefined;
  };

  return {
    updateStatus,
    loading,
    error,
  };
}