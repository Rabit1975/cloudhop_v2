export type MusicTrackSourceType = 'youtube' | 'upload' | 'external';

export type MusicTrackPlain = {
  /**
   * Unique identifier for the track.
   */
  id: string;

  /**
   * Title of the music track.
   */
  title: string;

  /**
   * Artist name associated with the track.
   */
  artist?: string;

  /**
   * Duration of the track in seconds.
   */
  duration: number;

  /**
   * Source type of the track (e.g., youtube, upload, external).
   */
  sourceType: MusicTrackSourceType;

  /**
   * Identifier for the source (e.g., YouTube video ID, file URL).
   */
  sourceIdentifier: string;

  /**
   * URL for the track's thumbnail image.
   */
  thumbnailUrl?: string;

  /**
   * ID of the user who uploaded or added the track.
   */
  uploaderId?: string;

  /**
   * Whether the track is public.
   */
  isPublic: boolean;

  /**
   * ISO timestamp of when the track was created.
   */
  createdAt: string;

  /**
   * ISO timestamp of when the track was last updated.
   */
  updatedAt?: string;
};