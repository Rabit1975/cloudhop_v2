import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Image } from './image.js';

const imageUrl = 'https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_sleek_digital_0_1770832602892.png';

export const BasicImage = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px' }}>
        <Image />
      </div>
    </CloudrabbitTheme>
  );
};

export const ResponsiveSizing = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '24px', 
        display: 'flex', 
        gap: '32px', 
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <div style={{ width: '200px' }}>
          <p style={{ marginBottom: '8px', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-caption-default)' }}>
            Fixed Width (200px)
          </p>
          <Image src={imageUrl} width={200} alt="Fixed width example" />
        </div>
        
        <div style={{ width: '300px' }}>
          <p style={{ marginBottom: '8px', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-caption-default)' }}>
            Container Width (300px)
          </p>
          <Image src={imageUrl} width="100%" alt="Full width example" />
        </div>

        <div>
          <p style={{ marginBottom: '8px', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-caption-default)' }}>
            Thumbnail (100x100)
          </p>
          <Image 
            src={imageUrl} 
            width={100} 
            height={100} 
            style={{ objectFit: 'cover' }} 
            alt="Thumbnail example" 
          />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const GameCardPreview = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '48px', backgroundColor: 'var(--colors-surface-background)' }}>
        <div style={{
          maxWidth: '360px',
          padding: '16px',
          backgroundColor: 'var(--colors-surface-primary)',
          borderRadius: 'var(--borders-radius-large)',
          boxShadow: 'var(--effects-shadows-medium)',
          border: '1px solid var(--colors-border-subtle)'
        }}>
          <Image 
            src={imageUrl} 
            width="100%" 
            height={200}
            style={{ marginBottom: '16px' }}
            alt="Cyber Nebula Game"
          />
          <h3 style={{ 
            marginTop: 0, 
            marginBottom: '8px', 
            fontSize: 'var(--typography-sizes-heading-h6)',
            color: 'var(--colors-text-primary)'
          }}>
            Cyber Nebula
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: 'var(--typography-sizes-body-small)', 
            color: 'var(--colors-text-secondary)',
            lineHeight: '1.5'
          }}>
            Explore the vast digital landscapes of the CloudHop universe in this immersive new title available on GameHub.
          </p>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};