import React from 'react';
import { render } from '@testing-library/react';
import { Event } from './event.js';

describe('Event Component', () => {
  it('should render the event icon with default size and color', () => {
    const { container } = render(<Event />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('width')).toBe('24');
    expect(svgElement?.getAttribute('height')).toBe('24');
  });

  it('should render the event icon with a specified size', () => {
    const { container } = render(<Event size={32} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement?.getAttribute('width')).toBe('32');
    expect(svgElement?.getAttribute('height')).toBe('32');
  });

  it('should apply the event class name', () => {
    const { container } = render(<Event />);
    const svgElement = container.querySelector('svg');
    expect(svgElement?.classList.contains('event')).toBe(true);
  });
});