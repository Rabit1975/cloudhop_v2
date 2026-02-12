import { User } from './user.js';
import { UserRole } from './role-type.js';
import { PlainUser } from './user-type.js';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : (r % 4 + 8);
    return v.toString(16);
  });
};

export function mockUsers(overrides: Partial<PlainUser> = {}): User[] {
  const defaultUser: PlainUser = {
    id: generateUUID(),
    username: 'cloudhopper',
    displayName: 'Cloud Hopper',
    email: 'hopper@cloudhop.io',
    roles: [UserRole.User],
    imageUrl: 'https://example.com/avatar.png',
    ...overrides
  };

  const adminUser: PlainUser = {
    id: generateUUID(),
    username: 'admin',
    displayName: 'System Admin',
    email: 'admin@cloudhop.io',
    roles: [UserRole.Admin, UserRole.User],
    imageUrl: 'https://example.com/admin.png'
  };

  return [
    User.from(defaultUser),
    User.from(adminUser)
  ];
}