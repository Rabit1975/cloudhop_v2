import { Message } from '@cloudrabbit/hophub.entities.message';

export type ListMessagesOptionsType = {
  /**
   * The ID of the conversation to fetch messages for.
   */
  conversationId: string;

  /**
   * The number of messages to skip.
   */
  offset?: number;

  /**
   * The maximum number of messages to return.
   */
  limit?: number;

  /**
   * Fetch messages created before this message ID (pagination).
   */
  beforeMessageId?: string;

  /**
   * Optional mock data to return instead of executing the query.
   */
  mockData?: Message[];
};