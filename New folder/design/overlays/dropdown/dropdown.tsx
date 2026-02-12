import React, { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import { DropdownPosition } from './dropdown-position-type.js';
import styles from './dropdown.module.scss';

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
} & React.HTMLAttributes<HTMLDivElement>; // Extend with HTML attributes for the root div

export function Dropdown({
  children,
  placeholder,
  openPosition = 'left',
  onClick,
  className,
  overlayClassName,
  ...rest
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
      {...rest}
    >
      <div
        className={styles.trigger}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
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