import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { SpacesAiSettings } from './spaces-ai-settings.js';

export const BasicUsage = () => {
  return (
    <CloudrabbitTheme>
      <MockProvider>
        <div style={{ height: '100vh', width: '100%', overflowY: 'auto' }}>
          <SpacesAiSettings />
        </div>
      </MockProvider>
    </CloudrabbitTheme>
  );
};

export const DarkTheme = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <MockProvider>
        <div style={{ height: '100vh', width: '100%', overflowY: 'auto' }}>
          <SpacesAiSettings />
        </div>
      </MockProvider>
    </CloudrabbitTheme>
  );
};

export const InModalContext = () => {
  return (
    <CloudrabbitTheme>
      <MockProvider>
        <div style={{
          padding: '40px',
          backgroundColor: 'var(--colors-overlay)',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '900px',
            maxHeight: '80vh',
            overflowY: 'auto',
            backgroundColor: 'var(--colors-surface-background)',
            borderRadius: 'var(--borders-radius-large)',
            boxShadow: 'var(--effects-shadows-xl)',
            padding: '24px'
          }}>
            <SpacesAiSettings />
          </div>
        </div>
      </MockProvider>
    </CloudrabbitTheme>
  );
};

export const WithPreloadedDataMock = () => {
  // Simulating fetching state visually by wrapping in MockProvider 
  // which might provide loading states depending on configuration
  return (
    <CloudrabbitTheme>
      <MockProvider>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '300px 1fr', 
          height: '100vh',
          backgroundColor: 'var(--colors-surface-background)'
        }}>
          <div style={{ 
            borderRight: '1px solid var(--colors-border-subtle)', 
            padding: '24px',
            background: 'var(--colors-surface-secondary)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '14px', textTransform: 'uppercase', color: 'var(--colors-text-secondary)' }}>Settings Menu</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '8px 12px', cursor: 'pointer', color: 'var(--colors-text-primary)' }}>General</div>
              <div style={{ padding: '8px 12px', cursor: 'pointer', color: 'var(--colors-text-primary)' }}>Members</div>
              <div style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: 'var(--colors-surface-primary)', color: 'var(--colors-primary-default)', fontWeight: 'bold' }}>AI Intelligence</div>
              <div style={{ padding: '8px 12px', cursor: 'pointer', color: 'var(--colors-text-primary)' }}>Integrations</div>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
              <img 
                src="https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_sleek_ui_conc_0_1770835140576.png" 
                alt="AI Promo" 
                style={{ width: '100%', borderRadius: '8px', opacity: 0.8 }}
              />
            </div>
          </div>
          <div style={{ overflowY: 'auto' }}>
            <SpacesAiSettings />
          </div>
        </div>
      </MockProvider>
    </CloudrabbitTheme>
  );
};