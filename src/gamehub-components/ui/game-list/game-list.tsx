import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { GameCard } from '@cloudrabbit/gamehub.ui.game-card';
import styles from './game-list.module.scss';

export type GameListProps = {
  /**
   * List of games to display.
   */
  games?: Game[];

  /**
   * Whether the list is currently loading.
   * If true and no games are provided, a skeleton state will be shown.
   */
  loading?: boolean;

  /**
   * Message to display when no games are found.
   */
  emptyMessage?: ReactNode;

  /**
   * Custom title for the empty state.
   */
  emptyTitle?: string;

  /**
   * Number of skeleton items to show when loading.
   * @default 6
   */
  loadingItemCount?: number;

  /**
   * Class name for the container.
   */
  className?: string;

  /**
   * Custom styles for the container.
   */
  style?: React.CSSProperties;
};

export function GameList({
  games = [],
  loading = false,
  emptyMessage = "We couldn't find any games matching your criteria. Try adjusting your filters.",
  emptyTitle = "No games found",
  loadingItemCount = 6,
  className,
  style,
}: GameListProps) {
  const showLoading = loading && games.length === 0;
  const showEmpty = !loading && games.length === 0;

  if (showLoading) {
    return (
      <div 
        className={classNames(styles.loadingState, className)} 
        style={style}
        role="status"
        aria-label="Loading games"
      >
        {Array.from({ length: loadingItemCount }).map((_, index) => (
          <div key={index} className={styles.skeletonCard} data-testid="skeleton-card" />
        ))}
      </div>
    );
  }

  if (showEmpty) {
    return (
      <div className={classNames(styles.gameList, className)} style={style}>
        <div className={styles.emptyState}>
          <div className={styles.emptyTitle}>{emptyTitle}</div>
          <div className={styles.emptyDescription}>{emptyMessage}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.gameList, className)} style={style}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}