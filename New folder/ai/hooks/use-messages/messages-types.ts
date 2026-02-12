export type ListMessagesOptions = {
  /**
   * The session ID to fetch messages for.
   */
  sessionId: string;

  /**
   * The number of messages to skip.
   */
  offset?: number;

  /**
   * The number of messages to fetch.
   */
  limit?: number;
};

export type CreateMessageOptions = {
  /**
   * The session ID to add the message to.
   * If not provided, a new session will be created.
   */
  sessionId?: string;

  /**
   * The message content.
   */
  prompt: string;

  /**
   * The AI provider to use.
   */
  provider?: string;

  /**
   * The AI model to use.
   */
  model?: string;
};