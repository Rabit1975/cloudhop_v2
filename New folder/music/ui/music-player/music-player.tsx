import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Image } from '@cloudrabbit/design.content.image';
import { PlayIcon, PauseIcon, SkipNextIcon, SkipPreviousIcon, VolumeUpIcon, VolumeMuteIcon } from './music-icons.js';
import type { MusicPlayerProps } from './music-player-props.js';
import styles from './music-player.module.scss';

export type { MusicPlayerProps };

export function MusicPlayer({
  track,
  isPlaying = false,
  currentTime = 0,
  volume = 100,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  className,
  style,
}: MusicPlayerProps) {
  const duration = track?.duration || 0;

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  }, [isPlaying, onPlay, onPause]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    onSeek?.(time);
  }, [onSeek]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    onVolumeChange?.(vol);
  }, [onVolumeChange]);

  const formatTime = (time: number) => {
    if (!time || Number.isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const defaultThumbnail = 'https://storage.googleapis.com/bit-generated-images/images/image_a_modern_and_minimalist_music__0_1770835129831.png';

  return (
    <div className={classNames(styles.musicPlayer, className)} style={style}>
      <div className={styles.trackInfo}>
        <Image 
          src={track?.thumbnailUrl || defaultThumbnail} 
          alt={track?.title || 'No Track'} 
          className={styles.thumbnail}
          width={56}
          height={56}
        />
        <div className={styles.meta}>
          <Heading element="h4" visualLevel="h6" className={styles.title}>
            {track?.title || 'No Track Selected'}
          </Heading>
          <Paragraph size="small" className={styles.artist}>
            {track?.artist || 'Unknown Artist'}
          </Paragraph>
        </div>
      </div>

      <div className={styles.mainControls}>
        <div className={styles.buttons}>
          <Button 
            appearance="tertiary" 
            onClick={onPrevious} 
            disabled={!track}
            className={styles.controlButton}
            aria-label="Previous Track"
          >
            <SkipPreviousIcon />
          </Button>
          
          <Button 
            appearance="primary" 
            onClick={handlePlayPause} 
            disabled={!track}
            className={styles.playPauseButton}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          
          <Button 
            appearance="tertiary" 
            onClick={onNext} 
            disabled={!track}
            className={styles.controlButton}
            aria-label="Next Track"
          >
            <SkipNextIcon />
          </Button>
        </div>
        
        <div className={styles.progressContainer}>
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            disabled={!track}
            className={styles.rangeInput}
            aria-label="Seek Progress"
            style={{
              background: `linear-gradient(to right, var(--colors-primary-default) ${(currentTime / (duration || 1)) * 100}%, var(--colors-surface-secondary) ${(currentTime / (duration || 1)) * 100}%)`
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className={styles.volumeControls}>
        <Button 
          appearance="tertiary" 
          onClick={() => onVolumeChange?.(volume === 0 ? 50 : 0)} 
          className={styles.controlButton}
          aria-label={volume === 0 ? "Unmute" : "Mute"}
        >
          {volume === 0 ? <VolumeMuteIcon /> : <VolumeUpIcon />}
        </Button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleVolumeChange}
          className={classNames(styles.rangeInput, styles.volumeSlider)}
          aria-label="Volume"
          style={{
            background: `linear-gradient(to right, var(--colors-text-secondary) ${volume}%, var(--colors-surface-secondary) ${volume}%)`
          }}
        />
      </div>
    </div>
  );
}