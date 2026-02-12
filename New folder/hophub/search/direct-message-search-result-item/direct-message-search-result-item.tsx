import React, { useMemo } from 'react';
import classNames from 'classnames';
import { SearchResultCard, type SearchResult } from '@cloudrabbit/search.ui.search-result-card';
import styles from './direct-message-search-result-item.module.scss';

export type DirectMessageSearchResultItemProps = {
  /**
   * The search result data to display.
   */
  result: SearchResult;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the component.
   */
  style?: React.CSSProperties;

  /**
   * Callback function when the item is clicked.
   */
  onClick?: () => void;
};

const DEFAULT_DM_IMAGE = 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_user_avatar_icon_for__0_1770835141208.png';

export function DirectMessageSearchResultItem({
  result,
  className,
  style,
  onClick,
}: DirectMessageSearchResultItemProps) {
  const formattedResult = useMemo(() => {
    return {
      ...result,
      imageUrl: result.imageUrl || DEFAULT_DM_IMAGE,
      type: 'Direct Message',
    };
  }, [result]);

  return (
    <div className={classNames(styles.directMessageSearchResultItem, className)} style={style}>
      <SearchResultCard
        result={formattedResult}
        className={styles.card}
        onClick={onClick}
      />
    </div>
  );
}