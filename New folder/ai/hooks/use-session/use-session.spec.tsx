import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockSession } from '@cloudrabbit/ai.entities.session';
import { useSession } from './use-session.js';

it('should return the session data', () => {
  const mockData = mockSession();
  const { result } = renderHook(() => useSession({ sessionId: mockData.id }, { mockData }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.session?.id).toBe(mockData.id);
});

it('should handle loading state', () => {
  const { result } = renderHook(() => useSession({ sessionId: '123' }, { mockData: mockSession() }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.loading).toBe(false);
});

it('should handle error state', () => {
  const { result } = renderHook(() => useSession({ sessionId: '123' }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });
  expect(result.current.error).toBeUndefined();
});