export type PlainAiSettings = {
  /**
   * The default AI provider to use (e.g., 'openai', 'anthropic').
   */
  defaultProvider?: string;

  /**
   * The default model identifier for the selected provider.
   */
  defaultModel?: string;

  /**
   * The API key for authentication with the AI provider.
   */
  apiKey?: string;

  /**
   * The sampling temperature to use for generating responses.
   */
  temperature?: number;

  /**
   * The maximum number of tokens to generate in the response.
   */
  maxTokens?: number;
};