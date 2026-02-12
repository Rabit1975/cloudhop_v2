import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockMeetingRooms, MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';
import React from 'react'; // Import React for JSX
import { useMeetingRooms } from './use-meeting-rooms.js';

it('should return meeting rooms', () => {
  const mockData: MeetingRoom[] = mockMeetingRooms();

  const { result } = renderHook(() => useMeetingRooms({ mockData }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  expect(result.current.meetingRooms).toEqual(mockData);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

it('should handle loading state when skipped', () => {
  const { result } = renderHook(() => useMeetingRooms({ skip: true }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    ),
  });

  // When skip is true, the query won't run, so loading should be false.
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
  expect(result.current.meetingRooms).toEqual([]);
});