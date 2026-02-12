import React from 'react';
import classNames from 'classnames';
import { AvatarSize } from '@cloudrabbit/design.content.avatar';
import { UserProfile } from './index.js'; // Import UserProfile type from re-exported source
import { SpaceMemberItem } from './space-member-item.js';
import styles from './space-members.module.scss';

export type SpaceMembersProps = {
  /**
   * List of member IDs in the space.
   */
  members: string[];

  /**
   * Maximum number of members to display before showing a counter.
   */
  maxDisplay?: number;

  /**
   * Size of the member avatars.
   * @default 'md'
   */
  avatarSize?: AvatarSize;

  /**
   * Optional map of mock profiles for testing/preview.
   * Key is userId.
   */
  mockProfiles?: Record<string, UserProfile>;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Custom styles for the container.
   */
  style?: React.CSSProperties;
};

export function SpaceMembers({
  members,
  maxDisplay,
  avatarSize = 'md',
  mockProfiles,
  className,
  style,
}: SpaceMembersProps) {
  const displayMembers = maxDisplay ? members.slice(0, maxDisplay) : members;
  const remainingCount = maxDisplay ? Math.max(0, members.length - maxDisplay) : 0;

  return (
    <div className={classNames(styles.spaceMembers, className)} style={style}>
      {displayMembers.map((userId) => (
        <SpaceMemberItem
          key={userId}
          userId={userId}
          size={avatarSize}
          mockProfile={mockProfiles?.[userId]}
        />
      ))}
      {remainingCount > 0 && (
        <div 
          className={classNames(styles.moreCount, styles[avatarSize])} 
          title={`${remainingCount} more members`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}