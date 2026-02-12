import { gql, useMutation } from '@apollo/client';
import {
  HopmeetsAddCalendarIntegrationOptions,
  HopmeetsCalendarIntegration,
} from './calendar-event-types.js';

const ADD_INTEGRATION_MUTATION = gql`
  mutation AddCalendarIntegration(
    $provider: String!
    $authCode: String!
    $redirectUri: String!
  ) {
    hopmeetsAddCalendarIntegration(
      options: {
        provider: $provider
        authCode: $authCode
        redirectUri: $redirectUri
      }
    ) {
      id
      userId
      provider
      email
      connectedAt
    }
  }
`;

export type UseAddCalendarIntegrationResult = {
  /**
   * Function to add a new calendar integration.
   */
  addIntegration: (
    options: HopmeetsAddCalendarIntegrationOptions
  ) => Promise<HopmeetsCalendarIntegration>;

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
 * Hook to add a new external calendar integration (e.g. Google Calendar).
 */
export function useAddCalendarIntegration(): UseAddCalendarIntegrationResult {
  const [mutate, { loading, error }] = useMutation(ADD_INTEGRATION_MUTATION);

  const addIntegration = async (
    options: HopmeetsAddCalendarIntegrationOptions
  ) => {
    const { data } = await mutate({
      variables: {
        provider: options.provider,
        authCode: options.authCode,
        redirectUri: options.redirectUri,
      },
    });

    return data.hopmeetsAddCalendarIntegration as HopmeetsCalendarIntegration;
  };

  return {
    addIntegration,
    loading,
    error,
  };
}