import { gql, useMutation } from '@apollo/client';

const REMOVE_INTEGRATION_MUTATION = gql`
  mutation RemoveCalendarIntegration($integrationId: ID!) {
    hopmeetsRemoveCalendarIntegration(options: { integrationId: $integrationId })
  }
`;

export type UseRemoveCalendarIntegrationResult = {
  /**
   * Function to remove a calendar integration.
   */
  removeIntegration: (integrationId: string) => Promise<boolean>;

  /**
   * Loading state.
   */
  loading: boolean;

  /**
   * Error object.
   */
  error?: Error;
};

/**
 * Hook to remove an existing external calendar integration.
 */
export function useRemoveCalendarIntegration(): UseRemoveCalendarIntegrationResult {
  const [mutate, { loading, error }] = useMutation(REMOVE_INTEGRATION_MUTATION);

  const removeIntegration = async (integrationId: string) => {
    const { data } = await mutate({
      variables: { integrationId },
    });

    return Boolean(data?.hopmeetsRemoveCalendarIntegration);
  };

  return {
    removeIntegration,
    loading,
    error,
  };
}