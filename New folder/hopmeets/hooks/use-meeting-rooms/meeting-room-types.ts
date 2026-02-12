import { MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';

/**
 * Options for creating a new meeting room.
 */
export type CreateMeetingRoomOptions = {
  /**
   * The name of the meeting room.
   */
  name: string;
  
  /**
   * Description of the room.
   */
  description?: string;
  
  /**
   * The maximum number of participants.
   * Note: This may be limited by the backend implementation.
   */
  capacity?: number;
  
  /**
   * Whether the room is private.
   */
  isPrivate?: boolean;
};

/**
 * Options for updating an existing meeting room.
 */
export type UpdateMeetingRoomOptions = {
  /**
   * The ID of the meeting room to update.
   */
  id: string;
  
  /**
   * The new name of the meeting room.
   */
  name?: string;
  
  /**
   * The new description.
   */
  description?: string;
  
  /**
   * Whether the room is private.
   */
  isPrivate?: boolean;
};

/**
 * Result shape for meeting room queries.
 */
export type MeetingRoomQueryResult = {
  /**
   * The fetched meeting room or list of rooms.
   */
  data?: MeetingRoom | MeetingRoom[];
  
  /**
   * Loading state.
   */
  loading: boolean;
  
  /**
   * Error object if any.
   */
  error?: Error;
};