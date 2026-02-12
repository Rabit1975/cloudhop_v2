import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PlaylistAddIcon } from './playlist-add-icon.js';

describe('PlaylistAddIcon', () => {
  it('should render the PlaylistAddIcon component', () => {
    const { container } = render(
      <MockProvider>
        <PlaylistAddIcon />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render the PlaylistAddIcon with a specific size', () => {
    const size = 32;
    const { container } = render(
      <MockProvider>
        <PlaylistAddIcon size={size} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', size.toString());
    expect(svgElement).toHaveAttribute('height', size.toString());
  });

  it('should render the PlaylistAddIcon with a specific color', () => {
    const color = 'var(--colors-primary-default)';
    const { container } = render(
      <MockProvider>
        <PlaylistAddIcon color={color} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('fill', color);
  });
});