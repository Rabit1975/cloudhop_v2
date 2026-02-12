import React from 'react';
import classNames from 'classnames';
import { useNotifications } from '@cloudrabbit/hophub.hooks.use-notifications';
import { Notification } from '@cloudrabbit/hophub.entities.notification';
import { NotificationItem } from './notification-item.js';
import styles from './notification-panel.module.scss';

export type NotificationPanelProps = {
  /**
   * Additional class name for the panel.
   */
  className?: string;

  /**
   * Inline styles for the panel.
   */
  style?: React.CSSProperties;

  /**
   * Mock data for testing or preview purposes.
   */
  mockData?: Notification[];

  /**
   * Optional title override for the panel header.
   * @default 'Notifications'
   */
  title?: string;
};

export function NotificationPanel({
  className,
  style,
  mockData,
  title = 'Notifications',
}: NotificationPanelProps) {
  const { notifications, loading, error, refetch } = useNotifications({ mockData });

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.loading}>
          Loading notifications...
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.error}>
          <span>Failed to load notifications.</span>
          <button type="button" onClick={() => refetch()} className={styles.retryButton}>
            Retry
          </button>
        </div>
      );
    }

    if (!notifications || notifications.length === 0) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor" opacity="0.5"/>
            </svg>
          </div>
          <p>No new notifications</p>
        </div>
      );
    }

    return (
      <div className={styles.list}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    );
  };

  return (
    <div className={classNames(styles.notificationPanel, className)} style={style}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      {renderContent()}
    </div>
  );
}