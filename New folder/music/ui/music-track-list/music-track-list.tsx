import React, { useMemo, type CSSProperties } from 'react';
import classNames from 'classnames';
import { Table, type TableColumn } from '@cloudrabbit/design.content.table';
import { Button } from '@cloudrabbit/design.actions.button';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import styles from './music-track-list.module.scss';

export type MusicTrackListProps = {
  /**
   * List of music tracks to display.
   */
  tracks: MusicTrack[];

  /**
   * Callback fired when the play action is clicked.
   */
  onPlay?: (track: MusicTrack) => void;

  /**
   * Callback fired when the add to playlist action is clicked.
   */
  onAddToPlaylist?: (track: MusicTrack) => void;

  /**
   * Callback fired when the remove action is clicked.
   */
  onRemove?: (track: MusicTrack) => void;

  /**
   * Additional class name for the list container.
   */
  className?: string;

  /**
   * Inline styles for the list container.
   */
  style?: CSSProperties;

  /**
   * Whether the list is in a loading state.
   */
  loading?: boolean;
};

function formatDuration(seconds: number): string {
  // If seconds is 0, NaN, null, or undefined, return '0:00'.
  // For 'seconds: number', `!seconds` covers `0` and `NaN` because `Boolean(0)` is false and `Boolean(NaN)` is false.
  if (!seconds) return '0:00'; 
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function MusicTrackList({
  tracks,
  onPlay,
  onAddToPlaylist,
  onRemove,
  className,
  style,
  loading = false,
}: MusicTrackListProps) {
  const columns = useMemo<TableColumn[]>(() => {
    return [
      {
        key: 'thumbnail',
        title: '',
        width: 60,
        render: (track: MusicTrack) => (
          <div className={styles.thumbnailContainer}>
            {track.thumbnailUrl ? (
              <img src={track.thumbnailUrl} alt={track.title} className={styles.thumbnailImage} />
            ) : (
              <div className={styles.thumbnailPlaceholder} />
            )}
          </div>
        ),
      },
      {
        key: 'info',
        title: 'Track',
        render: (track: MusicTrack) => (
          <div className={styles.trackInfo}>
            <span className={styles.trackTitle}>{track.title}</span>
            {track.artist && <span className={styles.trackArtist}>{track.artist}</span>}
          </div>
        ),
      },
      {
        key: 'duration',
        title: 'Duration',
        align: 'right',
        width: 100,
        render: (track: MusicTrack) => (
          <span className={styles.duration}>{formatDuration(track.duration)}</span>
        ),
      },
      {
        key: 'actions',
        title: '',
        width: 240,
        align: 'right',
        render: (track: MusicTrack) => (
          <div className={styles.actions}>
            {onPlay && (
              <Button
                appearance="tertiary"
                className={styles.actionButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(track);
                }}
              >
                Play
              </Button>
            )}
            {onAddToPlaylist && (
              <Button
                appearance="tertiary"
                className={styles.actionButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToPlaylist(track);
                }}
              >
                Add
              </Button>
            )}
            {onRemove && (
              <Button
                appearance="tertiary"
                className={styles.actionButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(track);
                }}
              >
                Remove
              </Button>
            )}
          </div>
        ),
      },
    ];
  }, [onPlay, onAddToPlaylist, onRemove]);

  return (
    <div className={classNames(styles.musicTrackList, className)} style={style}>
      <Table
        columns={columns}
        data={tracks}
        keyField="id"
        loading={loading}
        emptyState={
          <div className={styles.emptyState}>
            <span>No tracks found</span>
          </div>
        }
      />
    </div>
  );
}