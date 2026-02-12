import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useListSessions } from '@cloudrabbit/ai.hooks.use-session';
import { Session } from '@cloudrabbit/ai.entities.session';
import { Button } from '@cloudrabbit/design.actions.button';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Heading } from '@cloudrabbit/design.typography.heading';
import styles from './session-navigation.module.scss';

export type SessionNavigationProps = {
  /**
   * Additional class name for the container.
   */
  className?: string;
  
  /**
   * Optional user ID to filter sessions.
   */
  userId?: string;

  /**
   * Custom mock data for sessions (useful for previews/testing without provider).
   */
  mockData?: Session[];

  /**
   * Callback when "New Session" is clicked.
   */
  onNewSession?: () => void;
};

export function SessionNavigation({ 
  className, 
  userId, 
  mockData,
  onNewSession 
}: SessionNavigationProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentSessionId = searchParams.get('sessionId');

  const { sessions, loading, error } = useListSessions(
    { userId, limit: 20 },
    { mockData }
  );

  const sortedSessions = useMemo(() => {
    return [...(sessions || [])].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [sessions]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      
      if (isToday) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch (e) {
      return '';
    }
  };

  return (
    <nav className={classNames(styles.sessionNavigation, className)}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Heading element="h2" visualLevel="h6">Chat History</Heading>
        </div>
        <Button 
          appearance="primary" 
          className={styles.newChatButton} 
          onClick={onNewSession}
          href={onNewSession ? undefined : "/ai"}
        >
          + New Session
        </Button>
      </div>

      <div className={styles.sessionList}>
        {loading && <div className={styles.loading}>Loading history...</div>}
        
        {error && <div className={styles.error}>Unable to load sessions</div>}

        {!loading && !error && sortedSessions.length === 0 && (
          <div className={styles.emptyState}>No recent sessions</div>
        )}

        {!loading && sortedSessions.map((session) => (
          <Link
            key={session.id}
            href={`/ai?sessionId=${session.id}`}
            className={classNames(styles.sessionItem, {
              [styles.active]: currentSessionId === session.id
            })}
            noStyles
          >
            <span className={styles.sessionName}>
              {session.name || 'Untitled Session'}
            </span>
            <span className={styles.sessionTime}>
              {formatDate(session.createdAt)}
            </span>
          </Link>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/ai/settings" className={styles.settingsLink} noStyles>
          <span>⚙</span>
          <span>AI Settings</span>
        </Link>
      </div>
    </nav>
  );
}