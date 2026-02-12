import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { SpaceIcon } from './space-icon.js';

describe('SpaceIcon', () => {
  it('should render the SpaceIcon component', () => {
    const { container } = render(
      <MockProvider>
        <SpaceIcon />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should apply a custom size to the icon', () => {
    const { container } = render(
      <MockProvider>
        <SpaceIcon size={32} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });

  it('should apply a custom color to the icon', () => {
    const { container } = render(
      <MockProvider>
        <SpaceIcon color="var(--colors-primary-default)" />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('fill', 'var(--colors-primary-default)');
  });
});