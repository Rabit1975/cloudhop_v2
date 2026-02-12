import type { MusicTrack } from '@cloudrabbit/music.entities.music-track';

export type EditorTrack = {
  id: string;
  name: string;
  volume: number;
  isMuted: boolean;
  isSolo: boolean;
  clips: EditorClip[];
  color: string;
};

export type EditorClip = {
  id: string;
  trackId: string;
  startOffset: number; // in seconds
  duration: number; // in seconds
  audioSource: MusicTrack;
};

export type EditorState = {
  isPlaying: boolean;
  currentTime: number; // in seconds
  zoomLevel: number; // pixels per second
  tempo: number; // BPM
  totalDuration: number;
};