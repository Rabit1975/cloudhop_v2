import type { MusicTrackSourceType } from '@cloudrabbit/music.entities.music-track';

export type MusicListTracksOptions = {
  limit?: number;
  offset?: number;
  search?: string;
  uploaderId?: string;
  sourceType?: MusicTrackSourceType;
  isPublic?: boolean;
};

export type MusicGetTrackOptions = {
  trackId: string;
};

export type MusicUploadUserAudioOptions = {
  title: string;
  artist?: string;
  duration: number;
  thumbnailUrl?: string;
  audioFileUrl: string;
  isPublic?: boolean;
};

export type MusicImportExternalTrackOptions = {
  sourceType: string;
  sourceIdentifier: string;
  title: string;
  artist?: string;
  duration: number;
  thumbnailUrl?: string;
  isPublic?: boolean;
};