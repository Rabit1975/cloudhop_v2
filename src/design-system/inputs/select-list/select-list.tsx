import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import type { SelectOption } from './select-option-type.js';
import styles from './select-list.module.scss';

export type SelectListProps = {
  /**
   * The selected value(s).
   */
  value?: string;

  /**
   * Callback fired when an option is selected.
   */
  onChange?: (value: string) => void;

  /**
   * List of options to display.
   */
  options?: SelectOption[];

  /**
   * Placeholder text when no value is selected.
   */
  placeholder?: string;

  /**
   * Label text displayed above the select list.
   */
  label?: string;

  /**
   * Disables the interaction.
   */
  disabled?: boolean;

  /**
   * Additional class name for the root container.
   */
  className?: string;

  /**
   * Inline style for the root container.
   */
  style?: React.CSSProperties;
};

const defaultOptions: SelectOption[] = [
  { value: 'general', label: '# general' },
  { value: 'random', label: '# random' },
  { value: 'announcements', label: '# announcements' },
  { value: 'music', label: '# music-lounge' },
];

export function SelectList({
  options = defaultOptions,
  value,
  onChange,
  placeholder = 'Select a channel...',
  label,
  disabled = false,
  className,
  style,
}: SelectListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  }, [onChange]);

  const toggleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div 
      className={classNames(styles.selectListContainer, className)} 
      style={style}
      ref={containerRef}
    >
      {label && <label className={styles.label}>{label}</label>}
      
      <div 
        className={classNames(styles.trigger, {
          [styles.open]: isOpen,
          [styles.disabled]: disabled
        })}
        onClick={toggleOpen}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={styles.triggerContent}>
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className={styles.icon}>{selectedOption.icon}</span>}
              <span className={styles.text}>{selectedOption.label}</span>
            </>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>
        
        <div className={classNames(styles.arrowIcon, { [styles.rotated]: isOpen })}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className={styles.optionsList} role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={classNames(styles.optionItem, {
                [styles.selected]: option.value === value,
                [styles.disabled]: option.disabled
              })}
              onClick={() => !option.disabled && handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
            >
              <div className={styles.itemContent}>
                {option.icon && <span className={styles.itemIcon}>{option.icon}</span>}
                <span>{option.label}</span>
              </div>
              {option.value === value && (
                <div className={styles.checkIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}