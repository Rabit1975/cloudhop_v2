import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Spinner } from './spinner.js';

export const BasicSpinnerUsage = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '48px', 
        padding: '48px',
        alignItems: 'flex-start',
        backgroundColor: 'var(--colors-surface-background)'
      }}>
        <div>
          <h3 style={{ 
            marginBottom: '24px', 
            color: 'var(--colors-text-primary)',
            fontFamily: 'var(--typography-font-family)'
          }}>
            Spinner Sizes
          </h3>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Spinner size="small" />
            <Spinner size="medium" />
            <Spinner size="large" />
            <Spinner size="xl" />
          </div>
        </div>
        
        <div>
          <h3 style={{ 
            marginBottom: '24px', 
            color: 'var(--colors-text-primary)',
            fontFamily: 'var(--typography-font-family)'
          }}>
            Theme Variants
          </h3>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Spinner variant="primary" />
            <Spinner variant="secondary" />
            <Spinner variant="neutral" />
            <Spinner variant="nebula" size="large" />
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const ContentOverlay = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <div style={{ 
          position: 'relative', 
          width: '320px', 
          padding: '24px',
          borderRadius: 'var(--borders-radius-large)',
          backgroundColor: 'var(--colors-surface-primary)',
          boxShadow: 'var(--effects-shadows-medium)',
          overflow: 'hidden',
          border: '1px solid var(--colors-border-subtle)'
        }}>
          <div style={{ 
            height: '24px', 
            width: '60%', 
            backgroundColor: 'var(--colors-surface-secondary)', 
            marginBottom: '16px',
            borderRadius: '4px'
          }} />
          <div style={{ 
            height: '16px', 
            width: '100%', 
            backgroundColor: 'var(--colors-surface-secondary)', 
            marginBottom: '8px',
            borderRadius: '4px'
          }} />
          <div style={{ 
            height: '16px', 
            width: '80%', 
            backgroundColor: 'var(--colors-surface-secondary)', 
            borderRadius: '4px',
            marginBottom: '24px'
          }} />
           <div style={{ 
            height: '40px', 
            width: '100px', 
            backgroundColor: 'var(--colors-surface-secondary)', 
            borderRadius: '20px'
          }} />
          
          <Spinner overlay variant="primary" size="large" />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const NebulaRichMediaLoading = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ padding: '32px' }}>
        <div style={{ 
          position: 'relative', 
          maxWidth: '800px', 
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: 'var(--borders-radius-large)',
          overflow: 'hidden',
          boxShadow: 'var(--effects-shadows-xl)'
        }}>
          <img 
            src="https://storage.googleapis.com/bit-generated-images/images/image_a_minimalist__subtle__and_visu_0_1770832612475.png" 
            alt="Nebula Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '32px',
            left: '32px',
            zIndex: 'var(--interactions-z-index-base)',
            color: 'var(--colors-text-inverse)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            padding: '16px 24px',
            borderRadius: 'var(--borders-radius-full)',
            backdropFilter: 'var(--effects-blur-medium)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Spinner variant="nebula" size="medium" />
            <span style={{ 
              fontWeight: 'var(--typography-font-weight-medium)',
              fontSize: 'var(--typography-sizes-body-default)',
              letterSpacing: 'var(--typography-letter-spacing-wide)'
            }}>
              INITIALIZING SPACE...
            </span>
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};