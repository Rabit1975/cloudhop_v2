import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { MusicPlaylistPlain } from './music-playlist-type.js';

export class MusicPlaylist {
  constructor(
    /**
     * Unique identifier for the playlist.
     */
    readonly id: string,

    /**
     * Name of the playlist.
     */
    readonly name: string,

    /**
     * ID of the user who owns the playlist.
     */
    readonly ownerId: string,

    /**
     * Whether the playlist is visible to the public.
     */
    readonly isPublic: boolean,

    /**
     * List of music tracks in the playlist.
     */
    readonly tracks: MusicTrack[],

    /**
     * ISO timestamp of when the playlist was created.
     */
    readonly createdAt: string,

    /**
     * Description of the playlist content.
     */
    readonly description?: string,

    /**
     * ISO timestamp of when the playlist was last updated.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serializes the MusicPlaylist entity into a plain object.
   */
  toObject(): MusicPlaylistPlain {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ownerId: this.ownerId,
      isPublic: this.isPublic,
      tracks: this.tracks.map((track) => track.toObject()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a MusicPlaylist entity from a plain object.
   */
  static from(plain: MusicPlaylistPlain): MusicPlaylist {
    return new MusicPlaylist(
      plain.id,
      plain.name,
      plain.ownerId,
      plain.isPublic,
      (plain.tracks || []).map((track) => MusicTrack.from(track)),
      plain.createdAt,
      plain.description,
      plain.updatedAt
    );
  }
}