import React from 'react';
import { render } from '@testing-library/react';
import { AddSpaceIcon } from './add-space-icon.js';

describe('AddSpaceIcon', () => {
  it('should render the AddSpaceIcon component', () => {
    const { container } = render(<AddSpaceIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render the AddSpaceIcon component with specified size', () => {
    const { container } = render(<AddSpaceIcon size={32} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });

  it('should render the AddSpaceIcon component with specified color', () => {
    const { container } = render(<AddSpaceIcon color="var(--colors-primary-default)" />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('fill', 'var(--colors-primary-default)');
  });
});