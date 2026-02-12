export type PlainAsset = {
  /**
   * Unique identifier for the asset.
   */
  id: string;

  /**
   * The ID of the space this asset belongs to.
   */
  spaceId: string;

  /**
   * Optional ID of the content this asset is associated with.
   */
  contentId?: string;

  /**
   * The name of the asset file (e.g., "image.png").
   */
  name: string;

  /**
   * The MIME type of the asset (e.g., "image/png", "application/pdf").
   */
  type: string;

  /**
   * The URL where the asset is stored.
   */
  url: string;

  /**
   * Optional URL for a thumbnail representation of the asset.
   */
  thumbnailUrl?: string;

  /**
   * The size of the asset in bytes.
   */
  size: number;

  /**
   * The date and time when the asset was uploaded (ISO string).
   */
  uploadDate: string;

  /**
   * The ID of the user who uploaded the asset.
   */
  uploadedById: string;

  /**
   * Additional metadata associated with the asset.
   */
  metadata?: Record<string, unknown>;
};