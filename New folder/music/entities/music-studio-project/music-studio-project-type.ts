import { MusicTrackPlain } from '@cloudrabbit/music.entities.music-track';

export type MusicStudioProjectPlain = {
  /**
   * Unique identifier for the project.
   */
  id: string;

  /**
   * Name of the project.
   */
  name: string;

  /**
   * ID of the user who owns the project.
   */
  ownerId: string;

  /**
   * ISO timestamp of when the project was last edited.
   */
  lastEditedAt: string;

  /**
   * List of music tracks representing layers or clips in the project.
   */
  layers: MusicTrackPlain[];
};