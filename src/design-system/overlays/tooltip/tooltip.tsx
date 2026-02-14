import React, { useState, useRef, ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import styles from './tooltip.module.scss';
import type { TooltipPosition } from './tooltip-position-type.js';

export type TooltipProps = {
  /**
   * The content to display inside the tooltip.
   */
  content: ReactNode;

  /**
   * The element that triggers the tooltip on hover or focus.
   */
  children: ReactNode;

  /**
   * The position of the tooltip relative to the child element.
   * Defaults to 'top'.
   */
  position?: TooltipPosition;

  /**
   * Additional class name for the wrapper element.
   */
  className?: string;

  /**
   * Additional class name for the tooltip bubble element.
   */
  tooltipClassName?: string;

  /**
   * Inline styles for the wrapper element.
   */
  style?: React.CSSProperties;

  /**
   * Delay in milliseconds before showing the tooltip.
   * Defaults to 200ms.
   */
  showDelay?: number;

  /**
   * Delay in milliseconds before hiding the tooltip.
   * Defaults to 0ms.
   */
  hideDelay?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function Tooltip({
  content,
  children,
  position = 'top',
  className,
  tooltipClassName,
  style,
  showDelay = 200,
  hideDelay = 0,
  ...rest
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showTooltip = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);
  }, [clearTimer, showDelay]);

  const hideTooltip = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  }, [clearTimer, hideDelay]);

  return (
    <div
      className={classNames(styles.container, className)}
      style={style}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      {...rest}
    >
      {children}
      <div
        role="tooltip"
        aria-hidden={!isVisible}
        className={classNames(
          styles.tooltip,
          styles[position],
          { [styles.visible]: isVisible },
          tooltipClassName
        )}
      >
        {content}
      </div>
    </div>
  );
}