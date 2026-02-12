import { Meeting } from './meeting.js';
import { mockMeeting } from './meeting.mock.js';

describe('Meeting', () => {
  it('should create a Meeting instance', () => {
    const meeting = mockMeeting();
    expect(meeting).toBeInstanceOf(Meeting);
  });

  it('should return true if the meeting is scheduled', () => {
    const meeting = mockMeeting({ status: 'scheduled' });
    expect(meeting.isScheduled).toBe(true);
  });

  it('should return meetingRoomId as accessCode if available', () => {
    const meeting = mockMeeting({ accessCode: '123456' });
    expect(meeting.meetingRoomId).toBe('123456');
  });
});