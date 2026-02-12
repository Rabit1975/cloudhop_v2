import { UserProfile } from './user-profile.js';
import { mockUserProfile } from './user-profile.mock.js';

describe('UserProfile', () => {
  it('should have a static from() method', () => {
    expect(UserProfile.from).toBeTruthy();
  });

  it('should create a UserProfile instance from a plain object', () => {
    const mock = mockUserProfile();
    const userProfile = UserProfile.from(mock.toObject());
    expect(userProfile).toBeInstanceOf(UserProfile);
  });

  it('should serialize a UserProfile instance to a plain object', () => {
    const mock = mockUserProfile();
    const plainObject = mock.toObject();
    expect(typeof plainObject).toBe('object');
    expect(plainObject.id).toBeDefined();
    expect(plainObject.userId).toBeDefined();
  });
});