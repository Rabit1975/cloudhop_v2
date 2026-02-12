import React, { useState, useCallback, type ChangeEvent, type CSSProperties } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { AiGenerateIcon } from '@cloudrabbit/ai.icons.ai-generate-icon';
import styles from './prompt-input.module.scss';

export type PromptInputProps = {
  /**
   * The current value of the input.
   */
  value?: string;

  /**
   * Default value for uncontrolled usage.
   */
  defaultValue?: string;

  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: string) => void;

  /**
   * Callback fired when the submit button is clicked.
   */
  onSubmit?: (value: string) => void;

  /**
   * Whether the input is loading/generating.
   */
  isLoading?: boolean;

  /**
   * Placeholder text.
   */
  placeholder?: string;

  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;

  /**
   * Maximum character length.
   */
  maxLength?: number;

  /**
   * Class name for the wrapper.
   */
  className?: string;

  /**
   * Style object for the wrapper.
   */
  style?: CSSProperties;
};

export function PromptInput({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  isLoading = false,
  disabled = false,
  placeholder = 'Describe what you want to create...',
  maxLength,
  className,
  style,
}: PromptInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const handleSubmit = useCallback(() => {
    if (currentValue && currentValue.trim().length > 0) {
      onSubmit?.(currentValue);
    }
  }, [currentValue, onSubmit]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Submit on Ctrl+Enter or Cmd+Enter
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className={classNames(styles.promptInput, className)} style={style}>
      <textarea
        className={styles.textarea}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
      />
      <div className={styles.footer}>
        {maxLength && (
          <span className={styles.characterCount}>
            {currentValue?.length || 0} / {maxLength}
          </span>
        )}
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={disabled || isLoading || !currentValue?.trim()}
          className={styles.submitButton}
        >
          {isLoading ? 'Generating...' : <AiGenerateIcon />}
          {!isLoading && 'Generate'}
        </Button>
      </div>
    </div>
  );
}