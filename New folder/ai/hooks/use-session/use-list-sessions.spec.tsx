import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockSessions } from '@cloudrabbit/ai.entities.session';
import { useListSessions } from './use-list-sessions.js';

it('should return a list of sessions', () => {
  const mockData = mockSessions();
  const { result } = renderHook(() => useListSessions({}, { mockData }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.sessions.length).toBe(mockData.length);
});

it('should handle the loading state', () => {
  const { result } = renderHook(() => useListSessions({}, { mockData: mockSessions() }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.loading).toBe(false);
});

it('should handle an error state', () => {
  const { result } = renderHook(() => useListSessions(), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });
  expect(result.current.error).toBeUndefined();
});