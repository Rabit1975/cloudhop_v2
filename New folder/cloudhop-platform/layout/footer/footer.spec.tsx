import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Footer } from './footer.js';
import styles from './footer.module.scss';

describe('Footer Component', () => {
  it('should render the copyright text', () => {
    render(
      <MockProvider>
        <Footer copyright="© 2024 CloudHop" />
      </MockProvider>
    );
    const copyrightElement = screen.getByText(/© 2024 CloudHop/i);
    expect(copyrightElement).toBeInTheDocument();
  });

  it('should render the link groups', () => {
    const linkGroups = [
      {
        title: 'Platform',
        links: [{ label: 'HopHub', href: '/hophub' }],
      },
    ];
    render(
      <MockProvider>
        <Footer linkGroups={linkGroups} />
      </MockProvider>
    );
    const linkGroupTitle = screen.getByText(/Platform/i);
    expect(linkGroupTitle).toBeInTheDocument();

    const link = screen.getByText(/HopHub/i);
    expect(link).toBeInTheDocument();
  });

  it('should render the footer with the correct class', () => {
    const { container } = render(
      <MockProvider>
        <Footer />
      </MockProvider>
    );
    const footerElement = container.querySelector(`.${styles.footer}`);
    expect(footerElement).toBeInTheDocument();
  });
});