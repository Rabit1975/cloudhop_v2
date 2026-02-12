import { PlainSession } from './session-type.js';

export class Session {
  constructor(
    /**
     * Unique identifier of the session.
     */
    readonly id: string,

    /**
     * Name of the session.
     */
    readonly name: string,

    /**
     * The start time of the session.
     */
    readonly createdAt: string,

    /**
     * The AI provider used (e.g., OpenAI, Anthropic).
     */
    readonly provider?: string,

    /**
     * The specific AI model used for the session.
     */
    readonly model?: string,

    /**
     * The user ID associated with the session.
     */
    readonly userId?: string,

    /**
     * The end time or last update time of the session.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serialize the Session entity into a plain object.
   */
  toObject(): PlainSession {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      provider: this.provider,
      model: this.model,
      userId: this.userId,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Create a Session entity from a plain object.
   */
  static from(plainSession: PlainSession) {
    return new Session(
      plainSession.id,
      plainSession.name,
      plainSession.createdAt,
      plainSession.provider,
      plainSession.model,
      plainSession.userId,
      plainSession.updatedAt
    );
  }
}