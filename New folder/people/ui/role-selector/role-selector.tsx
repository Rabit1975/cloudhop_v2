import React, { useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { UserRole } from '@cloudrabbit/cloudhop-platform.entities.user';
import { SelectList, type SelectOption } from '@cloudrabbit/design.inputs.select-list';
import { Dropdown } from '@cloudrabbit/design.overlays.dropdown';
import type { RoleSelectorProps } from './role-selector-props.js';
import styles from './role-selector.module.scss';

const ALL_ROLES = Object.values(UserRole);

export function RoleSelector({
  selectedRoles = [],
  onChange,
  singleSelection = false,
  label = 'User Roles',
  placeholder = 'Select roles...',
  disabled = false,
  className,
}: RoleSelectorProps) {
  
  // Convert UserRole enum to SelectOption format
  const options: SelectOption[] = useMemo(() => {
    return ALL_ROLES.map((role) => ({
      value: role,
      label: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize first letter
    }));
  }, []);

  // Memoized content for the multi-select trigger, moved unconditionally
  const triggerContent = useMemo(() => {
    if (selectedRoles.length === 0) {
      return <span className={styles.placeholder}>{placeholder}</span>;
    }
    
    // Sort selected roles to maintain consistent order and display
    const sortedSelected = [...selectedRoles].sort();
    
    return (
      <span className={styles.valueText}>
        {sortedSelected.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
      </span>
    );
  }, [selectedRoles, placeholder]);

  const handleSingleChange = useCallback((value: string) => {
    if (onChange) {
      onChange([value as UserRole]);
    }
  }, [onChange]);

  const handleMultiChange = useCallback((role: UserRole) => {
    if (!onChange || disabled) return;
    
    const isSelected = selectedRoles.includes(role);
    let newRoles: UserRole[];

    if (isSelected) {
      newRoles = selectedRoles.filter((r) => r !== role);
    } else {
      newRoles = [...selectedRoles, role];
    }
    
    onChange(newRoles);
  }, [selectedRoles, onChange, disabled]);

  // Render SelectList for single selection mode
  if (singleSelection) {
    return (
      <SelectList
        label={label}
        placeholder={placeholder}
        options={options}
        value={selectedRoles[0] || ''}
        onChange={handleSingleChange}
        disabled={disabled}
        className={className}
      />
    );
  }

  // Custom Multi-Select Implementation using Dropdown
  const multiSelectAccessibleName = selectedRoles.length > 0
    ? `${label}: ${selectedRoles.map(r => r.charAt(0).toUpperCase() + r.slice(1)).sort().join(', ')}`
    : `${label}: ${placeholder}`;

  const MultiSelectTrigger = (
    <div 
      className={classNames(styles.trigger, { [styles.disabled]: disabled })}
      // The role, tabIndex, aria-haspopup, aria-expanded are handled by the Dropdown's internal trigger.
      // This div itself is content *within* the Dropdown's actual button.
    >
      <div className={styles.triggerContent}>
        {triggerContent}
      </div>
      <div className={styles.arrowIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );

  return (
    <div className={classNames(styles.container, className)}>
      {/* For multi-select, the Dropdown's internal trigger (role="button") will be given an aria-label */}
      {/* We use a simple div for visual label, or remove it if Dropdown's aria-label is sufficient */}
      {label && <div className={styles.label}>{label}</div>}
      <Dropdown
        placeholder={MultiSelectTrigger}
        openPosition="left"
        className={styles.dropdownContainer}
        overlayClassName={styles.dropdownOverlay}
        // Pass aria-label to the Dropdown's interactive trigger through the component's rest props
        // This relies on Dropdown component to pass rest props to its internal trigger, which it does based on its definition
        // Adding aria-label and aria-disabled to the root div to influence the dropdown's button element
        aria-label={multiSelectAccessibleName}
        aria-disabled={disabled}
      >
        <div className={styles.optionsList} role="listbox">
          {options.map((option) => {
            const isSelected = selectedRoles.includes(option.value as UserRole);
            return (
              <div
                key={option.value}
                className={classNames(styles.optionItem, { 
                  [styles.selected]: isSelected,
                  [styles.disabled]: disabled 
                })}
                onClick={(e) => {
                  if (disabled) return;
                  e.stopPropagation(); // Prevent closing dropdown on selection
                  handleMultiChange(option.value as UserRole);
                }}
                onKeyDown={(e) => { // Added onKeyDown for keyboard accessibility
                    if (disabled) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleMultiChange(option.value as UserRole);
                    }
                }}
                role="option"
                aria-selected={isSelected}
                tabIndex={disabled ? -1 : 0}
              >
                <div className={classNames(styles.checkbox, { [styles.checked]: isSelected })}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className={styles.optionLabel}>{option.label}</span>
              </div>
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
}