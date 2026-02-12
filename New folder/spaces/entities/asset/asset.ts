import { PlainAsset } from './plain-asset-type.js';

export class Asset {
  constructor(
    /**
     * Unique identifier for the asset.
     */
    readonly id: string,

    /**
     * The ID of the space this asset belongs to.
     */
    readonly spaceId: string,

    /**
     * The name of the asset file.
     */
    readonly name: string,

    /**
     * The MIME type of the asset.
     */
    readonly type: string,

    /**
     * The URL where the asset is stored.
     */
    readonly url: string,

    /**
     * The size of the asset in bytes.
     */
    readonly size: number,

    /**
     * The date and time when the asset was uploaded.
     */
    readonly uploadDate: string,

    /**
     * The ID of the user who uploaded the asset.
     */
    readonly uploadedById: string,

    /**
     * Optional ID of the content this asset is associated with.
     */
    readonly contentId?: string,

    /**
     * Optional URL for a thumbnail representation of the asset.
     */
    readonly thumbnailUrl?: string,

    /**
     * Additional metadata associated with the asset.
     */
    readonly metadata?: Record<string, unknown>
  ) {}

  /**
   * Serializes the Asset entity into a plain object.
   */
  toObject(): PlainAsset {
    return {
      id: this.id,
      spaceId: this.spaceId,
      contentId: this.contentId,
      name: this.name,
      type: this.type,
      url: this.url,
      thumbnailUrl: this.thumbnailUrl,
      size: this.size,
      uploadDate: this.uploadDate,
      uploadedById: this.uploadedById,
      metadata: this.metadata,
    };
  }

  /**
   * Creates an Asset entity from a plain object.
   */
  static from(plainAsset: PlainAsset): Asset {
    return new Asset(
      plainAsset.id,
      plainAsset.spaceId,
      plainAsset.name,
      plainAsset.type,
      plainAsset.url,
      plainAsset.size,
      plainAsset.uploadDate,
      plainAsset.uploadedById,
      plainAsset.contentId,
      plainAsset.thumbnailUrl,
      plainAsset.metadata
    );
  }
}