import React from 'react';
import classNames from 'classnames';
import { SearchResultCard } from '@cloudrabbit/search.ui.search-result-card';
import { Spinner } from '@cloudrabbit/design.loaders.spinner';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { SearchResult } from './search-result-type.js';
import styles from './search-result-list.module.scss';

export type SearchResultListProps = {
  /**
   * Array of search results to display.
   */
  results?: SearchResult[];

  /**
   * Indicates if the search results are currently loading.
   */
  loading?: boolean;

  /**
   * Message to display when there are no results found.
   */
  emptyMessage?: string;

  /**
   * Callback function when a result card is clicked.
   */
  onResultClick?: (result: SearchResult) => void;

  /**
   * Custom class name for the list container.
   */
  className?: string;

  /**
   * Custom styles for the list container.
   */
  style?: React.CSSProperties;
};

export function SearchResultList({
  results = [],
  loading = false,
  emptyMessage = 'No results found matching your criteria.',
  onResultClick,
  className,
  style,
}: SearchResultListProps) {
  if (loading) {
    return (
      <div data-testid="loading-container" className={classNames(styles.loadingContainer, className)} style={style}>
        <Spinner size="large" variant="primary" />
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className={classNames(styles.emptyContainer, className)} style={style}>
        <Paragraph size="medium" className={styles.emptyText}>
          {emptyMessage}
        </Paragraph>
      </div>
    );
  }

  return (
    <div className={classNames(styles.searchResultList, className)} style={style}>
      <div className={styles.grid}>
        {results.map((result) => (
          <SearchResultCard
            key={result.id}
            result={result}
            onClick={() => onResultClick?.(result)}
          />
        ))}
      </div>
    </div>
  );
}