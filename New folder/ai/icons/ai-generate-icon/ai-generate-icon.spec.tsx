import React from 'react';
import { render } from '@testing-library/react';
import { AiGenerateIcon } from './ai-generate-icon.js';

describe('AiGenerateIcon', () => {
  it('should render the icon with default size and color', () => {
    const { container } = render(<AiGenerateIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('width')).toBe('24');
    expect(svgElement?.getAttribute('height')).toBe('24');
  });

  it('should render the icon with a custom size', () => {
    const { container } = render(<AiGenerateIcon size={32} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement?.getAttribute('width')).toBe('32');
    expect(svgElement?.getAttribute('height')).toBe('32');
  });

  it('should apply a custom class name to the icon', () => {
    const customClassName = 'custom-icon-class';
    const { container } = render(<AiGenerateIcon className={customClassName} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement?.classList.contains(customClassName)).toBe(true);
  });
});