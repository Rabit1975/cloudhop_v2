import React from 'react';
import { render } from '@testing-library/react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { AiIcon } from './ai-icon.js';

describe('AiIcon', () => {
  it('should render the AI icon with default size and color', () => {
    const { container } = render(
      <CloudrabbitTheme>
        <AiIcon />
      </CloudrabbitTheme>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('fill', 'currentColor');
  });

  it('should render the AI icon with specified size', () => {
    const { container } = render(
      <CloudrabbitTheme>
        <AiIcon size={32} />
      </CloudrabbitTheme>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });

  it('should render the AI icon with specified color', () => {
    const { container } = render(
      <CloudrabbitTheme>
        <AiIcon color="var(--colors-primary-default)" />
      </CloudrabbitTheme>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('fill', 'var(--colors-primary-default)');
  });
});