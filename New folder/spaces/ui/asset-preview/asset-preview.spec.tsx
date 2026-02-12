import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockAsset } from '@cloudrabbit/spaces.entities.asset';
import { AssetPreview } from './asset-preview.js';
import styles from './asset-preview.module.scss';

describe('AssetPreview', () => {
  it('should render the asset name', () => {
    const asset = mockAsset({ name: 'test-asset.png', type: 'image/png' }).toObject();
    render(<AssetPreview asset={asset} />);
    const nameElement = screen.getByText('test-asset.png');
    expect(nameElement).toBeInTheDocument();
  });

  it('should render the image when the asset type is an image', () => {
    const asset = mockAsset({ name: 'test-asset.png', type: 'image/png', url: 'test-url' }).toObject();
    render(<AssetPreview asset={asset} />);
    const imageElement = screen.getByAltText('test-asset.png');
    expect(imageElement).toBeInTheDocument();
  });

  it('should render a generic icon when the asset type is not an image', () => {
    const asset = mockAsset({ name: 'test-asset.pdf', type: 'application/pdf' }).toObject();
    render(<AssetPreview asset={asset} />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toBeInTheDocument();
  });
});