import React from 'react';
import classNames from 'classnames';
import { SearchResultCard } from '@cloudrabbit/search.ui.search-result-card';
import { SpaceIcon } from '@cloudrabbit/spaces.icons.space-icon';
import type { SearchResult } from '@cloudrabbit/search.entities.search-result';
import type { PlainSpace } from '@cloudrabbit/spaces.entities.space';
import styles from './space-search-result.module.scss';

export type SpaceSearchResultProps = {
  /**
   * The search result entity to display.
   * Expects the content to be a Space entity.
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
};

export function SpaceSearchResult({ result, className, style }: SpaceSearchResultProps) {
  // Extract space data from the search result
  // We handle potential differences in how content is stored (entity vs plain object)
  const resultObj = typeof result.toObject === 'function' ? result.toObject() : result;
  
  // The content might be a Space entity (with toObject) or already a plain object
  // Casting to any to safely access potentially existing toObject method
  const contentRef = resultObj.content as any;
  const content = (contentRef && typeof contentRef.toObject === 'function')
    ? contentRef.toObject()
    : resultObj.content;

  // Cast content to PlainSpace to access properties
  const space = content as unknown as PlainSpace;
  const { id, name, description, visibility } = space;

  // Map the Space data to the format expected by SearchResultCard
  // We use the visibility as the 'type' to display it in the badge
  const cardResult = {
    id,
    title: name,
    description: description || '',
    // Use the mandated generic image URL
    imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_icon_for_a__s_0_1770835139434.png',
    link: `/spaces/${id}`,
    type: visibility ? visibility.charAt(0).toUpperCase() + visibility.slice(1) : 'Space',
  };

  return (
    <div className={classNames(styles.spaceSearchResult, className)} style={style}>
      <div className={styles.iconOverlay}>
        <SpaceIcon className={styles.icon} />
      </div>
      <SearchResultCard 
        result={cardResult} 
        className={styles.card}
      />
    </div>
  );
}