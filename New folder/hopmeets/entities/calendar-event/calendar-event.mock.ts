import { CalendarEvent } from './calendar-event.js';
import { PlainCalendarEvent } from './calendar-event-type.js';

export function createMockCalendarEvent(override: Partial<PlainCalendarEvent> = {}): CalendarEvent {
  const defaultEvent: PlainCalendarEvent = {
    id: `evt-${  Math.random().toString(36).substring(2, 9)}`,
    title: 'Design Review',
    description: 'Reviewing the latest designs for the dashboard.',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    attendees: ['user-1', 'user-2'],
    location: 'Virtual',
    meetingId: `mtg-${  Math.random().toString(36).substring(2, 9)}`,
    ...override,
  };

  return CalendarEvent.from(defaultEvent);
}

export function mockCalendarEvents() {
  return [
    createMockCalendarEvent({
      id: 'evt-101',
      title: 'Weekly Team Sync',
      description: 'Weekly synchronization meeting for the engineering team.',
      startTime: '2023-11-01T09:00:00Z',
      endTime: '2023-11-01T10:00:00Z',
      attendees: ['alice', 'bob', 'charlie'],
      meetingId: 'mtg-alpha'
    }),
    createMockCalendarEvent({
      id: 'evt-102',
      title: 'Product Launch Planning',
      startTime: '2023-11-02T14:00:00Z',
      endTime: '2023-11-02T15:30:00Z',
      attendees: ['alice', 'dave'],
      location: 'Room 404',
      meetingId: undefined
    }),
    createMockCalendarEvent({
      id: 'evt-103',
      title: 'One on One',
      startTime: '2023-11-03T11:00:00Z',
      endTime: '2023-11-03T11:30:00Z',
      attendees: ['bob', 'eve'],
      description: 'Monthly career development discussion.',
      meetingId: 'mtg-beta'
    })
  ];
}