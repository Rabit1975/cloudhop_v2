import React, { useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { Message } from '@cloudrabbit/hophub.entities.message';
import { MessageBubble } from '@cloudrabbit/hophub.ui.message-bubble';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import styles from './message-list.module.scss';

export type MessageListProps = {
  /**
   * List of messages to display.
   */
  messages: Message[];

  /**
   * The current user, used to identify self-sent messages.
   */
  currentUser: User;

  /**
   * List of users involved in the conversation for resolving sender details.
   */
  users: User[];

  /**
   * Custom class name.
   */
  className?: string;

  /**
   * Custom style object.
   */
  style?: React.CSSProperties;
};

export function MessageList({
  messages,
  currentUser,
  users,
  className,
  style,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Create a map for faster user lookup
  const userMap = useMemo(() => {
    const map = new Map<string, User>();
    users.forEach((u) => map.set(u.id, u));
    return map;
  }, [users]);

  // Fallback for unknown users - adding required properties based on type errors
  const unknownUser: User = {
    id: 'unknown',
    displayName: 'Unknown User',
    imageUrl: undefined, // Optional property, setting to undefined explicitly
    username: 'unknown', // Added to satisfy User type
    email: 'unknown@example.com', // Added to satisfy User type
    roles: [], // Assuming UserRole[] type if roles exists
    userId: 'unknown', // Added to satisfy User type
    hasRole: () => false, // Added to satisfy User type (dummy implementation)
    toObject: () => ({ // Added to satisfy User type (dummy implementation returning a plain object)
      id: 'unknown',
      displayName: 'Unknown User',
      imageUrl: undefined,
      username: 'unknown',
      email: 'unknown@example.com',
      roles: [],
      userId: 'unknown',
    }),
  };

  return (
    <div className={classNames(styles.messageList, className)} style={style}>
      {messages.map((message) => {
        const isSelf = message.senderId === currentUser.id;
        const sender = userMap.get(message.senderId) || unknownUser;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            sender={sender}
            isSelf={isSelf}
          />
        );
      })}
      <div ref={bottomRef} className={styles.bottomSpacer} />
    </div>
  );
}