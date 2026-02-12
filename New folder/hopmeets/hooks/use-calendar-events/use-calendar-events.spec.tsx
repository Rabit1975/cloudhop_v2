import { renderHook, act, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import React from 'react';

import { CalendarEvent, mockCalendarEvents } from '@cloudrabbit/hopmeets.entities.calendar-event';
import { useGetCalendarEvent } from './use-get-calendar-event.js';
import { useListCalendarEvents , LIST_MEETINGS_QUERY } from './use-list-calendar-events.js';
import { useCreateCalendarEvent , CREATE_MEETING_MUTATION } from './use-create-calendar-event.js';
import { useUpdateCalendarEvent , UPDATE_MEETING_MUTATION } from './use-update-calendar-event.js';
import { useDeleteCalendarEvent , DELETE_MEETING_MUTATION } from './use-delete-calendar-event.js';
import {
  HopmeetsCreateMeetingOptions,
  HopmeetsUpdateMeetingOptions,
  HopmeetsMeeting,
  HopmeetsMeetingParticipant,
  HopmeetsMeetingStatus,
} from './calendar-event-types.js';

// Import mutation/query definitions to use in mocks
import { GET_MEETING_QUERY } from './use-get-calendar-event.js';


// A simple wrapper for MockedProvider to pass specific mocks
const TestApolloWrapper = ({ children, mocks = [] }: { children: React.ReactNode, mocks?: any[] }) => (
  <MockedProvider mocks={mocks} addTypename={false} showWarnings={false}>
    {children}
  </MockedProvider>
);

// Define common mock data structures as needed for mutation results
const mockParticipant: HopmeetsMeetingParticipant = {
  userId: 'user1',
  role: 'attendee',
};

// --- Tests for useGetCalendarEvent ---
describe('useGetCalendarEvent', () => {
  it('should return the calendar event when meetingId is provided', () => {
    // Assuming mockCalendarEvents returns CalendarEvent[] and we need a single event for mockData
    const mockEvent = mockCalendarEvents()[0];
    const { result } = renderHook(() => useGetCalendarEvent({ meetingId: '123', mockData: mockEvent }), {
      wrapper: ({ children }) => <TestApolloWrapper>{children}</TestApolloWrapper>, // No specific GQL mocks needed here due to mockData
    });

    expect(result.current.event).toBe(mockEvent);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should return loading false and event undefined when meetingId is not provided', () => {
    const { result } = renderHook(() => useGetCalendarEvent({ meetingId: '' }), {
      wrapper: ({ children }) => <TestApolloWrapper>{children}</TestApolloWrapper>, // No specific GQL mocks needed here due to skip logic
    });

    expect(result.current.event).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });
});

// --- Tests for useListCalendarEvents ---
describe('useListCalendarEvents', () => {
  it('should return a list of calendar events', () => {
    // Assuming mockCalendarEvents returns CalendarEvent[] directly, which useListCalendarEvents expects
    const mockEvents = mockCalendarEvents();
    const { result } = renderHook(() => useListCalendarEvents({ mockData: mockEvents }), {
      wrapper: ({ children }) => <TestApolloWrapper>{children}</TestApolloWrapper>, // No specific GQL mocks needed here due to mockData
    });

    expect(result.current.events).toEqual(mockEvents);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should return loading false and events empty when no mock data is provided and no filters', async () => {
    const mocks = [
      {
        request: {
          query: LIST_MEETINGS_QUERY,
          variables: {
            offset: undefined,
            limit: undefined,
            status: undefined,
            participantUserId: undefined,
            start: '',
            end: '',
          },
        },
        result: {
          data: {
            hopmeetsListMeetings: [],
          },
        },
      },
    ];

    const { result } = renderHook(() => useListCalendarEvents(), {
      wrapper: ({ children }) => <TestApolloWrapper mocks={mocks}>{children}</TestApolloWrapper>,
    });

    // Initially, loading should be true while the query is being executed
    expect(result.current.loading).toBe(true);

    // Wait for the query to resolve and the hook to update
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.events).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});

// --- Tests for useCreateCalendarEvent ---
describe('useCreateCalendarEvent', () => {
  it('should call createEvent and return a CalendarEvent', async () => {
    const createEventOptions: HopmeetsCreateMeetingOptions = {
      topic: 'Test Meeting',
      startTime: '2024-03-15T10:00:00.000Z',
      endTime: '2024-03-15T11:00:00.000Z',
      // description, participantUserIds, accessCode are optional and will be undefined if not provided
    };

    const mocks = [
      {
        request: {
          query: CREATE_MEETING_MUTATION,
          variables: {
            topic: createEventOptions.topic,
            description: undefined,
            startTime: createEventOptions.startTime,
            endTime: createEventOptions.endTime,
            participantUserIds: undefined,
            accessCode: undefined,
          },
        },
        result: {
          data: {
            hopmeetsCreateMeeting: {
              id: 'new-mock-id-create',
              topic: createEventOptions.topic,
              description: undefined,
              startTime: createEventOptions.startTime,
              endTime: createEventOptions.endTime,
              participants: [], // Must match HopmeetsMeeting structure
              joinUrl: 'https://new.mock.join.url/create',
              __typename: 'HopmeetsMeeting',
            },
          },
        },
      },
    ];

    const { result } = renderHook(() => useCreateCalendarEvent(), {
      wrapper: ({ children }) => <TestApolloWrapper mocks={mocks}>{children}</TestApolloWrapper>,
    });

    let calendarEvent: CalendarEvent | undefined;

    await act(async () => {
      calendarEvent = await result.current.createEvent(createEventOptions);
    });

    expect(calendarEvent).toBeDefined();
    expect(calendarEvent?.title).toBe(createEventOptions.topic);
    expect(calendarEvent?.id).toBe('new-mock-id-create');
  });
});

// --- Tests for useUpdateCalendarEvent ---
describe('useUpdateCalendarEvent', () => {
  it('should call updateEvent and return a CalendarEvent', async () => {
    const updateEventOptions: HopmeetsUpdateMeetingOptions = {
      meetingId: '123',
      topic: 'Updated Meeting',
      startTime: '2024-03-16T10:00:00.000Z',
      endTime: '2024-03-16T11:00:00.000Z',
    };

    const mocks = [
      {
        request: {
          query: UPDATE_MEETING_MUTATION,
          variables: {
            meetingId: updateEventOptions.meetingId,
            topic: updateEventOptions.topic,
            description: undefined,
            startTime: updateEventOptions.startTime,
            endTime: updateEventOptions.endTime,
            participantUserIds: undefined,
            accessCode: undefined,
            status: undefined,
          },
        },
        result: {
          data: {
            hopmeetsUpdateMeeting: {
              id: updateEventOptions.meetingId,
              topic: updateEventOptions.topic,
              description: undefined,
              startTime: updateEventOptions.startTime,
              endTime: updateEventOptions.endTime,
              participants: [], // Must match HopmeetsMeeting structure
              joinUrl: 'https://mock.join.url/update',
              status: 'scheduled' as HopmeetsMeetingStatus, // Required in HopmeetsMeeting response structure
              __typename: 'HopmeetsMeeting',
            },
          },
        },
      },
    ];

    const { result } = renderHook(() => useUpdateCalendarEvent(), {
      wrapper: ({ children }) => <TestApolloWrapper mocks={mocks}>{children}</TestApolloWrapper>,
    });

    let calendarEvent: CalendarEvent | undefined;

    await act(async () => {
      calendarEvent = await result.current.updateEvent(updateEventOptions);
    });

    expect(calendarEvent).toBeDefined();
    expect(calendarEvent?.title).toBe(updateEventOptions.topic);
    expect(calendarEvent?.id).toBe(updateEventOptions.meetingId);
  });
});

// --- Tests for useDeleteCalendarEvent ---
describe('useDeleteCalendarEvent', () => {
  it('should call deleteEvent and return true', async () => {
    const meetingIdToDelete = '123';
    const mocks = [
      {
        request: {
          query: DELETE_MEETING_MUTATION,
          variables: { meetingId: meetingIdToDelete },
        },
        result: {
          data: {
            hopmeetsDeleteMeeting: true,
          },
        },
      },
    ];

    const { result } = renderHook(() => useDeleteCalendarEvent(), {
      wrapper: ({ children }) => <TestApolloWrapper mocks={mocks}>{children}</TestApolloWrapper>,
    });

    let isDeleted: boolean | undefined;

    await act(async () => {
      isDeleted = await result.current.deleteEvent(meetingIdToDelete);
    });

    expect(isDeleted).toBe(true);
  });
});