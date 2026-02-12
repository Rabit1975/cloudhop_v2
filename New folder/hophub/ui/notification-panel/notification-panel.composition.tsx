import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockNotifications } from '@cloudrabbit/hophub.entities.notification';
import { NotificationPanel } from './notification-panel.js';

export const BasicPanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--colors-surface-background)' }}>
          <NotificationPanel mockData={mockNotifications()} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const DarkThemePanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '40px', 
          display: 'flex', 
          justifyContent: 'center', 
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          minHeight: '600px',
          backgroundSize: 'cover'
        }}>
          <NotificationPanel 
            mockData={mockNotifications()} 
            title="Activity Feed" 
            style={{ height: 'fit-content' }} 
          />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const EmptyPanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--colors-surface-background)' }}>
          <NotificationPanel mockData={[]} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const WithNavigation = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--colors-surface-background)' }}>
          <NotificationPanel mockData={mockNotifications()} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};