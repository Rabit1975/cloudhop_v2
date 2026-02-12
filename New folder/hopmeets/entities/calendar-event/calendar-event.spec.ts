import { CalendarEvent } from './calendar-event.js';
import { createMockCalendarEvent } from './calendar-event.mock.js';

describe('CalendarEvent', () => {
  it('should create a CalendarEvent instance', () => {
    const event = createMockCalendarEvent();
    expect(event).toBeInstanceOf(CalendarEvent);
  });

  it('should serialize to a plain object', () => {
    const event = createMockCalendarEvent();
    const plainObject = event.toObject();

    expect(plainObject.id).toBeDefined();
    expect(plainObject.title).toBeDefined();
    expect(plainObject.startTime).toBeDefined();
    expect(plainObject.endTime).toBeDefined();
  });

  it('has a CalendarEvent.from() method', () => {
    expect(CalendarEvent.from).toBeTruthy();
  });
});