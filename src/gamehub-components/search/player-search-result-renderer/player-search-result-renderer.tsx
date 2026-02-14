import React from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Card } from '@cloudrabbit/design.content.card';
import { Avatar } from '@cloudrabbit/design.content.avatar';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { PlainSearchResult } from '@cloudrabbit/search.entities.search-result';
import type { PlayerContent } from './player-content-type.js';
import styles from './player-search-result-renderer.module.scss';

export type PlayerSearchResultRendererProps = {
  /**
   * The search result object containing player data.
   */
  result?: PlainSearchResult;
  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: React.CSSProperties;
};

// Define defaultPlayerContent conforming to the new PlayerContent structure
const defaultPlayerContent: PlayerContent = {
  id: 'player-u-001', 
  type: 'player',   
  title: 'Nebula Walker', 
  url: '/profile?userId=user-001', 

  userId: 'user-001',
  username: 'nebula_walker',
  displayName: 'Nebula Walker',
  avatarUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_avatar_for_a__0_1770833865266.png',
  statusMessage: 'Exploring the outer rims of the CloudHop galaxy.',
  presenceStatus: 'online',
};

const defaultResult: PlainSearchResult = {
  id: 'result-001',
  relevanceScore: 1,
  content: defaultPlayerContent, 
};

export function PlayerSearchResultRenderer({
  result = defaultResult,
  className,
  style,
}: PlayerSearchResultRendererProps) {
  // Safely cast content to PlayerContent since it's designed to be compatible
  const content = result.content as PlayerContent;
  const { displayName, username, avatarUrl, statusMessage, presenceStatus, url } = content;

  const nameToDisplay = displayName || username || 'Unknown Player';
  const profileLink = url; // Use the url field which is now guaranteed by PlayerContent

  return (
    <Link
      href={profileLink}
      noStyles
      className={classNames(styles.linkWrapper, className)}
      style={style}
    >
      <Card className={styles.card} interactive variant="default">
        <div className={styles.container}>
          <Avatar
            src={avatarUrl}
            alt={nameToDisplay}
            letters={nameToDisplay.substring(0, 2)}
            size="lg"
            status={presenceStatus}
          />
          <div className={styles.info}>
            <Heading element="h4" visualLevel="h6" className={styles.name}>
              {nameToDisplay}
            </Heading>
            {statusMessage && (
              <Paragraph size="small" className={styles.status}>
                {statusMessage}
              </Paragraph>
            )}
            <Paragraph size="small" className={styles.username}>
              @{username}
            </Paragraph>
          </div>
        </div>
      </Card>
    </Link>
  );
}