import React from 'react';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { Card } from '@cloudrabbit/design.content.card';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import classNames from 'classnames';
import styles from './music-track-search-result.module.scss';

export type MusicTrackSearchResultProps = {
  /**
   * The search result entity containing the music track data.
   */
  result: SearchResult;

  /**
   * Callback fired when the card is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: React.CSSProperties;
};

// Define the expected shape of the content within the search result
// assuming it matches the structure of a MusicTrack
interface MusicTrackContent {
  id: string;
  title: string;
  artist?: string;
  thumbnailUrl?: string;
  sourceType?: string;
  duration?: number;
}

export function MusicTrackSearchResult({
  result,
  onClick,
  className,
  style,
}: MusicTrackSearchResultProps) {
  // Cast the generic content to our expected MusicTrack shape
  const content = result.content as unknown as MusicTrackContent;
  const { id, title, artist, thumbnailUrl, sourceType, duration } = content;

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds?: number) => {
    if (typeof seconds !== 'number') return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const displayDuration = formatDuration(duration);

  return (
    <Link
      href={`/music/track/${id}`}
      onClick={onClick}
      className={classNames(styles.musicTrackSearchResult, className)}
      style={style}
      noStyles
    >
      <Card
        title={title}
        image={thumbnailUrl}
        imageAlt={`Thumbnail for ${title}`}
        variant="default"
        interactive
        className={styles.card}
      >
        <div className={styles.details}>
          {artist && (
            <Paragraph size="small" className={styles.artist}>
              {artist}
            </Paragraph>
          )}
          
          <div className={styles.meta}>
            {sourceType && (
              <span className={styles.badge}>
                {sourceType}
              </span>
            )}
            {displayDuration && (
              <span className={styles.duration}>
                {displayDuration}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}