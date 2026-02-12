import React from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Badge, type BadgeColor } from '@cloudrabbit/design.content.badge';
import type { Game } from '@cloudrabbit/gamehub.entities.game';
import type { GameActivity } from '@cloudrabbit/gamehub.entities.game-activity';
import styles from './game-activity-feed.module.scss';

export type GameActivityFeedProps = {
  /**
   * List of game activities to display.
   */
  activities?: GameActivity[];

  /**
   * List of games to resolve game details (e.g., name).
   */
  games?: Game[];

  /**
   * Custom class name for the feed container.
   */
  className?: string;

  /**
   * Custom content to display when there are no activities.
   */
  emptyState?: React.ReactNode;
};

const activityBadgeConfig: Record<string, { color: BadgeColor; label: string }> = {
  played: { color: 'primary', label: 'Played' },
  streamed: { color: 'info', label: 'Streamed' },
  achieved: { color: 'warning', label: 'Achievement' },
};

export function GameActivityFeed({
  activities = [],
  games = [],
  className,
  emptyState,
}: GameActivityFeedProps) {
  if (!activities.length) {
    return (
      <div className={classNames(styles.feed, className)}>
        {emptyState || (
          <Paragraph className={styles.empty}>No recent activity found.</Paragraph>
        )}
      </div>
    );
  }

  return (
    <div className={classNames(styles.feed, className)}>
      {activities.map((activity) => {
        const game = games.find((g) => g.id === activity.gameId);
        const config = activityBadgeConfig[activity.type] || { color: 'neutral', label: activity.type };
        const date = new Date(activity.timestamp).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div
            key={activity.id || `${activity.userId}-${activity.timestamp}`}
            className={styles.item}
          >
            <div className={styles.header}>
              {game ? (
                <Link href={`/gamehub/${game.id}`} className={styles.gameLink} noStyles>
                  <span className={styles.gameTitle}>{game.name}</span>
                </Link>
              ) : (
                <span className={styles.unknownGame}>Unknown Game</span>
              )}
              <Badge color={config.color} label={config.label} size="sm" variant="subtle" />
            </div>

            <div className={styles.details}>
              {activity.type === 'played' && activity.details?.score !== undefined && (
                <Paragraph size="small" className={styles.meta}>
                  Score: {activity.details.score.toLocaleString()}
                </Paragraph>
              )}
              {activity.type === 'achieved' && (
                <Paragraph size="small" className={styles.meta}>
                  Unlocked a new achievement
                </Paragraph>
              )}
              {activity.type === 'streamed' && (
                <Paragraph size="small" className={styles.meta}>
                  Broadcasted live
                </Paragraph>
              )}
              <Paragraph size="small" className={styles.timestamp}>
                {date}
              </Paragraph>
            </div>
          </div>
        );
      })}
    </div>
  );
}