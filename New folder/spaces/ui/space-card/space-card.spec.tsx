import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { SpaceCard } from './space-card.js';
import styles from './space-card.module.scss';

const mockSpace = Space.from({
  id: 'test-space',
  name: 'Test Space',
  description: 'A test space for testing purposes.',
  ownerId: 'test-owner',
  members: ['user1', 'user2'],
  visibility: 'public',
  createdAt: new Date().toISOString(),
});

describe('SpaceCard', () => {
  it('should render the space name and description', () => {
    render(
      <MockProvider>
        <SpaceCard space={mockSpace} />
      </MockProvider>
    );

    expect(screen.getByText('Test Space')).toBeInTheDocument();
    expect(screen.getByText('A test space for testing purposes.')).toBeInTheDocument();
  });

  it('should render the correct visibility badge', () => {
    render(
      <MockProvider>
        <SpaceCard space={mockSpace} />
      </MockProvider>
    );

    const badge = screen.getByText('public');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(styles.public);
  });

  it('should render the correct member count', () => {
    render(
      <MockProvider>
        <SpaceCard space={mockSpace} />
      </MockProvider>
    );

    expect(screen.getByText('2 members')).toBeInTheDocument();
  });
});