import { PlainCalendarEvent } from './calendar-event-type.js';

export class CalendarEvent {
  constructor(
    /**
     * Unique identifier for the event.
     */
    readonly id: string,

    /**
     * Title of the event.
     */
    readonly title: string,

    /**
     * Start time of the event in ISO 8601 format.
     */
    readonly startTime: string,

    /**
     * End time of the event in ISO 8601 format.
     */
    readonly endTime: string,

    /**
     * List of user IDs or emails attending the event.
     */
    readonly attendees: string[] = [],

    /**
     * Detailed description of the event.
     */
    readonly description?: string,

    /**
     * Physical or virtual location of the event.
     */
    readonly location?: string,

    /**
     * Optional reference to a meeting entity ID.
     */
    readonly meetingId?: string
  ) {}

  /**
   * Serializes the CalendarEvent into a plain object.
   */
  toObject(): PlainCalendarEvent {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      attendees: this.attendees,
      location: this.location,
      meetingId: this.meetingId,
    };
  }

  /**
   * Creates a CalendarEvent instance from a plain object.
   */
  static from(plain: PlainCalendarEvent) {
    return new CalendarEvent(
      plain.id,
      plain.title,
      plain.startTime,
      plain.endTime,
      plain.attendees,
      plain.description,
      plain.location,
      plain.meetingId
    );
  }
}