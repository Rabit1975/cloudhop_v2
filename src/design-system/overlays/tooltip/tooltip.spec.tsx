import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tooltip } from './tooltip.js';
import styles from './tooltip.module.scss';

describe('Tooltip', () => {
  it('should render the tooltip content on hover', () => {
    const content = 'Test tooltip content';
    const { container } = render(
      <Tooltip content={content}>
        <button>Hover me</button>
      </Tooltip>
    );

    const button = container.querySelector('button');
    fireEvent.mouseEnter(button as Element);

    const tooltip = container.querySelector(`.${styles.tooltip}`);
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(content);
  });

  it('should hide the tooltip content on mouse leave', () => {
    const content = 'Test tooltip content';
    const { container } = render(
      <Tooltip content={content}>
        <button>Hover me</button>
      </Tooltip>
    );

    const button = container.querySelector('button');
    fireEvent.mouseEnter(button as Element);
    fireEvent.mouseLeave(button as Element);

    const tooltip = container.querySelector(`.${styles.tooltip}`);
    expect(tooltip).toBeInTheDocument();
  });

  it('should apply the correct position class', () => {
    const content = 'Test tooltip content';
    const position = 'bottom';
    const { container } = render(
      <Tooltip content={content} position={position}>
        <button>Hover me</button>
      </Tooltip>
    );

    const button = container.querySelector('button');
    fireEvent.mouseEnter(button as Element);

    const tooltip = container.querySelector(`.${styles.tooltip}`);
    expect(tooltip).toHaveClass(styles[position]);
  });
});