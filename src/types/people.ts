// Presence Status Types
export type UserPresenceStatus = 'online' | 'away' | 'busy' | 'offline' | 'invisible';

export interface PresenceStatus {
  userId: string;
  status: UserPresenceStatus;
  lastSeenAt: string;
}

// Friend Request Types
export type FriendRequestStatus = 'pending' | 'accepted' | 'declined' | 'blocked';

export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: FriendRequestStatus;
  createdAt: string;
}

// Social Connection Types
export type SocialConnectionStatus = 'connected' | 'pending' | 'blocked' | 'removed';

export interface SocialConnection {
  id: string;
  userId1: string;
  userId2: string;
  status: SocialConnectionStatus;
  createdAt: string;
  updatedAt?: string;
}

// User Profile Types
export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  statusMessage?: string;
  presenceStatus: UserPresenceStatus;
  socialConnections: SocialConnection[];
  createdAt: string;
  updatedAt?: string;
}

// UI Component Props
export interface UserCardProps {
  user: UserProfile;
  variant?: 'default' | 'elevated' | 'outlined' | 'glow';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export interface PresenceIndicatorProps {
  status: UserPresenceStatus;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

export interface FriendRequestCardProps {
  request: FriendRequest;
  onAccept?: () => void;
  onDecline?: () => void;
  onBlock?: () => void;
  className?: string;
}

export interface StatusMessageProps {
  message: string;
  maxLength?: number;
  className?: string;
}
