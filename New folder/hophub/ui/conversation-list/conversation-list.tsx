import React from 'react';
import classNames from 'classnames';
import { useConversations } from '@cloudrabbit/hophub.hooks.use-conversations';
import { ConversationListItem } from '@cloudrabbit/hophub.ui.conversation-list-item';
import type { Conversation, ConversationType } from '@cloudrabbit/hophub.entities.conversation';
import styles from './conversation-list.module.scss';

export type ConversationListProps = {
  /**
   * Optional override for conversations (useful for testing or previews).
   * If provided, the hook's data is ignored.
   */
  conversations?: Conversation[];

  /**
   * Filter conversations by type.
   */
  type?: ConversationType;

  /**
   * Limit the number of conversations fetched.
   */
  limit?: number;

  /**
   * The current user's ID. 
   * Passed to items to determine sender logic.
   */
  currentUserId?: string;

  /**
   * The active conversation ID for highlighting.
   */
  activeConversationId?: string;

  /**
   * Callback when a conversation is clicked.
   */
  onConversationClick?: (conversation: Conversation) => void;

  /**
   * Whether to display in compact mode (e.g. for collapsed sidebars).
   */
  isCompact?: boolean;

  /**
   * Custom class name.
   */
  className?: string;

  /**
   * Custom styles.
   */
  style?: React.CSSProperties;
};

export function ConversationList({
  conversations: conversationsProp,
  type,
  limit,
  currentUserId,
  activeConversationId,
  onConversationClick,
  isCompact = false,
  className,
  style,
}: ConversationListProps) {
  const { conversations: fetchedConversations, loading, error } = useConversations({
    type,
    limit,
  });

  const displayConversations = conversationsProp || fetchedConversations || [];
  const isLoading = !conversationsProp && loading;
  const isError = !conversationsProp && error;

  if (isLoading) {
    return (
      <div className={classNames(styles.status, styles.loading)}>
        Loading conversations...
      </div>
    );
  }

  if (isError) {
    return (
      <div className={classNames(styles.status, styles.error)}>
        Unable to load conversations
      </div>
    );
  }

  if (displayConversations.length === 0) {
    return (
      <div className={classNames(styles.status, styles.empty)}>
        No conversations found
      </div>
    );
  }

  return (
    <div
      className={classNames(
        styles.conversationList,
        { [styles.compact]: isCompact },
        className
      )}
      style={style}
    >
      {displayConversations.map((conversation) => (
        <ConversationListItem
          key={conversation.id}
          conversation={conversation}
          activeConversationId={activeConversationId}
          currentUserId={currentUserId}
          isCompact={isCompact}
          onClick={onConversationClick}
          className={styles.item}
        />
      ))}
    </div>
  );
}