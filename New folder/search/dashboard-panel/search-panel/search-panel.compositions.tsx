import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SearchPanel } from './search-panel.js';

export const BasicSearchPanel = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: '40px', 
          maxWidth: '500px', 
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '300px'
        }}>
          <SearchPanel />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeSearch = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '40px', 
          maxWidth: '500px', 
          minHeight: '400px',
          backgroundColor: 'var(--colors-surface-background)' 
        }}>
          <h3 style={{ color: 'var(--colors-text-primary)', marginBottom: '24px', marginTop: 0 }}>
            Dark Theme Dashboard
          </h3>
          <SearchPanel />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const SidebarSearchContext = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          display: 'flex', 
          height: '600px', 
          backgroundColor: 'var(--colors-surface-background)',
          fontFamily: 'var(--typography-font-family)'
        }}>
          <div style={{ 
            width: '320px', 
            borderRight: '1px solid var(--colors-border-subtle)',
            padding: '24px',
            backgroundColor: 'var(--colors-surface-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <SearchPanel placeholder="Quick find..." />
            
            <div style={{ color: 'var(--colors-text-secondary)', fontSize: '14px' }}>
              <div style={{ 
                textTransform: 'uppercase', 
                fontSize: '11px', 
                fontWeight: 'bold', 
                marginBottom: '12px',
                letterSpacing: '0.5px'
              }}>
                Recent Searches
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>#general</li>
                <li>Design System Assets</li>
                <li>Unity Integration Guide</li>
              </ul>
            </div>
          </div>
          <div style={{ flex: 1, padding: '40px' }}>
            <h1 style={{ 
              marginTop: 0, 
              color: 'var(--colors-text-primary)',
              fontSize: 'var(--typography-sizes-heading-h2)'
            }}>
              Welcome to CloudHop
            </h1>
            <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-large)' }}>
              Select a module or search to begin.
            </p>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};