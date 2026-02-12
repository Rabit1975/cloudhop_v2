import { useMutation, gql } from '@apollo/client';

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($friendUserId: ID!) {
    peopleRemoveFriend(options: { friendUserId: $friendUserId })
  }
`;

export type UseRemoveFriendResult = {
  removeFriend: (friendUserId: string) => Promise<boolean>;
  loading: boolean;
  error?: Error;
  success: boolean;
};

/**
 * Hook to remove a friend connection.
 * @returns An object containing the removeFriend function and mutation state.
 */
export function useRemoveFriend(): UseRemoveFriendResult {
  const [mutate, { loading, error, data }] = useMutation(REMOVE_FRIEND);

  const removeFriend = async (friendUserId: string) => {
    try {
      const result = await mutate({
        variables: { friendUserId },
      });
      return Boolean(result.data?.peopleRemoveFriend);
    } catch (err) {
      console.error('Failed to remove friend:', err);
      throw err;
    }
  };

  return {
    removeFriend,
    loading,
    error,
    success: Boolean(data?.peopleRemoveFriend),
  };
}