export { SpaceMembers } from './space-members.js';
export type { SpaceMembersProps } from './space-members.js';

// UserProfile is now imported directly from the hook package to avoid type conflicts
// and ensure consistency with the useUserProfile hook.
export type { UserProfile } from '@cloudrabbit/people.hooks.use-user-profile';