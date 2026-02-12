import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import type { HopmeetsCalendarIntegration } from '@cloudrabbit/hopmeets.hooks.use-calendar-events';
import { CalendarSyncSettings } from './calendar-sync-settings.js';

const mockIntegrations: HopmeetsCalendarIntegration[] = [
  {
    id: '1',
    userId: 'user-123',
    provider: 'google',
    email: 'alice.w@example.com',
    connectedAt: new Date('2023-10-15').toISOString(),
  },
  {
    id: '2',
    userId: 'user-123',
    provider: 'outlook',
    email: 'alice.work@corporate.com',
    connectedAt: new Date('2023-11-02').toISOString(),
  },
];

export const BasicUsage = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--colors-surface-background)' }}>
          <CalendarSyncSettings mockIntegrations={mockIntegrations} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const EmptyState = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--colors-surface-background)' }}>
          <CalendarSyncSettings mockIntegrations={[]} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const DarkModeSettings = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '40px', 
          display: 'flex', 
          justifyContent: 'center',
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '100vh',
          backgroundImage: 'var(--effects-gradients-nebula)',
          backgroundSize: 'cover'
        }}>
          <CalendarSyncSettings mockIntegrations={mockIntegrations} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const SingleIntegration = () => {
  const singleMock: HopmeetsCalendarIntegration[] = [
    {
      id: '3',
      userId: 'user-456',
      provider: 'apple',
      email: 'designer@icloud.com',
      connectedAt: new Date('2024-01-20').toISOString(),
    }
  ];

  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--colors-surface-background)' }}>
          <CalendarSyncSettings mockIntegrations={singleMock} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};