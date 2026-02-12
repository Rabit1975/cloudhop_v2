import { Asset } from './asset.js';
import { mockAsset } from './asset.mock.js';

describe('Asset', () => {
  it('should create an Asset instance from a plain object', () => {
    const plainAsset = mockAsset().toObject();
    const asset = Asset.from(plainAsset);
    expect(asset).toBeInstanceOf(Asset);
  });

  it('should serialize an Asset instance to a plain object', () => {
    const asset = mockAsset();
    const plainAsset = asset.toObject();
    expect(plainAsset.id).toBe(asset.id);
    expect(plainAsset.spaceId).toBe(asset.spaceId);
  });

  it('has a Asset.from() method', () => {
    expect(Asset.from).toBeTruthy();
  });
});