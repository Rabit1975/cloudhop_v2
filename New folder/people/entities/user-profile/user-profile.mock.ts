import { mockSocialConnections } from '@cloudrabbit/people.entities.social-connection';
import { UserProfile } from './user-profile.js';
import type { PlainUserProfile } from './user-profile-type.js';

/**
 * Creates a mock UserProfile with optional overrides.
 */
export function mockUserProfile(overrides: Partial<PlainUserProfile> = {}): UserProfile {
  const defaultProfile: PlainUserProfile = {
    id: 'profile-1',
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@cloudhop.com',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    statusMessage: 'Exploring the new CloudHop!',
    presenceStatus: 'online',
    socialConnections: mockSocialConnections().map((c) => c.toObject()),
    createdAt: new Date().toISOString(),
    ...overrides,
  };
  return UserProfile.from(defaultProfile);
}

/**
 * Returns a list of mock UserProfiles.
 */
export function mockUserProfiles(): UserProfile[] {
  return [
    mockUserProfile(),
    mockUserProfile({
      id: 'profile-2',
      userId: 'user-2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@cloudhop.com',
      presenceStatus: 'away',
      socialConnections: [],
    }),
    mockUserProfile({
      id: 'profile-3',
      userId: 'user-3',
      firstName: 'Alice',
      lastName: 'Wonder',
      email: 'alice.w@cloudhop.com',
      presenceStatus: 'offline',
      socialConnections: [],
    }),
  ];
}