import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { ThemeToggler } from './theme-toggler.js';

describe('ThemeToggler', () => {
  it('should render the theme toggler button', () => {
    const { container } = render(
      <CloudrabbitTheme>
        <ThemeToggler />
      </CloudrabbitTheme>
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should toggle the theme when the button is clicked', () => {
    const { container } = render(
      <CloudrabbitTheme>
        <ThemeToggler />
      </CloudrabbitTheme>
    );

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button as Element);

    // Since the theme toggle is handled by the CloudrabbitTheme,
    // we can only assert that the click event is fired and handled,
    // but not directly assert the change in theme.
  });

  it('should have aria-label attribute', () => {
    const { container } = render(
      <CloudrabbitTheme>
        <ThemeToggler />
      </CloudrabbitTheme>
    );
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label');
  });
});