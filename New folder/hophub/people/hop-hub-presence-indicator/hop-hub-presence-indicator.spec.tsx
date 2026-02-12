import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { HopHubPresenceIndicator } from './hop-hub-presence-indicator.js';

describe('HopHubPresenceIndicator', () => {
  it('should render a presence indicator with the correct status', () => {
    const { container } = render(
      <MockProvider>
        <HopHubPresenceIndicator status="online" />
      </MockProvider>
    );
    const presenceIndicator = container.querySelector('.presenceIndicator');
    expect(presenceIndicator).toBeInTheDocument();
    expect(presenceIndicator).toHaveClass('online');
  });

  it('should render a presence indicator with the correct size', () => {
    const { container } = render(
      <MockProvider>
        <HopHubPresenceIndicator status="online" size="small" />
      </MockProvider>
    );
    const presenceIndicator = container.querySelector('.presenceIndicator');
    expect(presenceIndicator).toBeInTheDocument();
    expect(presenceIndicator).toHaveClass('small');
  });

  it('should render a presence indicator with a border', () => {
    const { container } = render(
      <MockProvider>
        <HopHubPresenceIndicator status="online" />
      </MockProvider>
    );
    const presenceIndicator = container.querySelector('.hopHubPresenceIndicator');
    expect(presenceIndicator).toBeInTheDocument();
  });
});