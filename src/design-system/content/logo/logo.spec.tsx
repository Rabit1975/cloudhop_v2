import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Logo } from './logo.js';

describe('Logo', () => {
  it('should render the default logo with name', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    const nameElement = screen.getByText('CloudHop');
    expect(nameElement).toBeInTheDocument();
  });

  it('should render the logo with a slogan', () => {
    render(
      <MemoryRouter>
        <Logo slogan="Test Slogan" />
      </MemoryRouter>
    );
    const sloganElement = screen.getByText('Test Slogan');
    expect(sloganElement).toBeInTheDocument();
  });

  it('should render only the logo icon in minimal mode', () => {
    render(
      <MemoryRouter>
        <Logo minimal />
      </MemoryRouter>
    );
    const nameElement = screen.queryByText('CloudHop');
    expect(nameElement).toBeNull();
  });
});