import { v4 as uuid } from 'uuid';
import { MeetingRoom } from './meeting-room.js';
import { PlainMeetingRoom } from './meeting-room-type.js';

export function mockMeetingRooms(): MeetingRoom[] {
  return [
    MeetingRoom.from({
      id: uuid(),
      name: 'General Hangout',
      capacity: 50,
      isPrivate: false,
      ownerId: 'user-01',
      currentMeetingId: undefined,
    }),
    MeetingRoom.from({
      id: uuid(),
      name: 'Executive Board Room',
      capacity: 10,
      isPrivate: true,
      ownerId: 'user-02',
      currentMeetingId: 'meeting-active-01',
    }),
    MeetingRoom.from({
      id: uuid(),
      name: 'Design Workshop',
      capacity: 25,
      isPrivate: false,
      ownerId: 'user-03',
      currentMeetingId: undefined,
    }),
  ];
}