import { v4 } from 'uuid';
import { Channel } from './channel.js';
import { PlainChannel } from './channel-type.js';

export const mockChannelList: PlainChannel[] = [
  {
    id: 'channel-1',
    name: 'General',
    description: 'The general channel for everyone.',
    type: 'public',
    ownerId: 'user-1',
    memberIds: ['user-1', 'user-2', 'user-3'],
    createdAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 'channel-2',
    name: 'Announcements',
    description: 'Official announcements.',
    type: 'public',
    ownerId: 'admin-1',
    memberIds: ['user-1', 'user-2'],
    createdAt: '2023-01-02T12:00:00Z',
  },
  {
    id: 'channel-3',
    name: 'Secret Project',
    description: 'Top secret discussions.',
    type: 'private',
    ownerId: 'user-1',
    memberIds: ['user-1'],
    createdAt: '2023-01-03T12:00:00Z',
  },
];

export function createMockChannel(overrides?: Partial<PlainChannel>): Channel {
  const defaultChannel = mockChannelList[0];
  const plain: PlainChannel = {
    ...defaultChannel,
    id: v4(),
    ...overrides,
  };
  return Channel.from(plain);
}

export function mockChannels(): Channel[] {
  return mockChannelList.map((plain) => Channel.from(plain));
}