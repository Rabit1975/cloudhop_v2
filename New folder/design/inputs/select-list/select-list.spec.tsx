import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectList } from './select-list.js';
import type { SelectOption } from './select-option-type.js';
import styles from './select-list.module.scss';

describe('SelectList', () => {
  const options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('should render the select list with options', () => {
    const { container } = render(<SelectList options={options} />);
    const trigger = container.querySelector(`.${styles.trigger}`);
    expect(trigger).toBeInTheDocument();
  });

  it('should open the options list when the trigger is clicked', () => {
    const { container } = render(<SelectList options={options} />);
    const trigger = container.querySelector(`.${styles.trigger}`);
    fireEvent.click(trigger as Element);
    const optionsList = container.querySelector(`.${styles.optionsList}`);
    expect(optionsList).toBeInTheDocument();
  });

  it('should call onChange when an option is selected', () => {
    const onChange = vi.fn();
    const { container } = render(<SelectList options={options} onChange={onChange} />);
    const trigger = container.querySelector(`.${styles.trigger}`);
    fireEvent.click(trigger as Element);
    const optionItem = container.querySelector(`.${styles.optionItem}`);
    fireEvent.click(optionItem as Element);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});