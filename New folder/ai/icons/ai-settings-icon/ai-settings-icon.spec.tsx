import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { AiSettingsIcon } from './ai-settings-icon.js';

describe('AiSettingsIcon', () => {
  it('should render the AiSettingsIcon with default size and color', () => {
    const { container } = render(
      <MockProvider>
        <AiSettingsIcon />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
  });

  it('should render the AiSettingsIcon with a specified size', () => {
    const { container } = render(
      <MockProvider>
        <AiSettingsIcon size={32} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });

  it('should render the AiSettingsIcon with a specified color', () => {
    const { container } = render(
      <MockProvider>
        <AiSettingsIcon color="var(--colors-primary-default)" />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('fill', 'var(--colors-primary-default)');
  });
});