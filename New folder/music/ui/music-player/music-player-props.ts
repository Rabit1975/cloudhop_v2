import { type MusicTrack } from '@cloudrabbit/music.entities.music-track';

export type MusicPlayerProps = {
  /**
   * The currently active music track.
   */
  track?: MusicTrack | null;

  /**
   * Whether the track is currently playing.
   * @default false
   */
  isPlaying?: boolean;

  /**
   * Current playback time in seconds.
   * @default 0
   */
  currentTime?: number;

  /**
   * Volume level (0 to 100).
   * @default 100
   */
  volume?: number;

  /**
   * Callback for play action.
   */
  onPlay?: () => void;

  /**
   * Callback for pause action.
   */
  onPause?: () => void;

  /**
   * Callback for next track action.
   */
  onNext?: () => void;

  /**
   * Callback for previous track action.
   */
  onPrevious?: () => void;

  /**
   * Callback when the user seeks (changes time).
   */
  onSeek?: (time: number) => void;

  /**
   * Callback when volume changes.
   */
  onVolumeChange?: (volume: number) => void;

  /**
   * Custom class name for the player container.
   */
  className?: string;

  /**
   * Custom style for the player container.
   */
  style?: React.CSSProperties;
};