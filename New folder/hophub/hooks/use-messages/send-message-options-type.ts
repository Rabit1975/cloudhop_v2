import { MessageType } from '@cloudrabbit/hophub.entities.message';
import { MediaAttachmentInputType } from './media-attachment-input-type.js';

export type SendMessageOptionsType = {
  /**
   * The ID of the conversation to send the message to.
   */
  conversationId: string;

  /**
   * The text content of the message.
   */
  text: string;

  /**
   * The type of the message.
   */
  type?: MessageType;

  /**
   * Optional media attachments for the message.
   */
  mediaAttachments?: MediaAttachmentInputType[];
};