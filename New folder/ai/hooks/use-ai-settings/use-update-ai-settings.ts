import { useMutation, gql } from '@apollo/client';
import { AiSettings, type PlainAiSettings } from '@cloudrabbit/ai.entities.ai-settings';

const UPDATE_AI_SETTINGS = gql`
  mutation UpdateAiSettings($options: AiSettingsOptions!) {
    aiUpdateAiSettings(options: $options) {
      defaultProvider
      defaultModel
      apiKey
      temperature
      maxTokens
    }
  }
`;

export type UpdateAiSettingsResult = {
  /**
   * Function to execute the update mutation.
   */
  updateAiSettings: (options: PlainAiSettings) => Promise<AiSettings | undefined>;

  /**
   * The updated AI settings entity from the mutation result.
   */
  data?: AiSettings;

  /**
   * Whether the mutation is in progress.
   */
  loading: boolean;

  /**
   * Error message if the mutation failed.
   */
  error?: string;
};

/**
 * Hook to update the AI settings.
 *
 * @returns An object containing the update function and mutation state.
 */
export function useUpdateAiSettings(): UpdateAiSettingsResult {
  const [mutate, { data, loading, error }] = useMutation(UPDATE_AI_SETTINGS);

  const updateAiSettings = async (options: PlainAiSettings) => {
    try {
      const result = await mutate({
        variables: {
          options,
        },
      });

      if (result.data?.aiUpdateAiSettings) {
        return AiSettings.from(result.data.aiUpdateAiSettings);
      }
      return undefined;
    } catch (err) {
      // Errors are handled by the useMutation hook state
      console.error('Failed to update AI settings:', err);
      throw err;
    }
  };

  const settings = data?.aiUpdateAiSettings
    ? AiSettings.from(data.aiUpdateAiSettings)
    : undefined;

  return {
    updateAiSettings,
    data: settings,
    loading,
    error: error?.message,
  };
}