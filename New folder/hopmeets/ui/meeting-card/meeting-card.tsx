import React from 'react';
import classNames from 'classnames';
import { Card } from '@cloudrabbit/design.content.card';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Button } from '@cloudrabbit/design.actions.button';
import { Link } from '@cloudrabbit/design.navigation.link';
import { VideoCall } from '@cloudrabbit/hopmeets.icons.video-call';
import type { PlainMeeting } from '@cloudrabbit/hopmeets.entities.meeting';
import styles from './meeting-card.module.scss';

export type MeetingCardProps = {
  /**
   * The meeting data object to display.
   */
  meeting: PlainMeeting;

  /**
   * Optional callback when the "Join" button is clicked.
   */
  onJoin?: (meeting: PlainMeeting) => void;

  /**
   * Whether to show the meeting description.
   * @default true
   */
  showDescription?: boolean;

  /**
   * Custom class name for the card.
   */
  className?: string;

  /**
   * Inline styles for the card.
   */
  style?: React.CSSProperties;
};

export function MeetingCard({
  meeting,
  onJoin,
  showDescription = true,
  className,
  style,
}: MeetingCardProps) {
  const { topic, startTime, endTime, description, status, joinUrl } = meeting;
  const isLive = status === 'live';

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const dateString = dateFormatter.format(startDate);
  const timeRangeString = `${timeFormatter.format(startDate)} - ${timeFormatter.format(endDate)}`;

  const handleJoin = (e: React.MouseEvent) => {
    // Prevent event bubbling if the card is interactive
    e.stopPropagation();
    
    if (onJoin) {
      onJoin(meeting);
    } else if (joinUrl) {
      window.open(joinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const headerContent = (
    <div className={classNames(styles.headerBadge, { [styles.live]: isLive })}>
      <VideoCall size={16} />
      <span>{isLive ? 'Live Now' : 'Video Meeting'}</span>
      {isLive && <span className={styles.statusDot} />}
    </div>
  );

  const footerContent = (
    <div className={styles.footerActions}>
      <Link href="/hopmeets" className={styles.detailsLink} onClick={(e) => e.stopPropagation()}>
        View Details
      </Link>
      <Button
        appearance={isLive ? 'primary' : 'secondary'}
        onClick={handleJoin}
        disabled={status === 'ended' || status === 'canceled'}
      >
        {status === 'ended' ? 'Ended' : 'Join Meeting'}
      </Button>
    </div>
  );

  return (
    <Card
      title={topic}
      variant={isLive ? 'glow' : 'default'}
      header={headerContent}
      footer={footerContent}
      className={classNames(styles.meetingCard, className)}
      style={style}
      interactive
    >
      <div className={styles.timeInfo}>
        <span className={styles.dateText}>{dateString}</span>
        <span className={styles.durationText}>{timeRangeString}</span>
      </div>
      
      {showDescription && description && (
        <Paragraph size="small" className={styles.description}>
          {description}
        </Paragraph>
      )}
    </Card>
  );
}