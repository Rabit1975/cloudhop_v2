import { v4 } from 'uuid';
import { Notification } from './notification.js';
import { PlainNotification } from './notification-type.js';

export const mockPlainNotifications: PlainNotification[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    userId: 'user-01',
    type: 'new_message',
    message: 'You have a new message from Sarah',
    link: '/hophub/dm/sarah',
    read: false,
    timestamp: '2023-10-27T10:00:00Z',
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    userId: 'user-01',
    type: 'channel_invite',
    message: 'You were invited to join #general',
    link: '/hophub/channels/general',
    read: true,
    timestamp: '2023-10-26T15:30:00Z',
  },
  {
    id: '6ba7b811-9dad-11d1-80b4-00c04fd430c9',
    userId: 'user-02',
    type: 'system_alert',
    message: 'Maintenance scheduled for tonight',
    read: false,
    timestamp: '2023-10-28T09:00:00Z',
  },
];

export function mockNotifications(overrides?: Partial<PlainNotification>[]): Notification[] {
  return mockPlainNotifications.map((plain, index) => {
    const override = overrides?.[index] || {};
    return Notification.from({ 
      ...plain, 
      ...override,
      // Ensure unique IDs for generated mocks unless explicitly overridden
      id: override.id || v4() 
    });
  });
}