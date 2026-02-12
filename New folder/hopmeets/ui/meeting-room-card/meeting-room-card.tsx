import React from 'react';
import classNames from 'classnames';
import { Card } from '@cloudrabbit/design.content.card';
import { Button } from '@cloudrabbit/design.actions.button';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Event } from '@cloudrabbit/hopmeets.icons.event';
import { MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';
import styles from './meeting-room-card.module.scss';

export type MeetingRoomCardProps = {
  /**
   * The meeting room entity containing details to display.
   */
  room?: MeetingRoom;

  /**
   * Callback fired when the 'Enter Room' button is clicked.
   */
  onEnter?: (roomId: string) => void;

  /**
   * Link URL for the room details or schedule page.
   * @default '/hopmeets'
   */
  detailsHref?: string;

  /**
   * Additional class name for the card container.
   */
  className?: string;

  /**
   * Inline styles for the component.
   */
  style?: React.CSSProperties;
};

const defaultRoom = new MeetingRoom(
  'mock-room-1',
  'Nebula Lounge',
  50,
  false,
  'system-user'
);

export function MeetingRoomCard({
  room = defaultRoom,
  onEnter,
  detailsHref = '/hopmeets',
  className,
  style,
}: MeetingRoomCardProps) {
  const { id, name, capacity, isPrivate, currentMeetingId } = room;

  const handleEnter = () => {
    if (onEnter) {
      onEnter(id);
    }
  };

  const headerContent = (
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        <div className={styles.iconWrapper}>
          <Event className={styles.icon} />
        </div>
        <span className={styles.title}>{name}</span>
      </div>
      {isPrivate && (
        <div className={styles.badge}>
          Private
        </div>
      )}
    </div>
  );

  const footerContent = (
    <div className={styles.footer}>
      <Link href={detailsHref} className={styles.link}>
        Room Details
      </Link>
      <Button
        appearance="primary"
        onClick={handleEnter}
        className={styles.button}
      >
        Enter Room
      </Button>
    </div>
  );

  return (
    <Card
      variant="elevated"
      className={classNames(styles.card, className)}
      style={style}
      header={headerContent}
      footer={footerContent}
    >
      <div className={styles.body}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.label}>Capacity</span>
            <span className={styles.value}>{capacity} Participants</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.label}>Status</span>
            <span
              className={classNames(
                styles.value,
                currentMeetingId ? styles.statusLive : styles.statusIdle
              )}
            >
              {currentMeetingId ? 'Live Now' : 'Available'}
            </span>
          </div>
        </div>
        <Paragraph size="small" className={styles.description}>
          {isPrivate
            ? 'This room requires an access code or invitation to join.'
            : 'Public room open for team collaboration and instant meetings.'}
        </Paragraph>
      </div>
    </Card>
  );
}