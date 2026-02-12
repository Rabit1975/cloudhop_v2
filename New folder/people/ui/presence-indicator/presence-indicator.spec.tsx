import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PresenceIndicator } from './presence-indicator.js';
import styles from './presence-indicator.module.scss';

describe('PresenceIndicator', () => {
  it('should render with the correct status class', () => {
    const { container } = render(
      <MockProvider>
        <PresenceIndicator status="online" />
      </MockProvider>
    );
    const indicator = container.querySelector(`.${styles.presenceIndicator}`);
    expect(indicator).toHaveClass(styles.online);
  });

  it('should render with the correct size class', () => {
    const { container } = render(
      <MockProvider>
        <PresenceIndicator status="online" size="large" />
      </MockProvider>
    );
    const indicator = container.querySelector(`.${styles.presenceIndicator}`);
    expect(indicator).toHaveClass(styles.large);
  });

  it('should render with additional class names', () => {
    const { container } = render(
      <MockProvider>
        <PresenceIndicator status="online" className="test-class" />
      </MockProvider>
    );
    const indicator = container.querySelector('.test-class');
    expect(indicator).toBeInTheDocument();
  });
});