import { Notification } from './notification.js';
import { mockPlainNotifications } from './notification.mock.js';

describe('Notification', () => {
  it('should create a Notification instance from a plain object', () => {
    const plainNotification = mockPlainNotifications[0];
    const notification = Notification.from(plainNotification);

    expect(notification).toBeInstanceOf(Notification);
    expect(notification.id).toBe(plainNotification.id);
  });

  it('should serialize a Notification instance to a plain object', () => {
    const plainNotification = mockPlainNotifications[0];
    const notification = Notification.from(plainNotification);
    const serialized = notification.toObject();

    expect(serialized).toEqual(plainNotification);
  });
});