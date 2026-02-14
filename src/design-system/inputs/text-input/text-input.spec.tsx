import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextInput } from './text-input.js';
import styles from './text-input.module.scss';

describe('TextInput', () => {
  it('should render the input with a placeholder', () => {
    const { container } = render(<TextInput placeholder="Enter text here" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Enter text here');
  });

  it('should render the input with a label', () => {
    const { container } = render(<TextInput label="Email" id="email" />);
    const label = container.querySelector('label');
    expect(label).toHaveTextContent('Email');
    expect(label).toHaveAttribute('for', 'email');
  });

  it('should update the value on change', () => {
    const onChange = vi.fn();
    const { container } = render(<TextInput onChange={onChange} />);
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should apply error styles when error is true', () => {
    const { container } = render(<TextInput error={true} />);
    const input = container.querySelector('input');
    expect(input).toHaveClass(styles.hasError);
  });

  it('should display error message when error is a string', () => {
    const { container } = render(<TextInput error="This field is required" id="test-input" />);
    const errorMessage = container.querySelector(`.${styles.errorMessage}`);
    expect(errorMessage).toHaveTextContent('This field is required');
  });

  it('should call onKeyDown when a key is pressed', () => {
    const onKeyDown = vi.fn();
    const { container } = render(<TextInput onKeyDown={onKeyDown} />);
    const input = container.querySelector('input');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});