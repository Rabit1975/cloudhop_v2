import React from 'react';
import classNames from 'classnames';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { GameCard } from '@cloudrabbit/gamehub.ui.game-card';
import styles from './game-collection.module.scss';

export type GameCollectionProps = {
  /**
   * List of games to display in the collection.
   */
  games?: Game[];

  /**
   * Title for the collection section.
   */
  title?: string;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Custom styles.
   */
  style?: React.CSSProperties;
};

export function GameCollection({ games = [], title, className, style }: GameCollectionProps) {
  if (!games || games.length === 0) {
    return null;
  }

  return (
    <div className={classNames(styles.gameCollection, className)} style={style}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.grid}>
        {games.map((game) => (
          <GameCard 
            key={game.id} 
            game={game} 
            className={styles.card}
          />
        ))}
      </div>
    </div>
  );
}