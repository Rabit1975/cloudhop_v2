import React from 'react';
import classNames from 'classnames';
import { Card } from '@cloudrabbit/design.content.card';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Badge } from '@cloudrabbit/design.content.badge';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { GameSearchResult } from './game-search-result-type.js';
import styles from './game-search-result-renderer.module.scss';

export type GameSearchResultRendererProps = {
  /**
   * The search result data to render.
   */
  result: GameSearchResult;

  /**
   * Additional class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: React.CSSProperties;
};

export function GameSearchResultRenderer({
  result,
  className,
  style,
}: GameSearchResultRendererProps) {
  const { content } = result;
  const { title, description, thumbnail, platform, url } = content;

  return (
    <Link
      href={url}
      noStyles
      className={classNames(styles.renderer, className)}
      style={style}
    >
      <Card
        title={title}
        image={thumbnail}
        imageAlt={title}
        interactive
        className={styles.card}
        footer={
          platform ? (
            <div className={styles.footer}>
              <Badge
                label={platform}
                color="neutral"
                variant="outline"
                size="sm"
              />
            </div>
          ) : undefined
        }
      >
        <Paragraph className={styles.description}>
          {description}
        </Paragraph>
      </Card>
    </Link>
  );
}