import { v4 as uuid } from 'uuid';
import { Meeting } from './meeting.js';
import { PlainMeeting } from './meeting-type.js';

export function mockMeeting(overrides: Partial<PlainMeeting> = {}): Meeting {
  const defaultMeeting: PlainMeeting = {
    id: uuid(),
    topic: 'Weekly Team Sync',
    description: 'Syncing on project progress and updates.',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    hostId: uuid(),
    participants: [
      { userId: uuid(), role: 'host' },
      { userId: uuid(), role: 'attendee' },
    ],
    status: 'scheduled',
    joinUrl: `https://meet.cloudhop.com/${uuid()}`,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
  return Meeting.from(defaultMeeting);
}

export function mockMeetings(count = 3): Meeting[] {
  return Array.from({ length: count }).map(() => mockMeeting());
}