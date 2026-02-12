import { PlainMessage } from './message-type.js';
import { MessageRole } from './message-role-type.js';

export class Message {
  constructor(
    /**
     * Unique identifier of the message.
     */
    readonly id: string,

    /**
     * The session ID this message belongs to.
     */
    readonly sessionId: string,

    /**
     * The content of the message.
     */
    readonly text: string,

    /**
     * The role of the sender (user or AI).
     */
    readonly role: MessageRole,

    /**
     * Timestamp when the message was created.
     */
    readonly createdAt: string,

    /**
     * Timestamp when the message was last updated.
     */
    readonly updatedAt?: string,

    /**
     * The ID of the user who sent the message (if applicable).
     */
    readonly userId?: string
  ) {}

  /**
   * Serialize the Message entity into a plain object.
   */
  toObject(): PlainMessage {
    return {
      id: this.id,
      sessionId: this.sessionId,
      text: this.text,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }

  /**
   * Create a Message entity from a plain object.
   */
  static from(plainMessage: PlainMessage): Message {
    return new Message(
      plainMessage.id,
      plainMessage.sessionId,
      plainMessage.text,
      plainMessage.role,
      plainMessage.createdAt,
      plainMessage.updatedAt,
      plainMessage.userId
    );
  }
}