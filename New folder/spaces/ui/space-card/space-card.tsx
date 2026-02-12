import React from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Card } from '@cloudrabbit/design.content.card';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { Space } from '@cloudrabbit/spaces.entities.space';
import styles from './space-card.module.scss';

export type SpaceCardProps = {
  /**
   * The space entity to display.
   */
  space: Space;

  /**
   * Optional override for the space cover image.
   * Defaults to a placeholder if not provided.
   */
  imageUrl?: string;

  /**
   * Custom class name for the card wrapper.
   */
  className?: string;

  /**
   * Optional custom link href.
   * Defaults to `/spaces/${space.id}`.
   */
  href?: string;

  /**
   * Style overrides for the component.
   */
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export function SpaceCard({
  space,
  imageUrl,
  className,
  href,
  style,
  ...rest
}: SpaceCardProps) {
  const linkHref = href || `/spaces/${space.id}`;
  const defaultImage = 'https://storage.googleapis.com/bit-generated-images/images/image_visually_engaging_abstract_dig_0_1770834012729.png';
  
  const memberCount = space.members ? space.members.length : 0;

  return (
    <Link 
      href={linkHref} 
      noStyles 
      className={classNames(styles.spaceCardWrapper, className)} 
      style={style}
    >
      <Card
        interactive
        image={imageUrl || defaultImage}
        imageAlt={`Cover image for ${space.name}`}
        className={styles.spaceCard}
        {...rest}
      >
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <Heading element="h3" visualLevel="h5" className={styles.title}>
              {space.name}
            </Heading>
            <span className={classNames(styles.badge, styles[space.visibility])}>
              {space.visibility}
            </span>
          </div>
          
          {space.description && (
            <Paragraph size="small" className={styles.description}>
              {space.description}
            </Paragraph>
          )}
          
          <div className={styles.meta}>
            <span className={styles.memberCount}>
              {memberCount} member{memberCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}