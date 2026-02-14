import React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './spinner.js';
import styles from './spinner.module.scss';

describe('Spinner', () => {
  it('should render a spinner with default props', () => {
    const { container } = render(<Spinner />);
    const spinnerContainer = container.querySelector(`.${styles.spinnerContainer}`);
    expect(spinnerContainer).toBeInTheDocument();
  });

  it('should render a spinner with the specified size', () => {
    const { container } = render(<Spinner size="large" />);
    const spinnerContainer = container.querySelector(`.${styles.spinnerContainer}`);
    expect(spinnerContainer).toHaveClass(styles.large);
  });

  it('should render a spinner with the specified variant', () => {
    const { container } = render(<Spinner variant="secondary" />);
    const spinnerContainer = container.querySelector(`.${styles.spinnerContainer}`);
    expect(spinnerContainer).toHaveClass(styles.secondary);
  });
});