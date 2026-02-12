import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockUserProfile } from '@cloudrabbit/people.entities.user-profile';
import { UserCard } from './user-card.js';
import styles from './user-card.module.scss';

describe('UserCard', () => {
  const mockUser = mockUserProfile({
    firstName: 'Test',
    lastName: 'User',
    presenceStatus: 'online',
    statusMessage: 'Test Status',
  });

  it('should render user full name', () => {
    render(
      <MockProvider>
        <UserCard user={mockUser} />
      </MockProvider>
    );
    const nameElement = screen.getByText('Test User');
    expect(nameElement).toBeInTheDocument();
  });

  it('should render status message when provided', () => {
    render(
      <MockProvider>
        <UserCard user={mockUser} />
      </MockProvider>
    );
    // Target the visible status message span, not the hidden tooltip content
    const statusElement = screen.getByText('Test Status', { selector: `span.${styles.text}` });
    expect(statusElement).toBeInTheDocument();
  });

  it('should apply the card class', () => {
    render(
      <MockProvider>
        <UserCard user={mockUser} />
      </MockProvider>
    );
    const cardElement = screen.getByRole('link');
    expect(cardElement).toHaveClass(styles.userCardLink);
  });
});