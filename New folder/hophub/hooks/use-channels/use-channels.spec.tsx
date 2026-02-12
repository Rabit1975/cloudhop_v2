import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockChannels } from '@cloudrabbit/hophub.entities.channel';
import { useChannels } from './use-channels.js';

it('should return channels', () => {
  const { result } = renderHook(() => useChannels({ mockData: mockChannels() }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.channels).toEqual(mockChannels());
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

it('should refetch channels', async () => {
  const { result } = renderHook(() => useChannels({ mockData: mockChannels() }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  const prevChannels = result.current.channels;

  act(() => {
    result.current.refetch();
  });

  expect(result.current.channels).toBe(prevChannels);
});