import { PlainMediaAttachment } from '@cloudrabbit/hophub.entities.media-attachment';
import { MessageType } from './message-type.js';

export type PlainMessage = {
  /**
   * Unique identifier for the message.
   */
  id: string;

  /**
   * ID of the conversation this message belongs to.
   */
  conversationId: string;

  /**
   * ID of the user who sent the message.
   */
  senderId: string;

  /**
   * Text content of the message.
   */
  text: string;

  /**
   * Timestamp when the message was created.
   */
  createdAt: string;

  /**
   * Type of the message (e.g., TEXT, MEDIA, SYSTEM).
   */
  type: MessageType;

  /**
   * List of media attachments.
   */
  mediaAttachments?: PlainMediaAttachment[];

  /**
   * List of user IDs who have read the message.
   */
  readBy?: string[];

  /**
   * Timestamp when the message was last updated.
   */
  updatedAt?: string;

  /**
   * Additional metadata.
   */
  metadata?: Record<string, unknown>;
};