import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Link } from './link.js';
import styles from './link.module.scss';

describe('Link Component', () => {
  it('should render an internal link with the correct text and href', () => {
    render(
      <MemoryRouter>
        <Link href="/test">Test Link</Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/test');
  });

  it('should render an external link with the correct text and href', () => {
    render(
      <MemoryRouter>
        <Link href="https://example.com" external>
          External Link
        </Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByText('External Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('https://example.com');
    expect(linkElement.getAttribute('target')).toBe('_blank');
    expect(linkElement.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should call onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(
      <MemoryRouter>
        <Link href="/test" onClick={onClick}>
          Clickable Link
        </Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Clickable Link');
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply disabled styles when disabled is true', () => {
    render(
      <MemoryRouter>
        <Link href="/disabled" disabled>
          Disabled Link
        </Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Disabled Link');
    expect(linkElement).toHaveClass(styles.disabled);
  });

  it('should not have default styles when noStyles is true', () => {
    render(
      <MemoryRouter>
        <Link href="/no-styles" noStyles>
          No Styles Link
        </Link>
      </MemoryRouter>
    );
    const linkElement = screen.getByText('No Styles Link');
    expect(linkElement).not.toHaveClass(styles.link);
  });
});