import { DirectMessage } from './direct-message.js';

export function mockDirectMessages(): DirectMessage[] {
  return [
    DirectMessage.from({
      id: 'dm-1',
      participantIds: ['user-01', 'user-02'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    DirectMessage.from({
      id: 'dm-2',
      participantIds: ['user-01', 'user-03'],
      createdAt: new Date().toISOString(),
    }),
    DirectMessage.from({
      id: 'dm-3',
      participantIds: ['user-04', 'user-05', 'user-06'],
      createdAt: new Date().toISOString(),
    }),
  ];
}