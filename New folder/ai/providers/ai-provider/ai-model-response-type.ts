/**
 * Represents the response from an AI model.
 */
export type AiModelResponse = {
  /**
   * The generated text response.
   */
  text?: string;

  /**
   * The URL of a generated image, if applicable.
   */
  imageUrl?: string;

  /**
   * Structured JSON data returned by the model, if applicable.
   */
  json?: Record<string, unknown>;

  /**
   * Additional metadata regarding the response (e.g., token usage, latency).
   */
  metadata?: Record<string, unknown>;
};