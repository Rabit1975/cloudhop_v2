import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MessageInput } from './message-input.js';
import styles from './message-input.module.scss';

describe('MessageInput', () => {
  it('should allow the user to type in the input field', () => {
    const { container } = render(
      <MockProvider>
        <MessageInput />
      </MockProvider>
    );
    const input = container.querySelector<HTMLInputElement>('input');
    fireEvent.change(input as HTMLInputElement, { target: { value: 'Hello CloudHop!' } });
    expect(input?.value).toBe('Hello CloudHop!');
  });

  it('should call onSendMessage when the send button is clicked and input is not empty', () => {
    const onSendMessage = vi.fn();
    const { container } = render(
      <MockProvider>
        <MessageInput onSendMessage={onSendMessage} />
      </MockProvider>
    );
    const input = container.querySelector<HTMLInputElement>('input');
    fireEvent.change(input as HTMLInputElement, { target: { value: 'Test message' } });
    const sendButton = container.querySelector<HTMLButtonElement>(`.${  styles.sendButton}`);
    fireEvent.click(sendButton as HTMLButtonElement);
    expect(onSendMessage).toHaveBeenCalledWith('Test message');
  });

  it('should disable the send button when the input is empty or disabled prop is true', () => {
    const { container, rerender } = render(
      <MockProvider>
        <MessageInput />
      </MockProvider>
    );
    const sendButton = container.querySelector<HTMLButtonElement>(`.${  styles.sendButton}`);
    expect(sendButton).toHaveClass(styles.disabled);

    rerender(
      <MockProvider>
        <MessageInput disabled />
      </MockProvider>
    );
    const disabledSendButton = container.querySelector<HTMLButtonElement>(`.${  styles.sendButton}`);
    expect(disabledSendButton).toHaveClass(styles.disabled);
  });
});