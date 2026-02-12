export type UserPresenceStatus = 'online' | 'offline' | 'away' | 'busy';

export interface UserProfile {
  userId: string;
  username: string;
  email: string;
  displayName?: string;
  imageUrl?: string;
  bio?: string;
  company?: string;
  statusMessage?: string;
  presenceStatus?: UserPresenceStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface PlainUserProfile {
  userId: string;
  username: string;
  email: string;
  displayName?: string;
  imageUrl?: string;
  bio?: string;
  company?: string;
  statusMessage?: string;
  presenceStatus?: string;
  createdAt: string;
  updatedAt?: string;
}