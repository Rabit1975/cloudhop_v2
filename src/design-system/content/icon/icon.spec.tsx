import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from './icon.js';
import styles from './icon.module.scss';

describe('Icon', () => {
  it('should render the icon with default size and color', () => {
    render(
      <Icon>
        <path d="M0 0 L 24 24" />
      </Icon>
    );
    const svgElement = screen.getByRole('img');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('fill', 'currentColor');
  });

  it('should apply custom size and color', () => {
    render(
      <Icon size={32} color="red">
        <path d="M0 0 L 24 24" />
      </Icon>
    );
    const svgElement = screen.getByRole('img');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
    expect(svgElement).toHaveAttribute('fill', 'red');
  });

  it('should apply custom class', () => {
    render(
      <Icon className="custom-class">
        <path d="M0 0 L 24 24" />
      </Icon>
    );
    const svgElement = screen.getByRole('img');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('custom-class');
    expect(svgElement).toHaveClass(styles.icon);
  });
});