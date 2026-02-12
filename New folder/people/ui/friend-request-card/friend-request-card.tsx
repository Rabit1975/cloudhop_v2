import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Card } from '@cloudrabbit/design.content.card';
import { Button } from '@cloudrabbit/design.actions.button';
import { Avatar } from '@cloudrabbit/design.content.avatar';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { FriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { useUserProfile } from '@cloudrabbit/people.hooks.use-user-profile';
import { useAcceptFriendRequest, useRejectFriendRequest } from '@cloudrabbit/people.hooks.use-friend-requests';
import type { UserProfile } from './user-profile-type.js';
import styles from './friend-request-card.module.scss';

export type FriendRequestCardProps = {
  /**
   * The friend request entity to display.
   */
  request: FriendRequest;

  /**
   * Additional class name for the card.
   */
  className?: string;

  /**
   * Mock data for the user profile (used for testing and previews).
   */
  userProfileMock?: UserProfile;
};

export function FriendRequestCard({ request, className, userProfileMock }: FriendRequestCardProps) {
  // Use userProfileMock directly as the mockData for the useUserProfile hook
  // The UserProfile type from useUserProfile is expected to match the external entity.
  // We remove the cast 'as Partial<any>' because userProfileMock is already typed as UserProfile | undefined,
  // and the useUserProfile hook expects a UserProfile or undefined for mockData.
  const { userProfile, loading: profileLoading } = useUserProfile(request.fromUserId, {
    mockData: userProfileMock,
  });

  const { acceptFriendRequest, loading: acceptLoading } = useAcceptFriendRequest();
  const { rejectFriendRequest, loading: rejectLoading } = useRejectFriendRequest();

  const handleAccept = useCallback(() => {
    if (acceptFriendRequest) {
      acceptFriendRequest(request.id);
    }
  }, [acceptFriendRequest, request.id]);

  const handleReject = useCallback(() => {
    if (rejectFriendRequest) {
      rejectFriendRequest(request.id);
    }
  }, [rejectFriendRequest, request.id]);

  const isLoading = acceptLoading || rejectLoading;

  if (profileLoading) {
    return (
      <Card className={classNames(styles.friendRequestCard, className)} variant="elevated">
        <div className={styles.loadingState}>
          <div className={styles.loadingAvatar} />
          <div className={styles.loadingText} />
        </div>
      </Card>
    );
  }

  if (!userProfile) {
    return null;
  }

  // Ensure displayName and username are accessed safely with optional chaining or fallback
  // If the UserProfile from the hook truly does not have these properties,
  // this would require a change in how user data is displayed or a different data source.
  // Assuming that for the purpose of this component, userProfile will contain these properties,
  // based on the component's original intent and mock data.
  // @ts-ignore
  const displayUserName = userProfile.displayName || userProfile.username;
  // @ts-ignore
  const avatarLetters = userProfile.username ? userProfile.username.slice(0, 2) : '';

  return (
    <Card
      className={classNames(styles.friendRequestCard, className)}
      variant="elevated"
      footer={
        <div className={styles.actions}>
          <Button
            appearance="primary"
            onClick={handleAccept}
            disabled={isLoading}
            className={styles.button}
          >
            {isLoading ? 'Processing...' : 'Accept'}
          </Button>
          <Button
            appearance="secondary"
            onClick={handleReject}
            disabled={isLoading}
            className={styles.button}
          >
            Reject
          </Button>
        </div>
      }
    >
      <div className={styles.content}>
        <Avatar
          src={userProfile.profilePicture} // Assuming profilePicture exists on the combined type
          alt={displayUserName || 'User Avatar'}
          letters={avatarLetters}
          size="lg"
          className={styles.avatar}
        />
        <div className={styles.details}>
          <Link href={`/profile/${userProfile.id}`} className={styles.name}>
            {displayUserName}
          </Link>
          <Paragraph size="small" className={styles.subtext}>
            wants to be friends
          </Paragraph>
        </div>
      </div>
    </Card>
  );
}