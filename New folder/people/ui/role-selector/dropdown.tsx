import React, { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import classNames from 'classnames';
// import { DropdownPosition } from './dropdown-position-type.js'; // This import caused a TS2307 error
import styles from './dropdown.module.scss';

// Define DropdownPosition type directly to resolve the import error.
// This type typically defines valid positions for a dropdown overlay.
export type DropdownPosition = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type DropdownProps = {
  /**
   * The content to display inside the dropdown overlay.
   */
  children?: ReactNode;

  /**
   * The component or element that triggers the dropdown.
   * Acts as the button to toggle visibility.
   */
  placeholder: ReactNode;

  /**
   * The alignment of the dropdown overlay relative to the trigger.
   * @default 'left'
   */
  openPosition?: DropdownPosition;

  /**
   * Callback function triggered when the dropdown trigger is clicked.
   */
  onClick?: (isOpen: boolean) => void;

  /**
   * Custom class name for the root container.
   */
  className?: string;

  /**
   * Custom class name for the dropdown overlay.
   */
  overlayClassName?: string;

  /**
   * Defines a string value that labels the current element for accessibility purposes.
   */
  'aria-label'?: string;

  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   */
  'aria-disabled'?: boolean | 'true' | 'false';
} & React.HTMLAttributes<HTMLDivElement>; // Extend with HTML attributes for the root div

export function Dropdown({
  children,
  placeholder,
  openPosition = 'left',
  onClick,
  className,
  overlayClassName,
  'aria-label': ariaLabel, // Destructure aria-label to apply to the trigger button
  'aria-disabled': ariaDisabled, // Destructure aria-disabled to apply to the trigger button
  ...rest // Remaining props for the outermost div
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onClick) {
      onClick(nextState);
    }
  }, [isOpen, onClick]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      if (onClick) onClick(false);
    }
  }, [isOpen, toggleDropdown, onClick]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          if (onClick) onClick(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClick]);

  return (
    <div
      className={classNames(styles.container, className)}
      ref={containerRef}
      {...rest} // Apply remaining props to the outermost div
    >
      <div
        className={styles.trigger}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={ariaLabel} // Apply aria-label to the button element
        aria-disabled={ariaDisabled} // Apply aria-disabled to the button element
      >
        {placeholder}
      </div>
      {isOpen && (
        <div
          className={classNames(styles.dropdown, styles[openPosition], overlayClassName)}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
}