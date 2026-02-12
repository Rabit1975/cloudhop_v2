/**
 * Represents a request to an AI model.
 */
export type AiModelRequest = {
  /**
   * The input prompt for the AI model.
   */
  prompt: string;

  /**
   * Optional system instructions to guide the model's behavior.
   */
  systemPrompt?: string;

  /**
   * Additional options for the AI request, such as temperature or tokens.
   */
  options?: Record<string, unknown>;

  /**
   * The specific model identifier to use (e.g., 'gpt-4', 'claude-v1').
   */
  model?: string;

  /**
   * The provider identifier (e.g., 'openai').
   */
  provider?: string;

  /**
   * Callback function for handling streaming responses.
   * If provided, the response will be streamed in chunks.
   */
  stream?: (chunk: string) => void;
};