import React from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { 
  PlayIcon, 
  PauseIcon, 
  StopIcon, 
  SkipNextIcon, 
  SkipPrevIcon, 
  RecordIcon,
  SettingsIcon
} from './editor-icons.js';
import styles from './music-studio-editor.module.scss';

export type TransportBarProps = {
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  tempo: number;
  onPlayPause: () => void;
  onStop: () => void;
  onRecord?: () => void;
};

export function TransportBar({ 
  isPlaying, 
  currentTime, 
  totalDuration, 
  tempo,
  onPlayPause, 
  onStop,
  onRecord 
}: TransportBarProps) {
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.transportBar}>
      <div className={styles.transportControls}>
        <Button 
          appearance="tertiary" 
          className={styles.iconBtn} 
          onClick={() => {}}
          aria-label="Previous"
        >
          <SkipPrevIcon />
        </Button>
        <Button 
          appearance="tertiary" 
          className={styles.iconBtn} 
          onClick={onStop}
          aria-label="Stop"
        >
          <StopIcon />
        </Button>
        <Button 
          appearance="primary" 
          className={classNames(styles.playBtn, { [styles.playing]: isPlaying })}
          onClick={onPlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon width={24} height={24} /> : <PlayIcon width={24} height={24} />}
        </Button>
        <Button 
          appearance="tertiary" 
          className={styles.iconBtn} 
          onClick={onRecord}
          aria-label="Record"
        >
          <RecordIcon className={styles.recordIcon} />
        </Button>
        <Button 
          appearance="tertiary" 
          className={styles.iconBtn} 
          onClick={() => {}}
          aria-label="Next"
        >
          <SkipNextIcon />
        </Button>
      </div>

      <div className={styles.transportDisplay}>
        <div className={styles.timeDisplay}>
          <span className={styles.timeLabel}>TIME</span>
          <span className={styles.timeValue}>{formatTime(currentTime)}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.tempoDisplay}>
          <span className={styles.tempoValue}>{tempo}</span>
          <span className={styles.tempoLabel}>BPM</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.signatureDisplay}>
          <span className={styles.signatureValue}>4/4</span>
          <span className={styles.signatureLabel}>SIG</span>
        </div>
      </div>

      <div className={styles.transportSettings}>
         <Button appearance="tertiary" className={styles.iconBtn} aria-label="Settings">
            <SettingsIcon />
         </Button>
      </div>
    </div>
  );
}