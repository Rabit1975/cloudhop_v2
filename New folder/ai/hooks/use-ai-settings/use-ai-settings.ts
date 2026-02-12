import { useQuery, gql } from '@apollo/client';
import { AiSettings } from '@cloudrabbit/ai.entities.ai-settings';

const GET_AI_SETTINGS = gql`
  query GetAiSettings {
    aiGetAiSettings {
      defaultProvider
      defaultModel
      apiKey
      temperature
      maxTokens
    }
  }
`;

export type UseAiSettingsOptions = {
  /**
   * Mock data to return instead of executing the query.
   */
  mockData?: AiSettings;
};

export type UseAiSettingsResult = {
  /**
   * The AI settings entity.
   */
  settings?: AiSettings;

  /**
   * Whether the query is loading.
   */
  loading: boolean;

  /**
   * Error message if the query failed.
   */
  error?: string;

  /**
   * Function to refetch the data.
   */
  refetch: () => void;
};

/**
 * Hook to fetch the current AI settings.
 *
 * @param options - Configuration options including mock data.
 * @returns An object containing the settings, loading state, error, and refetch function.
 */
export function useAiSettings(options?: UseAiSettingsOptions): UseAiSettingsResult {
  const skip = !!options?.mockData;

  const { data, loading, error, refetch } = useQuery(GET_AI_SETTINGS, {
    skip,
  });

  if (options?.mockData) {
    return {
      settings: options.mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const settings = data?.aiGetAiSettings
    ? AiSettings.from(data.aiGetAiSettings)
    : undefined;

  return {
    settings,
    loading,
    error: error?.message,
    refetch,
  };
}