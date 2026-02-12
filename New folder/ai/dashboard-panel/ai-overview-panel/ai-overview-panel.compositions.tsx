import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { AiOverviewPanel } from './ai-overview-panel.js';

export const DefaultPanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '360px', height: '420px', backgroundColor: 'var(--colors-surface-background)' }}>
          <AiOverviewPanel />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const DarkModePanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '32px', 
          maxWidth: '360px', 
          height: '420px', 
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          backgroundSize: 'cover'
        }}>
          <AiOverviewPanel />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const CustomContent = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '360px', height: '420px', backgroundColor: 'var(--colors-surface-background)' }}>
          <AiOverviewPanel 
            title="Generative Suite" 
            description="Access your recent generations and start new projects with our advanced models."
          />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};