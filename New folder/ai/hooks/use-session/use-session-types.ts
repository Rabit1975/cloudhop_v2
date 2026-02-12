export type ListSessionsOptions = {
  /**
   * The number of sessions to skip.
   */
  offset?: number;

  /**
   * The maximum number of sessions to return.
   */
  limit?: number;

  /**
   * Filter sessions by user ID.
   */
  userId?: string;
};

export type GetSessionOptions = {
  /**
   * The unique identifier of the session to retrieve.
   */
  sessionId: string;
};