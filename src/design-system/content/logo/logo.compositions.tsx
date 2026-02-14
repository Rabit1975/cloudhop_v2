import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Logo } from './logo.js';

export const BasicLogo = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
          <Logo />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const BrandVariations = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--colors-surface-background)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xl)'
        }}>
          <div>
            <h4 style={{ margin: '0 0 var(--spacing-medium) 0', color: 'var(--colors-text-secondary)' }}>With Slogan</h4>
            <Logo name="CloudHop" slogan="Modular Operating System" size={40} />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 var(--spacing-medium) 0', color: 'var(--colors-text-secondary)' }}>Large Size</h4>
            <Logo name="CloudHop" size={64} />
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const MinimalMode = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--colors-surface-background)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xl)'
        }}>
           <Logo minimal size={24} />
           <Logo minimal size={48} />
           <Logo minimal size={64} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const NebulaHeaderUsage = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          backgroundColor: 'var(--colors-surface-nebula)', // Fallback if nebula gradient is background-image
          backgroundImage: 'var(--effects-gradients-nebula)',
          padding: 'var(--spacing-none)',
          minHeight: '200px'
        }}>
          <header style={{
            height: 'var(--layout-header-height)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--spacing-xl)',
            borderBottom: '1px solid var(--colors-border-subtle)',
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'var(--effects-blur-small)'
          }}>
            <Logo 
              name="CloudHop" 
              slogan="Space" 
              size={32} 
            />
            <nav style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--spacing-medium)' }}>
              <span style={{ color: 'var(--colors-text-secondary)' }}>HopHub</span>
              <span style={{ color: 'var(--colors-text-secondary)' }}>GameHub</span>
            </nav>
          </header>
          <div style={{ padding: 'var(--spacing-xl)', color: 'var(--colors-text-primary)' }}>
            <h1 style={{ fontSize: 'var(--typography-sizes-heading-h2)' }}>Welcome to the Platform</h1>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};