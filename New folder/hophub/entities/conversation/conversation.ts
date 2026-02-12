import { Message } from '@cloudrabbit/hophub.entities.message';
import { PlainConversation, ConversationType, ConversationMember } from './conversation-type.js';

export class Conversation {
  constructor(
    /**
     * Unique identifier of the conversation.
     */
    readonly id: string,
    /**
     * Type of the conversation.
     */
    readonly type: ConversationType,
    /**
     * List of members.
     */
    readonly members: ConversationMember[],
    /**
     * Creation date ISO string.
     */
    readonly createdAt: string,
    /**
     * Name of the conversation.
     */
    readonly name?: string,
    /**
     * Description of the conversation.
     */
    readonly description?: string,
    /**
     * Image URL of the conversation.
     */
    readonly imageUrl?: string,
    /**
     * Last update date ISO string.
     */
    readonly updatedAt?: string,
    /**
     * The last message in the conversation.
     */
    readonly lastMessage?: Message,
    /**
     * Count of unread messages.
     */
    readonly unreadCount: number = 0
  ) {}

  /**
   * Serialize the Conversation entity into a plain object.
   */
  toObject(): PlainConversation {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      members: this.members,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastMessage: this.lastMessage?.toObject(),
      unreadCount: this.unreadCount,
    };
  }

  /**
   * Create a Conversation entity from a plain object.
   */
  static from(plain: PlainConversation): Conversation {
    const lastMessage = plain.lastMessage ? Message.from(plain.lastMessage) : undefined;
    return new Conversation(
      plain.id,
      plain.type,
      plain.members,
      plain.createdAt,
      plain.name,
      plain.description,
      plain.imageUrl,
      plain.updatedAt,
      lastMessage,
      plain.unreadCount
    );
  }
}