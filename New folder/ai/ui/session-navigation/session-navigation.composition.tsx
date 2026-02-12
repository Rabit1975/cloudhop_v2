import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockSessions } from '@cloudrabbit/ai.entities.session';
import { SessionNavigation } from './session-navigation.js';

export const BasicNavigation = () => {
  const sessions = mockSessions();

  return (
    <MockProvider>
      <div style={{ width: '300px', height: '600px', border: '1px solid var(--colors-border-subtle)' }}>
        <SessionNavigation mockData={sessions} />
      </div>
    </MockProvider>
  );
};

export const EmptyHistory = () => {
  return (
    <MockProvider>
      <div style={{ width: '300px', height: '600px', border: '1px solid var(--colors-border-subtle)' }}>
        <SessionNavigation mockData={[]} />
      </div>
    </MockProvider>
  );
};

export const WithActiveSession = () => {
  const sessions = mockSessions();
  const activeSessionId = sessions[0]?.id;

  return (
    <MockProvider>
      <MemoryRouter initialEntries={[`/ai?sessionId=${activeSessionId}`]}>
        <div style={{ width: '300px', height: '600px', border: '1px solid var(--colors-border-subtle)' }}>
          <SessionNavigation mockData={sessions} />
        </div>
      </MemoryRouter>
    </MockProvider>
  );
};

export const LoadingState = () => {
  return (
    <MockProvider>
      <div style={{ width: '300px', height: '600px', border: '1px solid var(--colors-border-subtle)' }}>
        <SessionNavigation />
      </div>
    </MockProvider>
  );
};