import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockNotifications } from '@cloudrabbit/hophub.entities.notification';
import { NotificationPanel } from './notification-panel.js';
import styles from './notification-panel.module.scss';

describe('NotificationPanel', () => {
  it('should render the title', () => {
    const { container } = render(
      <MockProvider>
        <NotificationPanel title="Test Notifications" mockData={mockNotifications()} />
      </MockProvider>
    );
    const titleElement = container.querySelector(`.${styles.title}`);
    expect(titleElement).toHaveTextContent('Test Notifications');
  });

  it('should render a list of notifications', () => {
    const { container } = render(
      <MockProvider>
        <NotificationPanel mockData={mockNotifications()} />
      </MockProvider>
    );

    const list = container.querySelector(`.${styles.list}`);
    expect(list).toBeInTheDocument();
    expect(container.querySelectorAll(`.${styles.notificationItem}`).length).toBe(mockNotifications().length);
  });

  it('should render "No new notifications" when the notification list is empty', () => {
    const { container } = render(
      <MockProvider>
        <NotificationPanel mockData={[]} />
      </MockProvider>
    );
    const emptyState = container.querySelector(`.${styles.emptyState}`);
    expect(emptyState).toHaveTextContent('No new notifications');
  });
});