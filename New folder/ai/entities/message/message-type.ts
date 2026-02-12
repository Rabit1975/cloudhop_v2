import { MessageRole } from './message-role-type.js';

export type PlainMessage = {
  /**
   * Unique identifier of the message.
   */
  id: string;

  /**
   * The session ID this message belongs to.
   */
  sessionId: string;

  /**
   * The content of the message.
   */
  text: string;

  /**
   * The role of the sender (user or AI).
   */
  role: MessageRole;

  /**
   * Timestamp when the message was created.
   */
  createdAt: string;

  /**
   * Timestamp when the message was last updated.
   */
  updatedAt?: string;

  /**
   * The ID of the user who sent the message (if applicable).
   */
  userId?: string;
};