import { MeetingRoom, PlainMeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';

// Type definition matching the GraphQL schema response for HopmeetsMeeting
export type HopmeetsMeetingGraphql = {
  id: string;
  topic: string;
  description?: string;
  startTime: string;
  endTime: string;
  hostId: string;
  status: 'scheduled' | 'live' | 'ended' | 'canceled';
  accessCode?: string;
  joinUrl: string;
  createdAt: string;
  updatedAt?: string;
};

/**
 * Adapts the GraphQL HopmeetsMeeting shape to the MeetingRoom entity.
 * Maps 'topic' to 'name', 'hostId' to 'ownerId', etc.
 */
export function adaptToMeetingRoom(data: HopmeetsMeetingGraphql): MeetingRoom {
  const plainRoom: PlainMeetingRoom = {
    id: data.id,
    name: data.topic,
    capacity: 50, // Default capacity as schema does not provide it
    isPrivate: Boolean(data.accessCode),
    ownerId: data.hostId,
    currentMeetingId: data.status === 'live' ? data.id : undefined,
  };

  return MeetingRoom.from(plainRoom);
}