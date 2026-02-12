import { PlainMeetingRoom } from './meeting-room-type.js';

export class MeetingRoom {
  constructor(
    /**
     * unique identifier for the meeting room.
     */
    readonly id: string,

    /**
     * name of the meeting room.
     */
    readonly name: string,

    /**
     * maximum number of participants allowed.
     */
    readonly capacity: number,

    /**
     * indicates if the room is private.
     */
    readonly isPrivate: boolean,

    /**
     * unique identifier of the room owner.
     */
    readonly ownerId: string,

    /**
     * unique identifier of the currently active meeting in the room, if any.
     */
    readonly currentMeetingId?: string
  ) {}

  /**
   * serialize the MeetingRoom into a plain object.
   */
  toObject(): PlainMeetingRoom {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      isPrivate: this.isPrivate,
      ownerId: this.ownerId,
      currentMeetingId: this.currentMeetingId,
    };
  }

  /**
   * create a MeetingRoom object from a plain object.
   */
  static from(plainMeetingRoom: PlainMeetingRoom): MeetingRoom {
    return new MeetingRoom(
      plainMeetingRoom.id,
      plainMeetingRoom.name,
      plainMeetingRoom.capacity,
      plainMeetingRoom.isPrivate,
      plainMeetingRoom.ownerId,
      plainMeetingRoom.currentMeetingId
    );
  }
}