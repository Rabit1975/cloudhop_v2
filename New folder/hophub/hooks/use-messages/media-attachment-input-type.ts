export type MediaAttachmentInputType = {
  /**
   * The URL of the media attachment.
   */
  url: string;

  /**
   * The MIME type of the media.
   */
  type: string;

  /**
   * The filename of the media.
   */
  filename?: string;

  /**
   * The size of the media in bytes.
   */
  size?: number;
};