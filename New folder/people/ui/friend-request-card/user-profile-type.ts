export type UserProfile = {
  id: string; // The primary identifier for the user profile
  username: string; // Made required based on component usage and error context
  email: string;
  firstName: string; // Made required based on TS2322 error
  lastName: string; // Assuming lastName is also required if firstName is.
  displayName: string; // Made required based on component usage and error context
  profilePicture: string; // Changed to required to match the UserProfile type expected by useUserProfile mockData
  bio?: string;
  company?: string;
  statusMessage: string; // Changed to required based on type error
  presenceStatus?: 'online' | 'offline' | 'away' | 'busy';
  createdAt: string;
  updatedAt?: string;
  // Properties below are added to satisfy the UserProfile type expected by the `useUserProfile` hook.
  userId: string;
  socialConnections: unknown[];
  toObject(): unknown; // Added return type as unknown, assuming it's not strictly typed externally
};