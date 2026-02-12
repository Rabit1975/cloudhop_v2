import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockPlainNotifications, Notification, type PlainNotification } from '@cloudrabbit/hophub.entities.notification';
import { MockedProvider } from '@apollo/client/testing';
import { DocumentNode } from 'graphql';
import { useNotifications, LIST_NOTIFICATIONS_QUERY } from './use-notifications.js';

// Helper to create a mock for the LIST_NOTIFICATIONS_QUERY
const createMockQuery = (notifications: PlainNotification[]) => ({
  request: {
    query: LIST_NOTIFICATIONS_QUERY,
  },
  result: {
    data: {
      hophubListNotifications: notifications,
    },
  },
});

it('should return notifications from mock data', () => {
  const mockData = mockPlainNotifications.map(n => Notification.from(n));
  const { result } = renderHook(() => useNotifications({ mockData }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.notifications).toEqual(mockData);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

it('should handle loading state when query is skipped', () => {
  const { result } = renderHook(() => useNotifications({ skip: true }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.loading).toBe(false);
});

it('should refetch notifications and update state', async () => {
  const initialNotifications = mockPlainNotifications.slice(0, 1);
  const refetchedNotifications = mockPlainNotifications.slice(0, 2);

  const mocks: any[] = [ // Apollo MockedProvider expects 'any[]' for mocks
    createMockQuery(initialNotifications), // Mock for the initial query
    createMockQuery(refetchedNotifications), // Mock for the refetch query
  ];

  const { result } = renderHook(() => useNotifications(), { // No mockData here, rely on Apollo
    wrapper: ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    ),
  });

  // Wait for the initial query to resolve
  await act(async () => {
    // A small delay to allow Apollo to process the initial query.
    await new Promise(resolve => setTimeout(resolve, 10)); // Arbitrary small delay
  });

  // After initial fetch
  expect(result.current.loading).toBe(false);
  expect(result.current.notifications.length).toBe(1);
  expect(result.current.notifications[0].id).toBe(initialNotifications[0].id);

  // Perform refetch
  await act(async () => {
    const refetchResult = await result.current.refetch();
    // The promise returned by refetch contains the data from that specific request
    expect(refetchResult).toBeDefined();
    expect(refetchResult.data.hophubListNotifications.length).toBe(2);
    expect(refetchResult.data.hophubListNotifications[0].id).toBe(refetchedNotifications[0].id);
  });

  // After refetch, the hook's state should reflect the new data from the network
  expect(result.current.loading).toBe(false);
  expect(result.current.notifications.length).toBe(2);
  expect(result.current.notifications[0].id).toBe(refetchedNotifications[0].id);
});