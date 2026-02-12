import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { mockAsset } from '@cloudrabbit/spaces.entities.asset';
import { AssetPreview } from './asset-preview.js';

const placeholderImage = 'https://storage.googleapis.com/bit-generated-images/images/image_a_modern_and_clean_ui_design_f_0_1770833871858.png';

export const ImageAssetPreview = () => {
  const imageAsset = mockAsset({
    name: 'Design_System_v2.png',
    type: 'image/png',
    url: placeholderImage,
  }).toObject();

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <AssetPreview asset={imageAsset} />
      </div>
    </CloudrabbitTheme>
  );
};

export const DocumentAssetPreview = () => {
  const docAsset = mockAsset({
    name: 'Q4_Financial_Report.pdf',
    type: 'application/pdf',
    url: '',
  }).toObject();

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <AssetPreview asset={docAsset} />
      </div>
    </CloudrabbitTheme>
  );
};

export const VideoAssetPreview = () => {
  const videoAsset = mockAsset({
    name: 'Product_Demo_Walkthrough.mp4',
    type: 'video/mp4',
    url: '',
  }).toObject();

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <AssetPreview asset={videoAsset} />
      </div>
    </CloudrabbitTheme>
  );
};

export const AudioAssetPreview = () => {
  const audioAsset = mockAsset({
    name: 'Podcast_Episode_01.mp3',
    type: 'audio/mpeg',
    url: '',
  }).toObject();

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <AssetPreview asset={audioAsset} />
      </div>
    </CloudrabbitTheme>
  );
};

export const InteractivePreview = () => {
  const imageAsset = mockAsset({
    name: 'Clickable_Asset.jpg',
    type: 'image/jpeg',
    url: placeholderImage,
  }).toObject();

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <AssetPreview 
          asset={imageAsset} 
          onClick={(asset) => alert(`Clicked on ${asset.name}`)}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const GridDisplay = () => {
  const assets = [
    mockAsset({ name: 'logo.png', type: 'image/png', url: placeholderImage }).toObject(),
    mockAsset({ name: 'specs.pdf', type: 'application/pdf' }).toObject(),
    mockAsset({ name: 'intro.mp4', type: 'video/mp4' }).toObject(),
    mockAsset({ name: 'notes.txt', type: 'text/plain' }).toObject(),
  ];

  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '32px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '24px',
        maxWidth: '1000px'
      }}>
        {assets.map((asset) => (
          <AssetPreview 
            key={asset.id} 
            asset={asset} 
            onClick={(a) => console.log('View', a.name)}
          />
        ))}
      </div>
    </CloudrabbitTheme>
  );
};