import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Notification, NotificationType } from '@cloudrabbit/hophub.entities.notification';
import { useMarkNotificationAsRead } from '@cloudrabbit/hophub.hooks.use-notifications';
import { MessageIcon, ChannelIcon, SystemIcon, MentionIcon } from './notification-icons.js';
import styles from './notification-item.module.scss';

export type NotificationItemProps = {
  notification: Notification;
  className?: string;
  style?: React.CSSProperties;
};

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'new_message':
      return <MessageIcon />;
    case 'channel_invite':
      return <ChannelIcon />;
    case 'system_alert':
      return <SystemIcon />;
    case 'mention':
      return <MentionIcon />;
    default:
      return <SystemIcon />;
  }
};

const getIconClass = (type: NotificationType) => {
  switch (type) {
    case 'new_message':
      return styles.message;
    case 'system_alert':
      return styles.alert;
    case 'mention':
      return styles.mention;
    default:
      return '';
  }
};

export function NotificationItem({ notification, className, style }: NotificationItemProps) {
  const { markAsRead, loading } = useMarkNotificationAsRead();
  const { id, type, message, timestamp, read, link } = notification;

  const handleMarkAsRead = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      markAsRead({ notificationId: id });
    },
    [id, markAsRead]
  );

  const formattedTime = new Date(timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const content = (
    <>
      <div className={classNames(styles.iconContainer, getIconClass(type))}>
        {getIcon(type)}
      </div>
      <div className={styles.content}>
        <p className={classNames(styles.message, { [styles.unreadText]: !read })}>
          {message}
        </p>
        <span className={styles.timestamp}>{formattedTime}</span>
      </div>
      {!read && (
        <div className={styles.actions}>
          <button
            className={styles.markReadBtn}
            onClick={handleMarkAsRead}
            disabled={loading}
            aria-label="Mark as read"
            type="button"
          >
            {loading ? '...' : 'Mark Read'}
          </button>
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        className={classNames(styles.notificationItem, { [styles.unread]: !read }, className)}
        style={style}
        noStyles
        onClick={!read ? () => markAsRead({ notificationId: id }) : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={classNames(styles.notificationItem, { [styles.unread]: !read }, className)} style={style}>
      {content}
    </div>
  );
}