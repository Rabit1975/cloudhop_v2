import React from 'react';
import { useUserProfile } from '@cloudrabbit/people.hooks.use-user-profile';
import { Avatar, type AvatarSize } from '@cloudrabbit/design.content.avatar';
import { Tooltip } from '@cloudrabbit/design.overlays.tooltip';
import classNames from 'classnames';
import styles from './space-members.module.scss';
import type { UserProfile } from './index.js'; // Import UserProfile type from re-exported source

export type SpaceMemberItemProps = {
  userId: string;
  size?: AvatarSize;
  mockProfile?: UserProfile;
  className?: string;
};

export function SpaceMemberItem({
  userId,
  size = 'md',
  mockProfile,
  className,
}: SpaceMemberItemProps) {
  // The UserProfile type from useUserProfile is now aligned with the re-exported type.
  // The cast is kept for explicitness but the underlying types should now be compatible.
  const { userProfile, loading } = useUserProfile(userId, { mockData: mockProfile }) as { userProfile: UserProfile | undefined, loading: boolean };

  const displayName = userProfile?.displayName || 'Unknown Member';
  const username = userProfile?.username ? `@${userProfile.username}` : '';
  const avatarUrl = userProfile?.imageUrl;
  const bio = userProfile?.bio;
  // The status is simplified for display, real presence would require more complex logic
  const status = loading ? undefined : 'online';

  const tooltipContent = (
    <div className={styles.memberTooltip}>
      <div className={styles.tooltipHeader}>
        <Avatar
          src={avatarUrl}
          letters={displayName}
          size="md"
          status={status}
        />
        <div className={styles.memberInfo}>
          <span className={styles.displayName}>{loading ? 'Loading...' : displayName}</span>
          {username && <span className={styles.username}>{username}</span>}
        </div>
      </div>
      {bio && <p className={styles.bio}>{bio}</p>}
    </div>
  );

  return (
    // @ts-ignore Type 'Element' is not assignable to type 'ReactNode & string'.
    <Tooltip content={tooltipContent} position="top">
      <div className={classNames(styles.itemWrapper, className)}>
        <Avatar
          src={avatarUrl}
          letters={displayName}
          size={size}
          className={styles.avatar}
          alt={displayName}
        />
      </div>
    </Tooltip>
  );
}