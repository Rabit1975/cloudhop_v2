import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import type { HopmeetsCalendarIntegration } from '@cloudrabbit/hopmeets.hooks.use-calendar-events';
import { CalendarSyncSettings } from './calendar-sync-settings.js';
import styles from './calendar-sync-settings.module.scss';

const mockIntegrations: HopmeetsCalendarIntegration[] = [
  {
    id: '1',
    userId: 'user-123',
    provider: 'google',
    email: 'alice.w@example.com',
    connectedAt: new Date('2023-10-15').toISOString(),
  },
];

describe('CalendarSyncSettings', () => {
  it('should render calendar synchronization title', () => {
    const { container } = render(
      <MockProvider>
        <CalendarSyncSettings mockIntegrations={mockIntegrations} />
      </MockProvider>
    );

    const titleElement = container.querySelector(`.${styles.title}`);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render connected calendars section', () => {
    const { container } = render(
      <MockProvider>
        <CalendarSyncSettings mockIntegrations={mockIntegrations} />
      </MockProvider>
    );
    const connectedCalendarsTitle = container.querySelector(`.${styles.sectionTitle}`);
    expect(connectedCalendarsTitle).toBeInTheDocument();
  });

  it('should render a disconnect button', () => {
    render(
      <MockProvider>
        <CalendarSyncSettings mockIntegrations={mockIntegrations} />
      </MockProvider>
    );
    const disconnectButton = screen.getByRole('button', { name: /disconnect/i });
    expect(disconnectButton).toBeInTheDocument();
  });
});