import { SocialConnection } from './social-connection.js';
import { PlainSocialConnection } from './social-connection-type.js';

const defaultSocialConnection: PlainSocialConnection = {
  id: 'conn-default',
  userId1: 'user-1',
  userId2: 'user-2',
  status: 'pending',
  createdAt: '2024-01-01T00:00:00.000Z',
};

/**
 * Creates a mock SocialConnection with optional overrides.
 */
export function mockSocialConnection(overrides: Partial<PlainSocialConnection> = {}): SocialConnection {
  return SocialConnection.from({
    ...defaultSocialConnection,
    ...overrides,
  });
}

/**
 * Returns a list of mock SocialConnections.
 */
export function mockSocialConnections(): SocialConnection[] {
  return [
    mockSocialConnection({ id: 'conn-1', status: 'accepted' }),
    mockSocialConnection({ id: 'conn-2', userId2: 'user-3', status: 'pending' }),
    mockSocialConnection({ id: 'conn-3', userId2: 'user-4', status: 'blocked' }),
  ];
}