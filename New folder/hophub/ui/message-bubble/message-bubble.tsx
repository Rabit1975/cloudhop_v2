import React from 'react';
import classNames from 'classnames';
import { Message } from '@cloudrabbit/hophub.entities.message';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { Avatar } from '@cloudrabbit/design.content.avatar';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Image } from '@cloudrabbit/design.content.image';
import styles from './message-bubble.module.scss';

// Infer the type for media attachments from the Message interface
type MediaAttachment = NonNullable<Message['mediaAttachments']>[number];

export type MessageBubbleProps = {
  /**
   * The message entity to display.
   */
  message: Message;

  /**
   * The user who sent the message.
   */
  sender: User;

  /**
   * Whether the message was sent by the current user.
   * @default false
   */
  isSelf?: boolean;

  /**
   * Whether to show the sender's avatar.
   * @default true
   */
  showAvatar?: boolean;

  /**
   * Whether to show the sender's name.
   * @default true
   */
  showSenderName?: boolean;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Custom styles for the container.
   */
  style?: React.CSSProperties;
};

export function MessageBubble({
  message,
  sender,
  isSelf = false,
  showAvatar = true,
  showSenderName = true,
  className,
  style,
}: MessageBubbleProps) {
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const hasMedia = message.mediaAttachments && message.mediaAttachments.length > 0;

  return (
    <div
      className={classNames(
        styles.messageBubble,
        isSelf ? styles.sent : styles.received,
        className
      )}
      style={style}
    >
      {showAvatar && (
        <Avatar
          src={sender.imageUrl}
          letters={sender.displayName}
          alt={sender.displayName}
          size="md"
        />
      )}

      <div className={styles.contentContainer}>
        {showSenderName && !isSelf && (
          <span className={styles.senderName}>{sender.displayName}</span>
        )}

        <div className={styles.bubble}>
          {hasMedia &&
            message.mediaAttachments?.map((attachment: MediaAttachment) => (
              <div key={attachment.id || Math.random()} className={styles.mediaAttachment}>
                <Image
                  src={attachment.url}
                  alt={attachment.filename || 'Attachment'}
                  width="100%"
                />
              </div>
            ))}

          {message.text && (
            <Paragraph className={styles.text} size="medium">
              {message.text}
            </Paragraph>
          )}

          <span className={styles.timestamp}>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}