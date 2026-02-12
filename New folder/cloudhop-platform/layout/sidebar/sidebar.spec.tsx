import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Sidebar } from './sidebar.js';
import type { NavItem } from './nav-item-type.js';
import styles from './sidebar.module.scss';

const navItems: NavItem[] = [
  { name: 'hophub', label: 'HopHub', href: '/hophub' },
  { name: 'hopmeets', label: 'HopMeets', href: '/hopmeets' },
];

const mockUser = {
  id: '123',
  userId: 'user-123',
  email: 'test@cloudhop.com',
  username: 'CloudHopper',
  imageUrl: 'https://example.com/avatar.png'
};

describe('Sidebar', () => {
  it('should not render when user is not authenticated', () => {
    const { container } = render(
      <MockProvider>
          <Sidebar items={navItems} mockUser={null} />
      </MockProvider>
    );
    expect(container.querySelector(`.${styles.sidebar}`)).not.toBeInTheDocument();
  });

  it('should render the sidebar with navigation items', () => {
    const { container } = render(
      <MockProvider>
          <Sidebar items={navItems} mockUser={mockUser} />
      </MockProvider>
    );

    const sidebarElement = container.querySelector(`.${styles.sidebar}`);
    expect(sidebarElement).toBeInTheDocument();

    const linkElements = container.querySelectorAll(`.${styles.link}`);
    expect(linkElements.length).toBe(navItems.length);
  });

  it('should toggle the sidebar when the toggle button is clicked', () => {
    const { container } = render(
      <MockProvider>
          <Sidebar items={navItems} mockUser={mockUser} />
      </MockProvider>
    );

    const toggleButton = container.querySelector(`.${styles.toggle}`) as HTMLButtonElement;
    expect(toggleButton).toBeInTheDocument();

    expect(container.querySelector(`.${styles.sidebar}`)).toHaveClass('isOpen');
    fireEvent.click(toggleButton);
    expect(container.querySelector(`.${styles.sidebar}`)).not.toHaveClass('isOpen');
  });
});