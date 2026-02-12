import { Asset } from './asset.js';
import { PlainAsset } from './plain-asset-type.js';

/**
 * Generates a simple UUID for mock data.
 */
function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : (r % 4 + 8);
    return v.toString(16);
  });
}

/**
 * Default mock data for an asset.
 */
const defaultAsset: PlainAsset = {
  id: 'asset-1234',
  spaceId: 'space-5678',
  name: 'mock-image.png',
  type: 'image/png',
  url: 'https://example.com/assets/mock-image.png',
  thumbnailUrl: 'https://example.com/assets/mock-image-thumb.png',
  size: 2048,
  uploadDate: new Date().toISOString(),
  uploadedById: 'user-9012',
  metadata: { width: 800, height: 600 },
};

/**
 * Creates a single mock Asset with optional overrides.
 */
export function mockAsset(overrides: Partial<PlainAsset> = {}): Asset {
  const plain: PlainAsset = {
    ...defaultAsset,
    id: generateUuid(),
    ...overrides,
  };
  return Asset.from(plain);
}

/**
 * Creates a list of mock Assets.
 */
export function mockAssets(count: number = 3, overrides: Partial<PlainAsset> = {}): Asset[] {
  return Array.from({ length: count }).map((_, index) => {
    return mockAsset({
      name: `mock-asset-${index}.${overrides.type?.split('/')[1] || 'dat'}`,
      ...overrides,
    });
  });
}