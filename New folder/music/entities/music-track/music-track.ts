import { MusicTrackPlain, MusicTrackSourceType } from './music-track-type.js';

export class MusicTrack {
  constructor(
    /**
     * Unique identifier for the track.
     */
    readonly id: string,

    /**
     * Title of the music track.
     */
    readonly title: string,

    /**
     * Duration of the track in seconds.
     */
    readonly duration: number,

    /**
     * Source type of the track.
     */
    readonly sourceType: MusicTrackSourceType,

    /**
     * Identifier for the source.
     */
    readonly sourceIdentifier: string,

    /**
     * Whether the track is public.
     */
    readonly isPublic: boolean,

    /**
     * ISO timestamp of when the track was created.
     */
    readonly createdAt: string,

    /**
     * Artist name associated with the track.
     */
    readonly artist?: string,

    /**
     * URL for the track's thumbnail image.
     */
    readonly thumbnailUrl?: string,

    /**
     * ID of the user who uploaded or added the track.
     */
    readonly uploaderId?: string,

    /**
     * ISO timestamp of when the track was last updated.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serializes the MusicTrack entity into a plain object.
   */
  toObject(): MusicTrackPlain {
    return {
      id: this.id,
      title: this.title,
      artist: this.artist,
      duration: this.duration,
      sourceType: this.sourceType,
      sourceIdentifier: this.sourceIdentifier,
      thumbnailUrl: this.thumbnailUrl,
      uploaderId: this.uploaderId,
      isPublic: this.isPublic,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a MusicTrack entity from a plain object.
   */
  static from(plain: MusicTrackPlain): MusicTrack {
    return new MusicTrack(
      plain.id,
      plain.title,
      plain.duration,
      plain.sourceType,
      plain.sourceIdentifier,
      plain.isPublic,
      plain.createdAt,
      plain.artist,
      plain.thumbnailUrl,
      plain.uploaderId,
      plain.updatedAt
    );
  }
}