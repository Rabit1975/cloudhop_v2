import React from 'react';
import classNames from 'classnames';
import { VolumeIcon, MusicNoteIcon } from './editor-icons.js';
import { AudioClip } from './audio-clip.js';
import type { EditorTrack } from './editor-types.js';
import styles from './music-studio-editor.module.scss';

export type TimelineTrackProps = {
  track: EditorTrack;
  zoomLevel: number;
  selectedClipId?: string;
  onClipSelect: (clipId: string) => void;
  onMuteToggle: (trackId: string) => void;
  onSoloToggle: (trackId: string) => void;
};

export function TimelineTrack({
  track,
  zoomLevel,
  selectedClipId,
  onClipSelect,
  onMuteToggle,
  onSoloToggle
}: TimelineTrackProps) {
  return (
    <div className={styles.trackLane}>
      {/* Track Header (Controls) */}
      <div className={styles.trackHeader}>
        <div className={styles.trackInfo}>
          <div className={styles.trackIcon} style={{ backgroundColor: track.color }}>
            <MusicNoteIcon width={16} height={16} />
          </div>
          <span className={styles.trackName} title={track.name}>
            {track.name}
          </span>
        </div>
        
        <div className={styles.trackControls}>
          <div className={styles.volumeControl}>
            <VolumeIcon width={14} height={14} />
            <div className={styles.volumeBar}>
              <div 
                className={styles.volumeLevel} 
                style={{ width: `${track.volume * 100}%` }} 
              />
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={classNames(styles.trackBtn, { [styles.active]: track.isMuted })}
              onClick={() => onMuteToggle(track.id)}
              aria-label="Mute"
            >
              M
            </button>
            <button
              type="button"
              className={classNames(styles.trackBtn, { [styles.active]: track.isSolo })}
              onClick={() => onSoloToggle(track.id)}
              aria-label="Solo"
            >
              S
            </button>
          </div>
        </div>
      </div>

      {/* Track Content (Timeline) */}
      <div className={styles.trackContent}>
        <div className={styles.gridLines} />
        {track.clips.map((clip) => (
          <AudioClip
            key={clip.id}
            clip={clip}
            zoomLevel={zoomLevel}
            color={track.color}
            selected={selectedClipId === clip.id}
            onSelect={onClipSelect}
          />
        ))}
      </div>
    </div>
  );
}