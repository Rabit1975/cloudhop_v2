export type MarkMessagesAsReadOptionsType = {
  /**
   * The ID of the conversation.
   */
  conversationId: string;

  /**
   * The ID of the last message read by the user.
   */
  lastReadMessageId: string;
};