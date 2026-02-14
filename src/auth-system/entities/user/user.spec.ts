import { User } from './user.js';
import { UserRole } from './role-type.js';
import { mockUsers } from './user.mock.js';

describe('User', () => {
  it('should create a User instance', () => {
    const user = new User(
      '123',
      'testuser',
      'Test User',
      'test@example.com',
      [UserRole.User],
      'https://example.com/image.png'
    );
    expect(user).toBeInstanceOf(User);
  });

  it('should check if user has a role', () => {
    const user = new User(
      '123',
      'testuser',
      'Test User',
      'test@example.com',
      [UserRole.User],
      'https://example.com/image.png'
    );
    expect(user.hasRole(UserRole.User)).toBe(true);
    expect(user.hasRole(UserRole.Admin)).toBe(false);
  });

  it('should create a User from a plain object', () => {
    const [mockUser] = mockUsers();
    const user = User.from(mockUser.toObject());
    expect(user).toBeInstanceOf(User);
  });
});