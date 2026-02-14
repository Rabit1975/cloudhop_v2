import React from 'react';
import { render } from '@testing-library/react';
import { Badge } from './badge.js';
import styles from './badge.module.scss';

describe('Badge', () => {
  it('should render the badge with the provided label', () => {
    const { getByText } = render(<Badge label="Test Badge" />);
    const badgeElement = getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });

  it('should apply the correct size class', () => {
    const { container } = render(<Badge label="Test Badge" size="lg" />);
    const badgeElement = container.querySelector(`.${styles.badge}`);
    expect(badgeElement).toHaveClass(styles.lg);
  });

  it('should apply the correct variant class', () => {
    const { container } = render(<Badge label="Test Badge" variant="solid" />);
    const badgeElement = container.querySelector(`.${styles.badge}`);
    expect(badgeElement).toHaveClass(styles.solid);
  });
});