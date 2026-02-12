import React, { useMemo } from 'react';
import classNames from 'classnames';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { Meeting } from '@cloudrabbit/hopmeets.entities.meeting';
import { SearchResultCard } from '@cloudrabbit/search.ui.search-result-card';
import styles from './meeting-search-result.module.scss';

export type MeetingSearchResultProps = {
  /**
   * The search result containing the meeting data.
   */
  result: SearchResult;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the component.
   */
  style?: React.CSSProperties;

  /**
   * Callback when the card is clicked.
   */
  onClick?: () => void;
};

function formatMeetingTime(start: string, end: string): string {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };

    const dateStr = new Intl.DateTimeFormat('en-US', dateOptions).format(startDate);
    const startTimeStr = new Intl.DateTimeFormat('en-US', timeOptions).format(startDate);
    const endTimeStr = new Intl.DateTimeFormat('en-US', timeOptions).format(endDate);

    return `${dateStr} • ${startTimeStr} - ${endTimeStr}`;
  } catch (e) {
    return '';
  }
}

export function MeetingSearchResult({
  result,
  className,
  style,
  onClick,
}: MeetingSearchResultProps) {
  // We assume the content of the search result is a Meeting entity (or plain meeting object)
  const meeting = result.content as unknown as Meeting;
  
  const mappedResult = useMemo(() => {
    const timeString = formatMeetingTime(meeting.startTime, meeting.endTime);
    const description = meeting.description 
      ? `${timeString} • ${meeting.description}`
      : timeString;

    return {
      id: meeting.id,
      title: meeting.topic,
      description,
      // Use a generic meeting image or the one provided in content if available
      imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_network_backg_0_1770833860674.png',
      link: meeting.joinUrl || '/hopmeets',
      type: 'Meeting',
      data: {
        status: meeting.status,
        hostId: meeting.hostId,
      },
    };
  }, [meeting]);

  return (
    <div className={classNames(styles.meetingSearchResult, className)} style={style}>
      <SearchResultCard
        result={mappedResult}
        onClick={onClick}
        className={styles.card}
      />
    </div>
  );
}