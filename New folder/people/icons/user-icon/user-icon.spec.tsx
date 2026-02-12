import React from 'react';
import { render } from '@testing-library/react';
import { UserIcon } from './user-icon.js';

describe('UserIcon', () => {
  it('should render the UserIcon component with default props', () => {
    const { container } = render(<UserIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
  });

  it('should render the UserIcon component with a custom size', () => {
    const { container } = render(<UserIcon size={32} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });

  it('should render the UserIcon component with a custom color', () => {
    const { container } = render(<UserIcon color="red" />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('fill', 'red');
  });
});