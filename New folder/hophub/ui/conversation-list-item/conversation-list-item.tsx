import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Avatar } from '@cloudrabbit/design.content.avatar';
import { Badge } from '@cloudrabbit/design.content.badge';
import type { Conversation } from '@cloudrabbit/hophub.entities.conversation';
import styles from './conversation-list-item.module.scss';

export type ConversationListItemProps = {
  /**
   * The conversation entity to display.
   */
  conversation: Conversation;

  /**
   * The ID of the currently active conversation, used for styling.
   */
  activeConversationId?: string;

  /**
   * The current user's ID, used for determining DM names if not provided.
   */
  currentUserId?: string;

  /**
   * Whether to show the compact version (e.g., for collapsed sidebars).
   */
  isCompact?: boolean;

  /**
   * Optional click handler. 
   * If not provided, the component acts as a Link to `/hophub?conversationId={id}`.
   */
  onClick?: (conversation: Conversation) => void;

  /**
   * Custom class name.
   */
  className?: string;

  /**
   * Inline styles.
   */
  style?: React.CSSProperties;
};

function formatTimestamp(isoString?: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 1) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } 
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  
}

export function ConversationListItem({
  conversation,
  activeConversationId,
  currentUserId,
  isCompact = false,
  onClick,
  className,
  style,
}: ConversationListItemProps) {
  const { id, name, type, lastMessage, unreadCount = 0, imageUrl, members } = conversation;
  
  const isActive = activeConversationId === id;
  const isUnread = unreadCount > 0;

  // Determine display name
  const displayName = useMemo(() => {
    if (name) return name;
    if (type === 'DM') {
      // In a real scenario, we'd map member IDs to user profiles.
      // Here we assume if name is missing in DM, we might default or handle it upstream.
      return 'Direct Message';
    }
    return 'Untitled Conversation';
  }, [name, type, members, currentUserId]);

  // Determine avatar letters
  const avatarLetters = useMemo(() => {
    if (displayName) {
      return displayName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    return 'CH';
  }, [displayName]);

  // Determine last message text
  const messagePreview = useMemo(() => {
    if (!lastMessage) return 'No messages yet';
    if (lastMessage.type === 'MEDIA') return 'Sent an attachment';
    if (lastMessage.type === 'SYSTEM') return lastMessage.text; // System messages usually text
    return lastMessage.text;
  }, [lastMessage]);

  const timestamp = formatTimestamp(lastMessage?.createdAt);

  const content = (
    <>
      <div className={styles.avatarContainer}>
        <Avatar
          src={imageUrl}
          letters={avatarLetters}
          alt={displayName}
          size="lg"
          status={isUnread ? 'online' : undefined} // Just using status dot for visual flare if unread or valid status
        />
      </div>
      {!isCompact && (
        <div className={classNames(styles.content, { [styles.unread]: isUnread })}>
          <div className={styles.header}>
            <span className={styles.name}>{displayName}</span>
            {timestamp && <span className={styles.timestamp}>{timestamp}</span>}
          </div>
          <div className={styles.footer}>
            <p className={styles.messageSnippet}>
              {lastMessage?.type === 'MEDIA' && (
                <span className={styles.mediaIcon} role="img" aria-label="attachment">📎</span>
              )}
              {conversation.type === 'GROUP' && lastMessage?.senderId && lastMessage.senderId !== currentUserId ? (
                 <span>{lastMessage.senderId}: {messagePreview}</span> // In real app, map ID to name
              ) : (
                 messagePreview
              )}
            </p>
            {isUnread && (
              <div className={styles.unreadBadge}>
                <Badge 
                  label={unreadCount > 99 ? '99+' : unreadCount.toString()} 
                  color="primary" 
                  size="sm" 
                  variant="solid" 
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

  const containerClass = classNames(
    styles.conversationListItem,
    {
      [styles.active]: isActive,
    },
    className
  );

  if (onClick) {
    return (
      <div
        className={containerClass}
        onClick={() => onClick(conversation)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(conversation);
          }
        }}
        style={style}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/hophub?conversationId=${id}`}
      className={containerClass}
      noStyles
      style={style}
    >
      {content}
    </Link>
  );
}