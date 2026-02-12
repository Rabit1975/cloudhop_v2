import { PlainMessage } from '@cloudrabbit/hophub.entities.message';

export type ConversationType = 'DM' | 'GROUP' | 'CHANNEL';

export type ConversationMember = {
  /**
   * User ID of the member.
   */
  userId: string;
  /**
   * Role of the member in the conversation.
   */
  role: 'admin' | 'member';
  /**
   * ISO string of the date the member joined.
   */
  joinedAt: string;
  /**
   * ID of the last message read by the member.
   */
  lastReadMessageId?: string;
};

export type PlainConversation = {
  /**
   * Unique identifier of the conversation.
   */
  id: string;
  /**
   * Type of the conversation (DM, GROUP, CHANNEL).
   */
  type: ConversationType;
  /**
   * Name of the conversation.
   */
  name?: string;
  /**
   * Description of the conversation.
   */
  description?: string;
  /**
   * Image URL of the conversation.
   */
  imageUrl?: string;
  /**
   * List of members in the conversation.
   */
  members: ConversationMember[];
  /**
   * ISO string of the creation date.
   */
  createdAt: string;
  /**
   * ISO string of the last update date.
   */
  updatedAt?: string;
  /**
   * The last message sent in the conversation.
   */
  lastMessage?: PlainMessage;
  /**
   * Number of unread messages.
   */
  unreadCount?: number;
};