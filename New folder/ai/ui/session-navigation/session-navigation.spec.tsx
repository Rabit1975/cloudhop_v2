import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockSessions, mockSession } from '@cloudrabbit/ai.entities.session';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { SessionNavigation } from './session-navigation.js';
import styles from './session-navigation.module.scss';

describe('SessionNavigation', () => {
  it('should render "No recent sessions" when there are no sessions', () => {
    render(
      <MockProvider>
        <SessionNavigation mockData={[]} />
      </MockProvider>
    );
    const emptyState = screen.getByText('No recent sessions');
    expect(emptyState).toBeInTheDocument();
  });

  it('should render a list of sessions', () => {
    // Create mock sessions that will fallback to "Untitled Session"
    const sessions = [
      mockSession({ id: 's1', name: undefined, createdAt: new Date().toISOString() }),
      mockSession({ id: 's2', name: undefined, createdAt: new Date().toISOString() }),
      mockSession({ id: 's3', name: undefined, createdAt: new Date().toISOString() }),
    ];
    render(
      <MockProvider>
        <SessionNavigation mockData={sessions} />
      </MockProvider>
    );
    // Now this should correctly find "Untitled Session" for each item
    const sessionLinks = screen.getAllByText('Untitled Session');
    expect(sessionLinks.length).toBe(sessions.length);
  });

  it('should render active class to selected session', () => {
    const sessions = mockSessions();
    const activeSessionId = sessions[0].id;
    render(
      // Provide noRouter prop as MemoryRouter is explicitly provided here
      <MockProvider noRouter>
        <MemoryRouter initialEntries={[`/ai?sessionId=${activeSessionId}`]}>
          <SessionNavigation mockData={sessions} />
        </MemoryRouter>
      </MockProvider>
    );
    // Find the active session item by its name, then check its class
    const activeSessionName = sessions[0].name || 'Untitled Session'; // Ensure we use the actual displayed name
    const activeSession = screen.getByText(activeSessionName).closest('a');
    expect(activeSession).toBeInTheDocument();
    expect(activeSession).toHaveClass(styles.sessionItem);
    expect(activeSession).toHaveClass(styles.active);
  });
});