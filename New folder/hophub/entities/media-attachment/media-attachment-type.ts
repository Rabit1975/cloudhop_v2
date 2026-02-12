export type PlainMediaAttachment = {
  /**
   * Unique identifier for the media attachment.
   */
  id: string;

  /**
   * Type of the media (e.g., 'image', 'video', 'file').
   */
  type: string;

  /**
   * URL where the media resource is hosted.
   */
  url: string;

  /**
   * Optional URL for a thumbnail preview of the media.
   */
  thumbnailUrl?: string;

  /**
   * Name of the file.
   */
  filename?: string;

  /**
   * Size of the file in bytes.
   */
  size?: number;
};