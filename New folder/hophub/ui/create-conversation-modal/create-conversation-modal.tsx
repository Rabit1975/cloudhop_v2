import React, { useState, useCallback, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { SelectList } from '@cloudrabbit/design.inputs.select-list';
import { useCreateChannel } from '@cloudrabbit/hophub.hooks.use-channels';
import { useCreateDirectMessage } from '@cloudrabbit/hophub.hooks.use-direct-messages';
import styles from './create-conversation-modal.module.scss';

export type CreateConversationModalProps = {
  /**
   * Whether the modal is currently visible.
   */
  isOpen?: boolean;

  /**
   * Callback fired when the modal requests to close.
   */
  onClose?: () => void;

  /**
   * Optional initial user ID to pre-fill for DM.
   */
  initialUserId?: string;

  /**
   * Additional class name for the modal container.
   */
  className?: string;

  /**
   * Inline styles for the modal container.
   */
  style?: React.CSSProperties;
};

const CONVERSATION_TYPES = [
  { value: 'CHANNEL', label: 'New Channel', icon: <span>#</span> },
  { value: 'DM', label: 'Direct Message', icon: <span>@</span> },
];

export function CreateConversationModal({
  isOpen = false,
  onClose,
  initialUserId = '',
  className,
  style,
}: CreateConversationModalProps) {
  const [activeType, setActiveType] = useState<string>('CHANNEL');
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [dmUserIds, setDmUserIds] = useState(initialUserId);

  const { createChannel, loading: creatingChannel, error: channelError } = useCreateChannel();
  const { createDirectMessage, loading: creatingDM, error: dmError } = useCreateDirectMessage();

  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setChannelName('');
      setChannelDescription('');
      setDmUserIds(initialUserId);
      setActiveType(initialUserId ? 'DM' : 'CHANNEL');
    }

  }, [isOpen, initialUserId]);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return () => {}; // Explicitly return an empty cleanup function when not open

  }, [isOpen, handleEscape]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();

    try {
      if (activeType === 'CHANNEL') {
        if (!channelName.trim()) return;
        await createChannel(channelName, channelDescription);
      } else {
        if (!dmUserIds.trim()) return;
        const memberIds = dmUserIds.split(',').map(id => id.trim()).filter(Boolean);
        await createDirectMessage(memberIds);
      }
      handleClose();
    } catch (err: any) { // Add any to catch error message
      // console.error(err); // Removed console statement
      // Optionally handle error state here, e.g., setError(err.message)
    }
  }, [activeType, channelName, channelDescription, dmUserIds, createChannel, createDirectMessage, handleClose]);

  if (!isOpen) return null;

  const isLoading = creatingChannel || creatingDM;
  const error = activeType === 'CHANNEL' ? channelError : dmError;

  let submitButtonText: string;
  if (isLoading) {
    submitButtonText = 'Creating...';
  } else if (activeType === 'CHANNEL') {
    submitButtonText = 'Create Channel';
  } else {
    submitButtonText = 'Start Message';
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div
        className={classNames(styles.modal, className)}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-label="Create Conversation"
        ref={modalRef}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Create Conversation</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.typeSelector}>
            {/* @ts-ignore */}
            <SelectList
              id="conversation-type-select"
              label="Conversation Type"
              options={CONVERSATION_TYPES}
              value={activeType}
              onChange={setActiveType}
              disabled={isLoading}
            />
          </div>

          <form id="create-conversation-form" onSubmit={handleSubmit} className={styles.formGroup}>
            {activeType === 'CHANNEL' ? (
              <>
                <TextInput
                  id="channel-name-input"
                  label="Channel Name"
                  placeholder="e.g. #marketing"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                  required
                />
                <TextInput
                  id="channel-description-input"
                  label="Description"
                  placeholder="What's this channel about?"
                  value={channelDescription}
                  onChange={(e) => setChannelDescription(e.target.value)}
                  disabled={isLoading}
                />
              </>
            ) : (
              <TextInput
                id="dm-user-ids-input"
                label="User ID(s)"
                placeholder="Enter user IDs separated by comma"
                value={dmUserIds}
                onChange={(e) => setDmUserIds(e.target.value)}
                disabled={isLoading}
                autoFocus
                required
                name="dmUserIds"
              />
            )}

            {error && (
              <div className={styles.error}>
                {error.message || 'An error occurred while creating the conversation.'}
              </div>
            )}
          </form>
        </div>

        <div className={styles.footer}>
          <Button
            appearance="tertiary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            appearance="primary"
            type="button"
            onClick={() => handleSubmit()}
            disabled={isLoading || (activeType === 'CHANNEL' ? !channelName : !dmUserIds)}
          >
            {submitButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}