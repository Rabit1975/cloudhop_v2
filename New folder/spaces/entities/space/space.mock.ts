import { Space } from './space.js';
import { PlainSpace } from './space-type.js';

export function createMockSpace(overrides?: Partial<PlainSpace>): Space {
  const defaultSpace: PlainSpace = {
    id: `space-${  Math.random().toString(36).substring(2, 9)}`,
    name: 'Creative Lounge',
    description: 'A space for creative minds to collaborate.',
    ownerId: 'user-01',
    members: ['user-01', 'user-02'],
    visibility: 'public',
    createdAt: new Date().toISOString(),
  };

  return Space.from({ ...defaultSpace, ...overrides });
}

export function mockSpaces(): Space[] {
  return [
    createMockSpace({
      id: 'space-1',
      name: 'Game Devs',
      description: 'Discussing game mechanics and assets.',
      visibility: 'public',
      ownerId: 'user-dev',
      members: ['user-dev', 'user-art'],
    }),
    createMockSpace({
      id: 'space-2',
      name: 'Private Notes',
      description: 'My personal space.',
      visibility: 'private',
      ownerId: 'user-me',
      members: ['user-me'],
    }),
    createMockSpace({
      id: 'space-3',
      name: 'Hidden Gems',
      visibility: 'unlisted',
      ownerId: 'user-hidden',
      members: ['user-hidden', 'user-guest'],
    }),
  ];
}