import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockMessages } from '@cloudrabbit/ai.entities.message';
import { useMessages } from './use-messages.js';

it('should return the list of messages', () => {
  const { result } = renderHook(() => useMessages({ sessionId: '123', mockData: mockMessages() }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    )
  });

  expect(result.current.messages.length).toBe(3);
});

it('should return loading state', () => {
  const { result } = renderHook(() => useMessages({ sessionId: '123', skip: true }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    )
  });

  expect(result.current.loading).toBe(false);
});