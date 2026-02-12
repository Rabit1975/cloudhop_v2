import React, { useCallback } from 'react';
import { useNavigate } from '@cloudrabbit/design.navigation.link';
import { Card } from '@cloudrabbit/design.content.card';
import { Button } from '@cloudrabbit/design.actions.button';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { MusicTrackPlain } from '@cloudrabbit/music.entities.music-track';
import classNames from 'classnames';
import styles from './music-track-card.module.scss';

export type MusicTrackCardProps = {
  /**
   * The music track entity to display.
   */
  track: MusicTrackPlain;

  /**
   * Callback fired when the play button is clicked.
   */
  onPlay?: (trackId: string) => void;

  /**
   * Callback fired when the add to playlist button is clicked.
   */
  onAddToPlaylist?: (trackId: string) => void;

  /**
   * URL to navigate to when the card is clicked.
   */
  href?: string;

  /**
   * Additional class names for the card.
   */
  className?: string;

  /**
   * Inline styles for the card.
   */
  style?: React.CSSProperties;
};

export function MusicTrackCard({
  track,
  onPlay,
  onAddToPlaylist,
  href,
  className,
  style,
}: MusicTrackCardProps) {
  const navigate = useNavigate();
  const defaultThumbnail = 'https://storage.googleapis.com/bit-generated-images/images/image_a_vibrant__modern_music_album__0_1770835136296.png';

  const handleNavigate = useCallback(() => {
    if (href) {
      navigate(href);
    }
  }, [href, navigate]);

  const handlePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay?.(track.id);
  }, [onPlay, track.id]);

  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToPlaylist?.(track.id);
  }, [onAddToPlaylist, track.id]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card
      className={classNames(styles.musicTrackCard, className)}
      style={style}
      image={track.thumbnailUrl || defaultThumbnail}
      imageAlt={track.title}
      title={track.title}
      interactive={!!href}
      onClick={handleNavigate}
      footer={
        <div className={styles.footer}>
          <Button appearance="primary" onClick={handlePlay} className={styles.playButton}>
            Play
          </Button>
          <Button appearance="secondary" onClick={handleAdd} className={styles.addButton}>
            Add to Playlist
          </Button>
        </div>
      }
    >
      <div className={styles.info}>
        {track.artist && (
          <Paragraph size="small" className={styles.artist}>
            {track.artist}
          </Paragraph>
        )}
        <span className={styles.duration}>{formatDuration(track.duration)}</span>
      </div>
    </Card>
  );
}