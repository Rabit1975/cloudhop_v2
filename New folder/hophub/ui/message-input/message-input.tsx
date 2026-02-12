import React, { useState, useCallback, type KeyboardEvent, type ChangeEvent } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { AttachmentIcon } from './attachment-icon.js';
import { SendIcon } from './send-icon.js';
import type { SendMessageHandler } from './send-message-handler-type.js';
import styles from './message-input.module.scss';

export type MessageInputProps = {
  /**
   * Callback fired when the user sends a message.
   */
  onSendMessage?: SendMessageHandler;

  /**
   * Placeholder text for the input field.
   * @default "Type a message..."
   */
  placeholder?: string;

  /**
   * Disables the input and buttons.
   */
  disabled?: boolean;

  /**
   * Additional class name for the wrapper.
   */
  className?: string;

  /**
   * Inline style for the wrapper.
   */
  style?: React.CSSProperties;
};

export function MessageInput({
  onSendMessage,
  placeholder = 'Type a message...',
  disabled = false,
  className,
  style,
}: MessageInputProps) {
  const [text, setText] = useState('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (text.trim() && onSendMessage) {
      onSendMessage(text);
      setText('');
    }
  }, [text, onSendMessage]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const isSendDisabled = disabled || !text.trim();

  return (
    <div className={classNames(styles.messageInput, className)} style={style}>
      <Button
        appearance="tertiary"
        disabled={disabled}
        className={styles.actionButton}
        onClick={() => {
          // Placeholder for attachment logic
          console.log('Attachment clicked');
        }}
      >
        <AttachmentIcon />
      </Button>
      <div className={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
      <Button
        appearance="primary"
        disabled={isSendDisabled}
        onClick={handleSend}
        className={classNames(styles.sendButton, { [styles.disabled]: isSendDisabled })}
      >
        <SendIcon />
      </Button>
    </div>
  );
}