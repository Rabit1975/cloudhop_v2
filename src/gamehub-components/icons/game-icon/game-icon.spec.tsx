import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { GameIcon } from './game-icon.js';

describe('GameIcon', () => {
  it('should render the GameIcon component', () => {
    const { container } = render(
      <MockProvider>
        <GameIcon />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render the GameIcon with the specified size', () => {
    const size = 32;
    const { container } = render(
      <MockProvider>
        <GameIcon size={size} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', size.toString());
    expect(svgElement).toHaveAttribute('height', size.toString());
  });

  it('should render the GameIcon with the specified color', () => {
    const color = 'var(--colors-primary-default)';
    const { container } = render(
      <MockProvider>
        <GameIcon color={color} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('fill', color);
  });
});