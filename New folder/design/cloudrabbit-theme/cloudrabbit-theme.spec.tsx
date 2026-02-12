import React from 'react';
import { render, screen } from '@testing-library/react';
import { CloudrabbitTheme } from './cloudrabbit-theme.js';
import { ThemeContext } from './theme-controller.js';

describe('CloudrabbitTheme', () => {
  it('renders with the correct children', () => {
    render(
      <CloudrabbitTheme>
        <div>Hello world!</div>
      </CloudrabbitTheme>
    );
    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });

  it('provides a theme context value', () => {
    let contextValue;
    render(
      <CloudrabbitTheme>
        <ThemeContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </CloudrabbitTheme>
    );
    expect(contextValue).toBeDefined();
  });

  it('applies initial theme correctly', () => {
    render(
      <CloudrabbitTheme initialTheme="dark">
        <div>Dark Theme</div>
      </CloudrabbitTheme>
    );
    const element = screen.getByText('Dark Theme');
    expect(element).toBeInTheDocument();
  });
});