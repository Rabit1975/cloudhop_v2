import { MeetingRoom } from './meeting-room.js';

describe('MeetingRoom', () => {
  it('should create a MeetingRoom instance from a plain object', () => {
    const plainObject = {
      id: '123',
      name: 'Test Room',
      capacity: 10,
      isPrivate: false,
      ownerId: 'owner-1',
      currentMeetingId: 'meeting-1',
    };

    const meetingRoom = MeetingRoom.from(plainObject);

    expect(meetingRoom).toBeInstanceOf(MeetingRoom);
    expect(meetingRoom.id).toBe(plainObject.id);
    expect(meetingRoom.name).toBe(plainObject.name);
  });

  it('should serialize a MeetingRoom instance to a plain object', () => {
    const meetingRoom = new MeetingRoom('123', 'Test Room', 10, false, 'owner-1', 'meeting-1');
    const plainObject = meetingRoom.toObject();

    expect(plainObject).toEqual({
      id: '123',
      name: 'Test Room',
      capacity: 10,
      isPrivate: false,
      ownerId: 'owner-1',
      currentMeetingId: 'meeting-1',
    });
  });
});