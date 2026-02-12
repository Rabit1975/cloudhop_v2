import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { MusicStudioProjectPlain } from './music-studio-project-type.js';

export class MusicStudioProject {
  constructor(
    /**
     * Unique identifier for the project.
     */
    readonly id: string,

    /**
     * Name of the project.
     */
    readonly name: string,

    /**
     * ID of the user who owns the project.
     */
    readonly ownerId: string,

    /**
     * ISO timestamp of when the project was last edited.
     */
    readonly lastEditedAt: string,

    /**
     * List of music tracks representing layers or clips in the project.
     */
    readonly layers: MusicTrack[]
  ) {}

  /**
   * Serializes the MusicStudioProject entity into a plain object.
   */
  toObject(): MusicStudioProjectPlain {
    return {
      id: this.id,
      name: this.name,
      ownerId: this.ownerId,
      lastEditedAt: this.lastEditedAt,
      layers: this.layers.map((layer) => layer.toObject()),
    };
  }

  /**
   * Creates a MusicStudioProject entity from a plain object.
   */
  static from(plain: MusicStudioProjectPlain) {
    return new MusicStudioProject(
      plain.id,
      plain.name,
      plain.ownerId,
      plain.lastEditedAt,
      plain.layers.map((layer) => MusicTrack.from(layer))
    );
  }
}