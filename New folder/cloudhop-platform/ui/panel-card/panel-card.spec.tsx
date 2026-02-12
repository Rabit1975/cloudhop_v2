import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PanelCard } from './panel-card.js';

describe('PanelCard', () => {
  it('should render the title', () => {
    render(
      <MockProvider>
        <PanelCard title="Test Panel">
          <div>Content</div>
        </PanelCard>
      </MockProvider>
    );

    const titleElement = screen.getByText('Test Panel');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the children', () => {
    render(
      <MockProvider>
        <PanelCard title="Test Panel">
          <div data-testid="content">Content</div>
        </PanelCard>
      </MockProvider>
    );

    const contentElement = screen.getByTestId('content');
    expect(contentElement).toBeInTheDocument();
  });

  it('should render loading state', () => {
    render(
      <MockProvider>
        <PanelCard title="Test Panel" loading>
          <div>Content</div>
        </PanelCard>
      </MockProvider>
    );

    const loadingText = screen.getByText('Loading module...');
    expect(loadingText).toBeInTheDocument();
  });
});