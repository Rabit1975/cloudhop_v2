import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { SpacesActivityPanel } from './spaces-activity-panel.js';
import styles from './spaces-activity-panel.module.scss';

const mockSpaces = [
  Space.from({
    id: 'space-1',
    name: 'Nebula Explorers',
    description: 'Exploring the digital universe.',
    ownerId: 'user-1',
    members: Array(120).fill('user'),
    visibility: 'public',
    createdAt: new Date().toISOString(),
  }),
];

describe('SpacesActivityPanel', () => {
  it('should render the panel title', () => {
    render(
      <MockProvider>
        <SpacesActivityPanel mockData={mockSpaces} />
      </MockProvider>
    );
    const titleElement = screen.getByText('Spaces Activity');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render a list of spaces when data is available', () => {
    render(
      <MockProvider>
        <SpacesActivityPanel mockData={mockSpaces} />
      </MockProvider>
    );
    const spaceNameElement = screen.getByText('Nebula Explorers');
    expect(spaceNameElement).toBeInTheDocument();
  });

  it('should render "No recent activity found" when there are no spaces', () => {
    render(
      <MockProvider>
        <SpacesActivityPanel mockData={[]} />
      </MockProvider>
    );
    const emptyTextElement = screen.getByText('No recent activity found.');
    expect(emptyTextElement).toBeInTheDocument();
  });
});