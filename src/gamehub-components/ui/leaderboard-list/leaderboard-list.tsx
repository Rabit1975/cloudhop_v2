import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Table, type TableColumn } from '@cloudrabbit/design.content.table';
import { Leaderboard } from '@cloudrabbit/gamehub.entities.leaderboard';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import styles from './leaderboard-list.module.scss';

export type LeaderboardListProps = {
  /**
   * The leaderboard entity containing scores.
   */
  leaderboard: Leaderboard;

  /**
   * List of users to resolve usernames from userIds.
   */
  users?: User[];

  /**
   * The ID of the current user to highlight their score.
   */
  currentUserId?: string;

  /**
   * Class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: React.CSSProperties;

  /**
   * Whether the leaderboard is loading.
   */
  loading?: boolean;
};

export function LeaderboardList({
  leaderboard,
  users = [],
  currentUserId,
  className,
  style,
  loading = false,
}: LeaderboardListProps) {
  const userMap = useMemo(() => {
    return new Map(users.map((user) => [user.userId, user]));
  }, [users]);

  const data = useMemo(() => {
    if (!leaderboard.scores) return []; // Changed from leaderboard?.scores to leaderboard.scores

    // Sort scores descending
    const sortedScores = [...leaderboard.scores].sort((a, b) => b.score - a.score);

    return sortedScores.map((score, index) => {
      const user = userMap.get(score.userId);
      return {
        key: score.userId,
        rank: index + 1,
        username: user?.username || 'Anonymous',
        displayName: user?.displayName || 'Anonymous',
        userId: score.userId,
        score: score.score,
        timestamp: score.timestamp,
        isCurrentUser: currentUserId === score.userId,
      };
    });
  }, [leaderboard, userMap, currentUserId]);

  const columns: TableColumn[] = [
    {
      key: 'rank',
      title: 'Rank',
      width: 80,
      align: 'center',
      render: (record) => (
        <span className={classNames(styles.rank, { [styles.highlight]: record.isCurrentUser })}>
          #{record.rank}
        </span>
      ),
    },
    {
      key: 'username',
      title: 'Player',
      render: (record) => (
        <div className={styles.playerCell}>
          <span
            className={classNames(styles.username, {
              [styles.highlightText]: record.isCurrentUser,
            })}
          >
            {record.displayName}
          </span>
          {record.isCurrentUser && <span className={styles.youBadge}>YOU</span>}
        </div>
      ),
    },
    {
      key: 'score',
      title: 'Score',
      align: 'right',
      render: (record) => (
        <span
          className={classNames(styles.score, { [styles.highlightText]: record.isCurrentUser })}
        >
          {record.score.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'timestamp',
      title: 'Date',
      align: 'right',
      render: (record) => (
        <span className={styles.date}>
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(record.timestamp))}
        </span>
      ),
    },
  ];

  return (
    <div className={classNames(styles.leaderboardList, className)} style={style}>
      <Table
        columns={columns}
        data={data}
        loading={loading}
        className={styles.table}
        keyField="key"
        emptyState={
          <div className={styles.emptyState}>
            <p>No scores recorded yet. Be the first to play!</p>
          </div>
        }
      />
    </div>
  );
}