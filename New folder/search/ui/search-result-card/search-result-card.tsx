import React from 'react';
import classNames from 'classnames';
import { Card } from '@cloudrabbit/design.content.card';
import { Badge } from '@cloudrabbit/design.content.badge';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { SearchResult } from './search-result-type.js';
import styles from './search-result-card.module.scss';

export type SearchResultCardProps = {
  /**
   * The search result data to display.
   */
  result?: SearchResult;

  /**
   * Custom class name for the card container.
   */
  className?: string;

  /**
   * Inline styles for the component.
   */
  style?: React.CSSProperties;

  /**
   * Callback function when the card is clicked.
   */
  onClick?: () => void;
};

const defaultResult: SearchResult = {
  id: 'mock-result-1',
  title: 'CloudHop Spaces',
  description: 'Creative tools with AI integration for community engagement and content creation.',
  type: 'Space',
  imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_network_backg_0_1770833860674.png',
  link: '/spaces',
};

export function SearchResultCard({
  result = defaultResult,
  className,
  style,
  onClick,
}: SearchResultCardProps) {
  const { title, description, imageUrl, link, type } = result;

  return (
    <Link
      href={link}
      noStyles
      className={classNames(styles.searchResultCard, className)}
      style={style}
      onClick={onClick}
    >
      <Card
        interactive
        variant="default"
        image={imageUrl}
        title={title}
        header={
          <div className={styles.header}>
            <Badge label={type} variant="subtle" size="sm" color="neutral" />
          </div>
        }
        className={styles.card}
      >
        {description && (
          <Paragraph size="small" className={styles.description}>
            {description}
          </Paragraph>
        )}
      </Card>
    </Link>
  );
}