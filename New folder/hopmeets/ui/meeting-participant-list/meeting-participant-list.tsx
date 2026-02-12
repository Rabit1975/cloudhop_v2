import React from 'react';
import classNames from 'classnames';
import { SectionLayout } from '@cloudrabbit/design.layouts.section-layout';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { Avatar } from '@cloudrabbit/design.content.avatar';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import styles from './meeting-participant-list.module.scss';

export type MeetingParticipantListProps = {
  /**
   * List of user objects representing the participants.
   */
  participants: User[];

  /**
   * Title for the participant section.
   * @default "Meeting Participants"
   */
  title?: string;

  /**
   * Additional class name for the container.
   */
  className?: string;
};

export function MeetingParticipantList({
  participants,
  title = 'Meeting Participants',
  className,
}: MeetingParticipantListProps) {
  return (
    <SectionLayout
      title={title}
      className={classNames(styles.participantList, className)}
    >
      <ul className={styles.list}>
        {participants.map((user) => (
          <li key={user.id} className={styles.item}>
            <Avatar
              src={user.imageUrl}
              alt={user.displayName}
              letters={user.displayName}
              className={styles.avatar}
              size="md"
            />
            <div className={styles.info}>
              <span className={styles.name}>{user.displayName}</span>
              <Paragraph size="small" className={styles.username}>
                @{user.username}
              </Paragraph>
            </div>
          </li>
        ))}
      </ul>
    </SectionLayout>
  );
}