import React from 'react';
import classNames from 'classnames';
import { PanelCard } from '@cloudrabbit/cloudhop-platform.ui.panel-card';
import { GameCard } from '@cloudrabbit/gamehub.ui.game-card';
import { useListGames } from '@cloudrabbit/gamehub.hooks.use-games';
import { Link } from '@cloudrabbit/design.navigation.link';
import type { Game } from '@cloudrabbit/gamehub.entities.game';
import styles from './game-hub-dashboard-panel.module.scss';

const GameControllerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 12h4m-2-2v4" />
    <line x1="15" y1="11" x2="15.01" y2="11" />
    <line x1="18" y1="13" x2="18.01" y2="13" />
  </svg>
);

export type GameHubDashboardPanelProps = {
  /**
   * Additional class name for the panel.
   */
  className?: string;

  /**
   * Inline styles for the panel.
   */
  style?: React.CSSProperties;

  /**
   * Maximum number of games to display.
   * @default 3
   */
  limit?: number;

  /**
   * Mock data for preview or testing purposes.
   * Passing this will bypass the data fetching hook.
   */
  mockGames?: Game[];
};

export function GameHubDashboardPanel({ 
  className, 
  style, 
  limit = 3,
  mockGames
}: GameHubDashboardPanelProps) {
  const { games, loading } = useListGames({ limit }, { mockData: mockGames });

  const hasGames = games && games.length > 0;

  return (
    <PanelCard
      title="Featured Games"
      icon={
        <div className={styles.icon}>
          <GameControllerIcon />
        </div>
      }
      className={classNames(styles.panel, className)}
      style={style}
      variant="default"
      loading={loading && !mockGames}
      actions={
        <Link href="/gamehub" className={styles.viewAllLink}>
          View All
        </Link>
      }
    >
      {!loading && hasGames ? (
        <div className={styles.grid}>
          {games.map((game) => (
            <div key={game.id} className={styles.cardWrapper}>
              <GameCard 
                game={game} 
                interactive={true}
                rating={4.5} 
              />
            </div>
          ))}
        </div>
      ) : !loading && (
        <div className={styles.emptyState}>
          No games currently available in the hub.
        </div>
      )}
    </PanelCard>
  );
}