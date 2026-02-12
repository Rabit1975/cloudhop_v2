import { Asset, type PlainAsset } from '@cloudrabbit/spaces.entities.asset';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapToAsset(data: any): Asset {
  const plainAsset: PlainAsset = {
    id: data.id,
    spaceId: data.spaceId,
    name: data.filename,
    type: data.mimeType,
    url: data.url,
    size: data.size,
    uploadDate: data.uploadedAt,
    uploadedById: data.uploadedBy,
    metadata: data.metadata,
    contentId: undefined,
    thumbnailUrl: undefined,
  };
  return Asset.from(plainAsset);
}