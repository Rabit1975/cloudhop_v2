import React from 'react';
import { render } from '@testing-library/react';
import { EditIcon } from './edit-icon.js';
import styles from './edit-icon.module.scss';

describe('EditIcon', () => {
  it('should render the EditIcon component with default size', () => {
    const { container } = render(<EditIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('width')).toBe('24');
    expect(svgElement?.getAttribute('height')).toBe('24');
  });

  it('should apply the editIcon class', () => {
    const { container } = render(<EditIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement?.classList.contains(styles.editIcon)).toBe(true);
  });

  it('should render the EditIcon component with a custom size', () => {
    const { container } = render(<EditIcon size={32} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('width')).toBe('32');
    expect(svgElement?.getAttribute('height')).toBe('32');
  });
});