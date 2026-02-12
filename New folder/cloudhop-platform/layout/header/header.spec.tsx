import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header.js';
import type { HeaderLink } from './header-link-type.js';

describe('Header', () => {
  it('should render the logo with default name', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logoElement = screen.getByText('CloudHop');
    expect(logoElement).toBeInTheDocument();
  });

  it('should render the logo with a custom name', () => {
    const customName = 'Custom Brand';
    render(
      <MemoryRouter>
        <Header name={customName} />
      </MemoryRouter>
    );
    const logoElement = screen.getByText(customName);
    expect(logoElement).toBeInTheDocument();
  });

  it('should render navigation links when authenticated', () => {
    const links: HeaderLink[] = [
      { label: 'Dashboard', href: '/dashboard', authenticated: true },
    ];
    render(
      <MemoryRouter>
        <Header links={links} authenticated={true} />
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Dashboard');
    expect(linkElement).toBeInTheDocument();
  });

  it('should not render navigation links when not authenticated', () => {
    const links: HeaderLink[] = [
      { label: 'Dashboard', href: '/dashboard', authenticated: true },
    ];
    render(
      <MemoryRouter>
        <Header links={links} authenticated={false} />
      </MemoryRouter>
    );
    const linkElement = screen.queryByText('Dashboard');
    expect(linkElement).toBeNull();
  });

  it('should render actions components', () => {
    const MockAction = () => <div data-testid="mock-action">Mock Action</div>;
    render(
      <MemoryRouter>
        <Header actions={[MockAction]} />
      </MemoryRouter>
    );
    const actionElement = screen.getByTestId('mock-action');
    expect(actionElement).toBeInTheDocument();
  });

  it('should apply className to the header', () => {
    const className = 'custom-header-class';
    render(
      <MemoryRouter>
        <Header className={className} />
      </MemoryRouter>
    );
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass(className);
  });

  it('should render children content', () => {
    const childrenContent = <div data-testid="children-content">Children Content</div>;
    render(
      <MemoryRouter>
        <Header>{childrenContent}</Header>
      </MemoryRouter>
    );
    const childrenElement = screen.getByTestId('children-content');
    expect(childrenElement).toBeInTheDocument();
  });
});