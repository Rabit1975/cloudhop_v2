export type PlainSession = {
  /**
   * Unique identifier of the session.
   */
  id: string;

  /**
   * Name of the session.
   */
  name: string;

  /**
   * The start time of the session.
   */
  createdAt: string;

  /**
   * The AI provider used (e.g., OpenAI, Anthropic).
   */
  provider?: string;

  /**
   * The specific AI model used for the session.
   */
  model?: string;

  /**
   * The user ID associated with the session.
   */
  userId?: string;

  /**
   * The end time or last update time of the session.
   */
  updatedAt?: string;
};