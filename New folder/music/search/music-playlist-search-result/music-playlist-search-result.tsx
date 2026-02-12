import React from 'react';
import classNames from 'classnames';
import { Card } from '@cloudrabbit/design.content.card';
import { Link } from '@cloudrabbit/design.navigation.link';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { MusicPlaylist } from '@cloudrabbit/music.entities.music-playlist';
import styles from './music-playlist-search-result.module.scss';

export type MusicPlaylistSearchResultProps = {
  /**
   * The search result entity containing the playlist data.
   */
  result: SearchResult;

  /**
   * Additional class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: React.CSSProperties;
};

const DEFAULT_PLAYLIST_IMAGE = "https://storage.googleapis.com/bit-generated-images/images/image_vibrant__modern_digital_art_re_0_1770834015339.png";

export function MusicPlaylistSearchResult({ result, className, style }: MusicPlaylistSearchResultProps) {
  const playlist = result.content as unknown as MusicPlaylist;
  const trackCount = playlist.tracks ? playlist.tracks.length : 0;

  return (
    <Link 
      href={`/music/playlist/${playlist.id}`} 
      noStyles 
      className={classNames(styles.musicPlaylistSearchResult, className)}
      style={style}
    >
      <Card
        title={playlist.name}
        image={DEFAULT_PLAYLIST_IMAGE}
        imageAlt={`Cover art for ${playlist.name}`}
        variant="default"
        interactive
        className={styles.card}
        footer={
          <div className={styles.footerContent}>
            <span className={styles.typeLabel}>Playlist</span>
            <span className={styles.trackCount}>
              {trackCount} {trackCount === 1 ? 'track' : 'tracks'}
            </span>
          </div>
        }
      >
        <p className={styles.description}>
          {playlist.description || 'No description available for this playlist.'}
        </p>
      </Card>
    </Link>
  );
}