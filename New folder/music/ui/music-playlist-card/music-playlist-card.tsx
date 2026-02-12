import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Card } from '@cloudrabbit/design.content.card';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Button } from '@cloudrabbit/design.actions.button';
import { Image } from '@cloudrabbit/design.content.image';
import { MusicPlaylist } from '@cloudrabbit/music.entities.music-playlist';
import styles from './music-playlist-card.module.scss';

export type MusicPlaylistCardProps = {
  /**
   * The playlist entity to display.
   */
  playlist: MusicPlaylist;

  /**
   * Callback fired when the play button is clicked.
   */
  onPlay?: (playlistId: string) => void;

  /**
   * Custom class name for the card.
   */
  className?: string;

  /**
   * Custom styles for the card.
   */
  style?: React.CSSProperties;
};

const DEFAULT_COVER = 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_music_playlis_0_1770835233075.png';

export function MusicPlaylistCard({
  playlist,
  onPlay,
  className,
  style,
}: MusicPlaylistCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/music/playlist/${playlist.id}`);
  };

  const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.stopPropagation();
    onPlay?.(playlist.id);
  };

  const trackCount = playlist.tracks?.length || 0;
  const coverUrl = playlist.tracks?.[0]?.thumbnailUrl || DEFAULT_COVER;

  return (
    <Card
      className={classNames(styles.playlistCard, className)}
      style={style}
      interactive
      onClick={handleCardClick}
      variant="elevated"
    >
      <div className={styles.coverContainer}>
        <Image
          src={coverUrl}
          alt={`Cover for ${playlist.name}`}
          className={styles.coverImage}
        />
        <div className={styles.overlay}>
          <Button
            appearance="primary"
            className={styles.playButton}
            onClick={handlePlayClick}
          >
            Play
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <Heading element="h3" visualLevel="h6" className={styles.title}>
          {playlist.name}
        </Heading>
        
        <div className={styles.meta}>
          <Paragraph size="small" className={styles.trackCount}>
            {trackCount} {trackCount === 1 ? 'Track' : 'Tracks'}
          </Paragraph>
          
          {playlist.isPublic ? (
            <span className={styles.badge}>Public</span>
          ) : (
            <span className={classNames(styles.badge, styles.private)}>Private</span>
          )}
        </div>
        
        {playlist.description && (
          <Paragraph size="small" className={styles.description}>
            {playlist.description}
          </Paragraph>
        )}
      </div>
    </Card>
  );
}