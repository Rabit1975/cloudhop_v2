import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from './button.js';
import styles from './button.module.scss';

describe('Button', () => {
  it('should render children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const rendered = getByText('Click me');
    expect(rendered).toBeTruthy();
  });

  it('should handle onClick event', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render as a link when href is provided', () => {
    const { container } = render(
      <MemoryRouter>
        <Button href="/some-link">Go to link</Button>
      </MemoryRouter>
    );
    const link = container.querySelector('a');
    expect(link).toHaveClass(styles.button);
  });
});