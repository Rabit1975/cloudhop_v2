import React from 'react';
import classNames from 'classnames';
import styles from './spinner.module.scss';

export type SpinnerSize = 'small' | 'medium' | 'large' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'neutral' | 'nebula';

export type SpinnerProps = {
  /**
   * Size of the spinner.
   * @default 'medium'
   */
  size?: SpinnerSize;

  /**
   * Color variant of the spinner, affects the stroke color and effects.
   * @default 'primary'
   */
  variant?: SpinnerVariant;

  /**
   * If true, the spinner will be absolutely positioned to cover its parent container
   * with a backdrop blur effect.
   */
  overlay?: boolean;

  /**
   * Custom class name for the spinner container.
   */
  className?: string;

  /**
   * Custom inline styles.
   */
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export function Spinner({
  size = 'medium',
  variant = 'primary',
  overlay = false,
  className,
  style,
  ...rest
}: SpinnerProps) {
  return (
    <div
      className={classNames(
        styles.spinnerContainer,
        styles[size],
        styles[variant],
        { [styles.overlay]: overlay },
        className
      )}
      style={style}
      role="status"
      aria-label="Loading"
      {...rest}
    >
      <svg className={styles.spinnerSvg} viewBox="0 0 50 50">
        <circle
          className={styles.track}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
        <circle
          className={styles.indicator}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}