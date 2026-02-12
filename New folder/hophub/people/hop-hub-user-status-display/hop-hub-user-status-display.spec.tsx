import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { HopHubUserStatusDisplay } from './hop-hub-user-status-display.js';
import styles from './hop-hub-user-status-display.module.scss';

describe('HopHubUserStatusDisplay', () => {
  it('should render the status message', () => {
    const message = 'Test status message';
    const { container } = render(
      <MockProvider>
        <HopHubUserStatusDisplay message={message} />
      </MockProvider>
    );
    const statusMessageElement = container.querySelector(`.${styles.hopHubUserStatusDisplay}`);
    expect(statusMessageElement).toBeInTheDocument();
  });

  it('should not render if message is not provided', () => {
    const { container } = render(
      <MockProvider>
        <HopHubUserStatusDisplay />
      </MockProvider>
    );
    const statusMessageElement = container.querySelector(`.${styles.hopHubUserStatusDisplay}`);
    expect(statusMessageElement).toBeNull();
  });

  it('should apply custom class name', () => {
    const message = 'Test status message';
    const customClassName = 'custom-class';
    const { container } = render(
      <MockProvider>
        <HopHubUserStatusDisplay message={message} className={customClassName} />
      </MockProvider>
    );
    const statusMessageElement = container.querySelector(`.${customClassName}`);
    expect(statusMessageElement).toBeInTheDocument();
  });
});