import React, { type CSSProperties } from 'react';
import classNames from 'classnames';
import { PanelCard } from '@cloudrabbit/cloudhop-platform.ui.panel-card';
import { ConversationListItem } from '@cloudrabbit/hophub.ui.conversation-list-item';
import { useConversations } from '@cloudrabbit/hophub.hooks.use-conversations';
import type { Conversation } from '@cloudrabbit/hophub.entities.conversation';
import { Link } from '@cloudrabbit/design.navigation.link';
import styles from './recent-conversations-panel.module.scss';

export type RecentConversationsPanelProps = {
  /**
   * Limit the number of conversations to display.
   * @default 5
   */
  limit?: number;

  /**
   * The current user's ID, used for determining DM names.
   */
  currentUserId?: string;

  /**
   * Override the conversations list (e.g. for testing or controlled mode).
   */
  conversations?: Conversation[];

  /**
   * Class name for the panel container.
   */
  className?: string;

  /**
   * Inline styles for the panel.
   */
  style?: CSSProperties;
};

export function RecentConversationsPanel({
  limit = 5,
  currentUserId,
  conversations: explicitConversations,
  className,
  style,
}: RecentConversationsPanelProps) {
  const { conversations: fetchedConversations, loading, error } = useConversations({ limit });
  
  const conversations = explicitConversations || fetchedConversations || [];
  const isLoading = !explicitConversations && loading;
  const hasError = !explicitConversations && !!error;
  const isEmpty = !isLoading && !hasError && conversations.length === 0;

  return (
    <PanelCard
      title="Recent Conversations"
      className={classNames(styles.recentConversationsPanel, className)}
      style={style}
      loading={isLoading}
      footer={
        <div className={styles.footer}>
          <Link href="/hophub">View All</Link>
        </div>
      }
    >
      {hasError && (
        <div className={styles.emptyState}>
          <p>Unable to load conversations.</p>
        </div>
      )}

      {isEmpty && (
        <div className={styles.emptyState}>
          <p>No recent conversations.</p>
        </div>
      )}

      {!isLoading && !hasError && !isEmpty && (
        <div className={styles.list}>
          {conversations.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
              currentUserId={currentUserId}
              className={styles.item}
            />
          ))}
        </div>
      )}
    </PanelCard>
  );
}