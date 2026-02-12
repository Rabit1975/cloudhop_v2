import { PresenceStatus } from './presence-status.js';

export function mockPresenceStatuses() {
  return [
    PresenceStatus.from({
      userId: 'user-01',
      status: 'online',
      lastSeenAt: new Date().toISOString(),
    }),
    PresenceStatus.from({
      userId: 'user-02',
      status: 'away',
      lastSeenAt: new Date(Date.now() - 3600000).toISOString(),
    }),
    PresenceStatus.from({
      userId: 'user-03',
      status: 'busy',
      lastSeenAt: new Date(Date.now() - 1800000).toISOString(),
    }),
    PresenceStatus.from({
      userId: 'user-04',
      status: 'offline',
      lastSeenAt: new Date(Date.now() - 86400000).toISOString(),
    }),
  ];
}