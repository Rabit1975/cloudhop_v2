import React from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Card } from '@cloudrabbit/design.content.card';
import { Avatar } from '@cloudrabbit/design.content.avatar';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { PresenceIndicator } from '@cloudrabbit/people.ui.presence-indicator';
import { StatusMessage } from '@cloudrabbit/people.ui.status-message';
import { UserProfile } from '@cloudrabbit/people.entities.user-profile';
import styles from './user-card.module.scss';

export type UserCardProps = {
  /**
   * The user profile data to display.
   */
  user: UserProfile;

  /**
   * The visual variant of the card.
   * @default 'elevated'
   */
  variant?: 'default' | 'elevated' | 'outlined' | 'glow';

  /**
   * Additional class name for the wrapper.
   */
  className?: string;

  /**
   * Inline styles for the wrapper.
   */
  style?: React.CSSProperties;
};

export function UserCard({ user, variant = 'elevated', className, style }: UserCardProps) {
  const { firstName, lastName, profilePicture, presenceStatus, statusMessage, userId } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <Link
      href={`/profile/${userId}`}
      noStyles
      className={classNames(styles.userCardLink, className)}
      style={style}
    >
      <Card
        className={classNames(styles.card, styles[variant])}
        interactive
        variant={variant}
      >
        <div className={styles.content}>
          <div className={styles.avatarContainer}>
            <Avatar
              src={profilePicture}
              alt={fullName}
              letters={fullName}
              size="xl"
              className={styles.avatar}
            />
            {presenceStatus && (
              <div className={styles.presenceWrapper}>
                <PresenceIndicator status={presenceStatus} size="medium" />
              </div>
            )}
          </div>

          <div className={styles.info}>
            <Heading element="h3" visualLevel="h6" className={styles.name}>
              {fullName}
            </Heading>
            
            {statusMessage && (
              <div className={styles.statusMessage}>
                 <StatusMessage message={statusMessage} />
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}