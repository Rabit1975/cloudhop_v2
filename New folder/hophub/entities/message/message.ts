import { MediaAttachment } from '@cloudrabbit/hophub.entities.media-attachment';
import { PlainMessage } from './plain-message-type.js';
import { MessageType } from './message-type.js';

export class Message {
  constructor(
    /**
     * Unique identifier for the message.
     */
    readonly id: string,
    /**
     * ID of the conversation this message belongs to.
     */
    readonly conversationId: string,
    /**
     * ID of the user who sent the message.
     */
    readonly senderId: string,
    /**
     * Text content of the message.
     */
    readonly text: string,
    /**
     * Timestamp when the message was created.
     */
    readonly createdAt: string,
    /**
     * Type of the message.
     */
    readonly type: MessageType = 'TEXT',
    /**
     * List of media attachments.
     */
    readonly mediaAttachments: MediaAttachment[] = [],
    /**
     * List of user IDs who have read the message.
     */
    readonly readBy: string[] = [],
    /**
     * Timestamp when the message was last updated.
     */
    readonly updatedAt?: string,
    /**
     * Additional metadata.
     */
    readonly metadata?: Record<string, unknown>
  ) {}

  /**
   * Serialize the Message entity into a plain object.
   */
  toObject(): PlainMessage {
    return {
      id: this.id,
      conversationId: this.conversationId,
      senderId: this.senderId,
      text: this.text,
      createdAt: this.createdAt,
      type: this.type,
      mediaAttachments: this.mediaAttachments.map((attachment) => attachment.toObject()),
      readBy: this.readBy,
      updatedAt: this.updatedAt,
      metadata: this.metadata,
    };
  }

  /**
   * Create a Message entity from a plain object.
   */
  static from(plain: PlainMessage): Message {
    return new Message(
      plain.id,
      plain.conversationId,
      plain.senderId,
      plain.text,
      plain.createdAt,
      plain.type,
      plain.mediaAttachments
        ? plain.mediaAttachments.map((plainAttachment) => MediaAttachment.from(plainAttachment))
        : [],
      plain.readBy || [],
      plain.updatedAt,
      plain.metadata
    );
  }
}