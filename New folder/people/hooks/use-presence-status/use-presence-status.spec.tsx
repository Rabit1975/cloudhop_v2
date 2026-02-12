import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PresenceStatus } from '@cloudrabbit/people.entities.presence-status';
import { vi, type Mock } from 'vitest';
import * as ApolloClientOriginal from '@apollo/client';

// Import the mocked versions after vi.mock has been set up
import { useQuery, useMutation } from '@apollo/client';
import { usePresenceStatus, GET_USER_PRESENCE } from './use-presence-status.js';

// Mock @apollo/client using async importOriginal to correctly mock named exports
vi.mock('@apollo/client', async (importOriginal) => {
  const actual = await importOriginal<typeof ApolloClientOriginal>();
  return {
    ...actual, // Re-export all original exports (like gql)
    useQuery: vi.fn(), // Mock useQuery
    useMutation: vi.fn(), // Mock useMutation
  };
}); // Import GET_USER_PRESENCE for testing

const mockPresenceStatus = new PresenceStatus("123", "online", new Date().toISOString());

// Now useQuery and useMutation will be the mocked functions from vitest
const mockedUseQuery = useQuery as Mock;
const mockedUseMutation = useMutation as Mock;

describe('usePresenceStatus', () => {
  beforeEach(() => {
    // Reset mocks before each test to ensure a clean state
    vi.clearAllMocks();

    // Set a default mock implementation for useQuery
    mockedUseQuery.mockReturnValue({
      data: { peopleGetUserPresence: mockPresenceStatus.toObject() },
      loading: false,
      error: undefined,
      refetch: vi.fn(() => Promise.resolve({ data: { peopleGetUserPresence: mockPresenceStatus.toObject() } })),
    });

    // Set a default mock implementation for useMutation, as it's part of the global mock
    mockedUseMutation.mockReturnValue([vi.fn(), { loading: false, error: undefined }]);
  });

  it('should return the presence status when data is available', () => {
    const { result } = renderHook(() => usePresenceStatus('123'), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    // Verify useQuery was called with the correct arguments
    expect(mockedUseQuery).toHaveBeenCalledWith(
      GET_USER_PRESENCE, // Use the actual query object
      expect.objectContaining({ variables: { userId: '123' }, skip: false })
    );

    expect(result.current.presence?.status).toBe('online');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should handle mock data correctly and skip the query', async () => {
    const mockData = new PresenceStatus('mockUserId', 'away', new Date().toISOString());
    const { result } = renderHook(() => usePresenceStatus('123', { mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    // Ensure useQuery was called, but with skip: true because mockData is provided
    expect(mockedUseQuery).toHaveBeenCalledWith(
      GET_USER_PRESENCE,
      expect.objectContaining({ variables: { userId: '123' }, skip: true })
    );

    expect(result.current.presence).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();

    // Check that refetch returns the mock data
    await act(async () => {
      const refetchResult = await result.current.refetch();
      // The refetch for mockData returns a structure similar to useQuery's return for data
      expect(refetchResult.data.peopleGetUserPresence).toEqual(mockData.toObject());
    });
  });

  it('should skip the query when skip option is true', () => {
    renderHook(() => usePresenceStatus('123', { skip: true }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    // Verify useQuery was called with skip: true
    expect(mockedUseQuery).toHaveBeenCalledWith(
      GET_USER_PRESENCE, // Use the actual query object
      expect.objectContaining({ skip: true })
    );
  });
});