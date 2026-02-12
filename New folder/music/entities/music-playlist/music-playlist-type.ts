import { MusicTrackPlain } from '@cloudrabbit/music.entities.music-track';

export type MusicPlaylistPlain = {
  /**
   * Unique identifier for the playlist.
   */
  id: string;

  /**
   * Name of the playlist.
   */
  name: string;

  /**
   * Description of the playlist content.
   */
  description?: string;

  /**
   * ID of the user who owns the playlist.
   */
  ownerId: string;

  /**
   * Whether the playlist is visible to the public.
   */
  isPublic: boolean;

  /**
   * List of music tracks in the playlist.
   */
  tracks: MusicTrackPlain[];

  /**
   * ISO timestamp of when the playlist was created.
   */
  createdAt: string;

  /**
   * ISO timestamp of when the playlist was last updated.
   */
  updatedAt?: string;
};