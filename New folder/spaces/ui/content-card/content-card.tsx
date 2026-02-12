import React from 'react';
import classNames from 'classnames';
import { Card } from '@cloudrabbit/design.content.card';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { Content } from '@cloudrabbit/spaces.entities.content';
import styles from './content-card.module.scss';

export type ContentCardProps = {
  /**
   * The content entity to display.
   */
  content: Content;

  /**
   * The URL to navigate to when the card is clicked.
   */
  href?: string;

  /**
   * Optional custom image URL to override the default or asset-based image.
   */
  thumbnailUrl?: string;

  /**
   * Class name for the card container.
   */
  className?: string;

  /**
   * Inline styles for the card.
   */
  style?: React.CSSProperties;
};

export function ContentCard({
  content,
  href,
  thumbnailUrl,
  className,
  style,
}: ContentCardProps) {
  const { title, body, type } = content.toObject();

  // Use the provided tailored image as a default placeholder for visual types
  const defaultImage = "https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_content_card__0_1770833866309.png";
  
  // Determine if we should show an image
  const showImage = thumbnailUrl || ['image', 'video', 'design', 'game'].includes(type);
  const displayImage = showImage ? (thumbnailUrl || defaultImage) : undefined;

  const cardContent = (
    <Card
      className={classNames(styles.contentCard, className)}
      style={style}
      interactive
      variant="elevated"
      image={displayImage}
      imageAlt={displayImage ? title : undefined}
    >
      <div className={styles.metaWrapper}>
        <span className={styles.typeTag}>{type}</span>
      </div>
      
      <Heading element="h3" visualLevel="h5" className={styles.title}>
        {title}
      </Heading>

      {body && (
        <Paragraph size="small" className={styles.excerpt}>
          {body}
        </Paragraph>
      )}
      
      <div className={styles.footer}>
        <span className={styles.actionText}>View Details &rarr;</span>
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} noStyles className={styles.linkWrapper}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}