import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockAsset, mockAssets } from '@cloudrabbit/spaces.entities.asset';
import { AssetUploader } from './asset-uploader.js';

const SPACE_ID = 'space-123';
const CONTENT_ID = 'content-456';

const placeholderImage = 'https://storage.googleapis.com/bit-generated-images/images/image_a_sleek__modern_ui_component_f_0_1770835144824.png';

export const BasicUploader = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Asset Uploader</h2>
          <AssetUploader spaceId={SPACE_ID} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const WithPreloadedAssets = () => {
  const assets = [
    mockAsset({ 
      name: 'Hero_Image_V2.png', 
      type: 'image/png', 
      url: placeholderImage,
      spaceId: SPACE_ID 
    }),
    mockAsset({ 
      name: 'Project_Specs_2024.pdf', 
      type: 'application/pdf', 
      spaceId: SPACE_ID 
    }),
    mockAsset({ 
      name: 'Launch_Video.mp4', 
      type: 'video/mp4', 
      spaceId: SPACE_ID 
    }),
  ];

  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Managing Content Assets</h2>
          <AssetUploader 
            spaceId={SPACE_ID} 
            contentId={CONTENT_ID} 
            mockAssets={assets}
          />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const NebulaThemedUploader = () => {
  const assets = mockAssets(4, { spaceId: SPACE_ID, url: placeholderImage });

  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '64px', 
          minHeight: '100vh',
          backgroundImage: 'var(--effects-gradients-nebula)',
          backgroundSize: 'cover'
        }}>
          <div style={{
            maxWidth: '800px', 
            margin: '0 auto',
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'var(--effects-blur-medium)',
            padding: '32px',
            borderRadius: 'var(--borders-radius-large)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 style={{ 
              marginBottom: '24px', 
              color: 'var(--colors-text-primary)',
              marginTop: 0
            }}>
              Nebula Space Assets
            </h2>
            <AssetUploader 
              spaceId={SPACE_ID} 
              mockAssets={assets}
            />
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};