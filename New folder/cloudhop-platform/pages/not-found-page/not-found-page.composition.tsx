import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { NotFoundPage } from './not-found-page.js';

export const DefaultNotFoundPage = () => {
  return (
    <MockProvider>
      <NotFoundPage />
    </MockProvider>
  );
};

export const DarkModeNotFoundPage = () => {
  return (
    <MockProvider noTheme>
      <CloudrabbitTheme initialTheme="dark">
        <NotFoundPage />
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const ConstrainedContainer = () => {
  return (
    <MockProvider>
      <div style={{ 
        height: '600px', 
        width: '100%', 
        overflow: 'hidden', 
        border: '1px solid var(--colors-border-default)',
        position: 'relative'
      }}>
        <NotFoundPage style={{ minHeight: '100%' }} />
      </div>
    </MockProvider>
  );
};