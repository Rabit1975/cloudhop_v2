import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PanelCard } from '@cloudrabbit/cloudhop-platform.ui.panel-card';
import { Dashboard } from './dashboard.js';
import styles from './dashboard.module.scss';
import type { DashboardPanelType } from './dashboard-panel-type.js';

const MockPanelComponent = () => <PanelCard title="Mock Panel">Mock Content</PanelCard>;

describe('Dashboard Component', () => {
  it('should render placeholder panels when no panels are provided', () => {
    const { container } = render(
      <MockProvider>
        <Dashboard />
      </MockProvider>
    );

    const emptyState = container.querySelector(`.${styles.emptyState}`);
    expect(emptyState).toBeNull();

    const welcomePanel = container.querySelector(`[title="Welcome to CloudHop"]`);
    expect(welcomePanel).toBeDefined();
    const loadingPanel = container.querySelector(`[title="Recent Activity"]`);
    expect(loadingPanel).toBeDefined();
    const systemStatusPanel = container.querySelector(`[title="System Status"]`);
    expect(systemStatusPanel).toBeDefined();
  });

  it('should render provided panels', () => {
    const panels: DashboardPanelType[] = [
      { name: 'mock', component: MockPanelComponent },
    ];

    const { container } = render(
      <MockProvider>
        <Dashboard panels={panels} />
      </MockProvider>
    );

    const mockPanel = container.querySelector(`[title="Mock Panel"]`);
    expect(mockPanel).toBeDefined();
  });

  it('should apply a custom class name to the dashboard container', () => {
    const customClassName = 'custom-dashboard';
    const { container } = render(
      <MockProvider>
        <Dashboard className={customClassName} />
      </MockProvider>
    );

    const dashboardContainer = container.querySelector(`.${customClassName}`);
    expect(dashboardContainer).toBeDefined();
  });
});