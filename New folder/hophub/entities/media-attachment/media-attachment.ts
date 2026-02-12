import { PlainMediaAttachment } from './media-attachment-type.js';

export class MediaAttachment {
  constructor(
    /**
     * Unique identifier for the media attachment.
     */
    readonly id: string,

    /**
     * Type of the media (e.g., 'image', 'video', 'file').
     */
    readonly type: string,

    /**
     * URL where the media resource is hosted.
     */
    readonly url: string,

    /**
     * Optional URL for a thumbnail preview of the media.
     */
    readonly thumbnailUrl?: string,

    /**
     * Name of the file.
     */
    readonly filename?: string,

    /**
     * Size of the file in bytes.
     */
    readonly size?: number
  ) {}

  /**
   * Serialize the MediaAttachment entity into a plain object.
   */
  toObject(): PlainMediaAttachment {
    return {
      id: this.id,
      type: this.type,
      url: this.url,
      thumbnailUrl: this.thumbnailUrl,
      filename: this.filename,
      size: this.size,
    };
  }

  /**
   * Create a MediaAttachment entity from a plain object.
   */
  static from(plain: PlainMediaAttachment): MediaAttachment {
    return new MediaAttachment(
      plain.id,
      plain.type,
      plain.url,
      plain.thumbnailUrl,
      plain.filename,
      plain.size
    );
  }
}