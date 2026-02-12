import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Avatar } from '@cloudrabbit/design.content.avatar';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { PlainMessage } from '@cloudrabbit/ai.entities.message';
import styles from './chat-message.module.scss';

export type ChatMessageProps = {
  /**
   * The message object containing text, role, and metadata.
   */
  message: PlainMessage;

  /**
   * Optional source URL for the avatar image.
   * If not provided, a default representation based on role is used.
   */
  avatarSrc?: string;

  /**
   * Custom class name for the root element.
   */
  className?: string;

  /**
   * Custom style object for the root element.
   */
  style?: React.CSSProperties;
};

export function ChatMessage({ message, avatarSrc, className, style }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  const timeString = useMemo(() => {
    try {
      return new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  }, [message.createdAt]);

  const avatarLetters = isUser ? 'ME' : 'AI';
  const avatarStatus = isUser ? 'online' : 'busy';

  return (
    <div
      className={classNames(
        styles.chatMessage,
        isUser ? styles.user : styles.ai,
        className
      )}
      style={style}
    >
      <div className={styles.avatarWrapper}>
        <Avatar
          src={avatarSrc}
          letters={avatarLetters}
          size="md"
          status={avatarStatus}
          alt={isUser ? 'User Avatar' : 'AI Avatar'}
        />
      </div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.meta}>
          <span className={styles.name}>{isUser ? 'You' : 'CloudHop AI'}</span>
          <span className={styles.time}>{timeString}</span>
        </div>
        
        <div className={styles.bubble}>
          <Paragraph size="medium" className={styles.text}>
            {message.text}
          </Paragraph>
        </div>
      </div>
    </div>
  );
}