export type PlainMeetingRoom = {
  /**
   * unique identifier for the meeting room.
   */
  id: string;

  /**
   * name of the meeting room.
   */
  name: string;

  /**
   * maximum number of participants allowed.
   */
  capacity: number;

  /**
   * indicates if the room is private.
   */
  isPrivate: boolean;

  /**
   * unique identifier of the room owner.
   */
  ownerId: string;

  /**
   * unique identifier of the currently active meeting in the room, if any.
   */
  currentMeetingId?: string;
};