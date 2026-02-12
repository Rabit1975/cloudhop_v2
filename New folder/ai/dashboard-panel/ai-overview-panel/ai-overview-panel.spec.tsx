import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { AiOverviewPanel } from './ai-overview-panel.js';
import styles from './ai-overview-panel.module.scss';

describe('AiOverviewPanel', () => {
  it('should render the default title and description', () => {
    const { container } = render(
      <MockProvider>
        <AiOverviewPanel />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.panel}`)).toBeInTheDocument();
  });

  it('should render the custom title and description', () => {
    const { container } = render(
      <MockProvider>
        <AiOverviewPanel title="Custom Title" description="Custom description" />
      </MockProvider>
    );

    expect(container.textContent).toContain('Custom Title');
    expect(container.textContent).toContain('Custom description');
  });

  it('should render the Open AI Hub button', () => {
    const { container } = render(
      <MockProvider>
        <AiOverviewPanel />
      </MockProvider>
    );

    expect(container.textContent).toContain('Open AI Hub');
  });
});