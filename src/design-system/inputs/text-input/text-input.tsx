import React, { useCallback } from 'react';
import classNames from 'classnames';
import styles from './text-input.module.scss';

export type TextInputProps = {
  /**
   * Unique identifier for the input.
   */
  id?: string;

  /**
   * The current value of the input.
   */
  value?: string | number;

  /**
   * Default value for uncontrolled usage.
   */
  defaultValue?: string | number;

  /**
   * Callback fired when the value changes.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when a key is pressed.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;

  /**
   * Error state or message. If string, displays the message.
   */
  error?: string | boolean;

  /**
   * Placeholder text.
   */
  placeholder?: string;

  /**
   * Label to display above the input.
   */
  label?: React.ReactNode;

  /**
   * HTML input type.
   */
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';

  /**
   * Name attribute for the input.
   */
  name?: string;

  /**
   * Additional class name for the wrapper.
   */
  className?: string;

  /**
   * Inline styles for the wrapper.
   */
  style?: React.CSSProperties;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onKeyDown' | 'value' | 'defaultValue' | 'className' | 'style'>;

export function TextInput({
  id,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  disabled,
  error,
  placeholder,
  label,
  type = 'text',
  name,
  className,
  style,
  ...rest
}: TextInputProps) {
  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : null;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        onKeyDown(event);
      }
    },
    [onKeyDown]
  );

  return (
    <div className={classNames(styles.container, className)} style={style}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          {...rest}
          id={id}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          className={classNames(styles.input, {
            [styles.hasError]: hasError,
          })}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-invalid={hasError}
          aria-describedby={errorMessage ? `${id}-error` : undefined}
        />
      </div>
      {errorMessage && (
        <span id={`${id}-error`} className={styles.errorMessage}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}