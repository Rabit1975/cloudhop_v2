import React, { useMemo } from 'react';
import classNames from 'classnames';
import type { EditorClip } from './editor-types.js';
import styles from './music-studio-editor.module.scss';

export type AudioClipProps = {
  clip: EditorClip;
  zoomLevel: number; // pixels per second
  color: string;
  onSelect?: (id: string) => void;
  selected?: boolean;
};

export function AudioClip({ clip, zoomLevel, color, onSelect, selected }: AudioClipProps) {
  const width = clip.duration * zoomLevel;
  const left = clip.startOffset * zoomLevel;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(clip.id);
  };

  const waveformPoints = useMemo(() => {
    // Generate mock waveform SVG path based on width
    const points: string[] = [];
    const steps = Math.min(width / 2, 100);
    const stepWidth = width / steps;
    
    for (let i = 0; i <= steps; i++) {
      const x = i * stepWidth;
      const amplitude = Math.random() * 0.8 + 0.1; // 10% to 90% height
      const y = 50 - (amplitude * 50); // Centered at 50%
      points.push(`${x},${y}`);
    }
    // Loop back for mirror effect
    for (let j = steps; j >= 0; j--) {
      const xJ = j * stepWidth;
      const amplitudeJ = Math.random() * 0.8 + 0.1; 
      const yMirrorJ = 50 + (amplitudeJ * 50);
      points.push(`${xJ},${yMirrorJ}`);
    }
    return points.join(' ');
  }, [width]);

  return (
    <div
      className={classNames(styles.clip, { [styles.selected]: selected })}
      style={{
        width: `${width}px`,
        left: `${left}px`,
        backgroundColor: color,
        '--clip-color': color,
      } as React.CSSProperties}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect?.(clip.id);
        }
      }}
    >
      <div className={styles.clipHeader}>
        <span className={styles.clipName}>{clip.audioSource.title}</span>
      </div>
      <div className={styles.waveformContainer}>
        {/* Simple decorative waveform */}
        <svg className={styles.waveform} preserveAspectRatio="none" viewBox={`0 0 ${width} 100`}>
          <path d={`M0,50 L${width},50`} stroke="rgba(255,255,255,0.2)" strokeWidth="100" />
          <path d={`M0,50 ${waveformPoints} Z`} fill="rgba(0,0,0,0.3)" />
        </svg>
      </div>
      <div className={styles.clipHandleLeft} />
      <div className={styles.clipHandleRight} />
    </div>
  );
}