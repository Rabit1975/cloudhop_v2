import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './card.js';
import styles from './card.module.scss';

describe('Card', () => {
  it('should render children', () => {
    const { container } = render(
      <Card>
        <div>Test Content</div>
      </Card>
    );

    const content = container.querySelector('div');
    expect(content).toHaveTextContent('Test Content');
  });

  it('should render title', () => {
    render(<Card title="Test Title" />);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });

  it('should apply interactive class when interactive prop is true', () => {
    const { container } = render(<Card interactive />);
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass(styles.interactive);
  });
});