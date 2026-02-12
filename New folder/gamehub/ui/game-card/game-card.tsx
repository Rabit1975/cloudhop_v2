import React, { type ReactNode } from 'react';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Card } from '@cloudrabbit/design.content.card';
import { Badge } from '@cloudrabbit/design.content.badge';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import classNames from 'classnames';
import styles from './game-card.module.scss';

export type GameCardProps = {
  /**
   * The game entity to display.
   */
  game: Game;

  /**
   * Optional rating to display (0-5).
   */
  rating?: number;

  /**
   * Whether the card should be interactive (hover effects).
   * @default true
   */
  interactive?: boolean;

  /**
   * Content to render in the header section of the card.
   */
  header?: ReactNode;

  /**
   * Content to render in the footer section of the card.
   */
  footer?: ReactNode;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Custom styles.
   */
  style?: React.CSSProperties;
};

export function GameCard({
  game,
  rating,
  interactive = true,
  header,
  footer,
  className,
  style,
}: GameCardProps) {
  const gameUrl = `/gamehub/${game.id}`;
  const coverImage = game.imageUrls && game.imageUrls.length > 0 
    ? game.imageUrls[0] 
    : undefined;

  const StarIcon = () => (
    <svg className={styles.starIcon} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const getPlatformLabel = (type: string) => {
    switch (type) {
      case 'html5': return 'HTML5';
      case 'unity': return 'Unity';
      case 'external_stream': return 'Stream';
      default: return type;
    }
  };

  return (
    <Link 
      href={gameUrl} 
      noStyles 
      className={classNames(styles.gameCard, className)}
      style={style}
    >
      <Card
        title={game.name}
        image={coverImage}
        imageAlt={`Cover image for ${game.name}`}
        interactive={interactive}
        variant="default"
        header={header}
        footer={footer}
      >
        <div className={styles.content}>
          <div className={styles.meta}>
            <Badge 
              label={getPlatformLabel(game.gameType)} 
              variant="outline" 
              size="sm" 
              color="primary"
              className={styles.platformBadge}
            />
            {game.tags && game.tags.slice(0, 2).map(tag => (
              <Badge 
                key={tag} 
                label={tag} 
                variant="subtle" 
                size="sm" 
                color="neutral" 
              />
            ))}
          </div>
          
          {rating !== undefined && (
            <div className={styles.rating}>
              <StarIcon />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}