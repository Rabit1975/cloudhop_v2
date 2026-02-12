import { gql, useQuery } from '@apollo/client';
import { HopmeetsCalendarIntegration } from './calendar-event-types.js';

const LIST_INTEGRATIONS_QUERY = gql`
  query ListCalendarIntegrations {
    hopmeetsListCalendarIntegrations {
      id
      userId
      provider
      email
      connectedAt
    }
  }
`;

export type UseCalendarIntegrationsOptions = {
  /**
   * Optional mock data.
   */
  mockData?: HopmeetsCalendarIntegration[];
};

export type UseCalendarIntegrationsResult = {
  /**
   * List of connected calendar integrations.
   */
  integrations: HopmeetsCalendarIntegration[];

  /**
   * Loading state.
   */
  loading: boolean;

  /**
   * Error object.
   */
  error?: Error;

  /**
   * Refetch function.
   */
  refetch: () => void;
};

/**
 * Hook to list all connected external calendar integrations.
 */
export function useCalendarIntegrations({
  mockData,
}: UseCalendarIntegrationsOptions = {}): UseCalendarIntegrationsResult {
  const { data, loading, error, refetch } = useQuery(LIST_INTEGRATIONS_QUERY, {
    skip: !!mockData,
  });

  if (mockData) {
    return {
      integrations: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const integrations =
    (data?.hopmeetsListCalendarIntegrations as HopmeetsCalendarIntegration[]) ||
    [];

  return {
    integrations,
    loading,
    error,
    refetch,
  };
}