export type MusicListPlaylistsOptions = {
  limit?: number;
  offset?: number;
  search?: string;
  ownerId?: string;
  isPublic?: boolean;
};

export type MusicGetPlaylistOptions = {
  playlistId: string;
};

export type MusicCreatePlaylistOptions = {
  name: string;
  description?: string;
  isPublic?: boolean;
  trackIds?: string[];
};

export type MusicUpdatePlaylistOptions = {
  playlistId: string;
  name?: string;
  description?: string;
  isPublic?: boolean;
  trackIds?: string[];
};

export type MusicDeletePlaylistOptions = {
  playlistId: string;
};

export type MusicAddTrackToPlaylistOptions = {
  playlistId: string;
  trackId: string;
  position?: number;
};

export type MusicRemoveTrackFromPlaylistOptions = {
  playlistId: string;
  trackId: string;
};

export type MusicReorderPlaylistTracksOptions = {
  playlistId: string;
  newTrackOrderIds: string[];
};