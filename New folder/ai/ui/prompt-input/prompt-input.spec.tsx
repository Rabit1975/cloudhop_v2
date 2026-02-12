import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { PromptInput } from './prompt-input.js';
import styles from './prompt-input.module.scss';

describe('PromptInput', () => {
  it('should update textarea value when typing', () => {
    const { container } = render(
      <MockProvider>
        <PromptInput onChange={() => {}} />
      </MockProvider>
    );
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test prompt' } });
    expect(textarea.value).toBe('test prompt');
  });

  it('should call onSubmit when pressing Ctrl+Enter', () => {
    const onSubmit = vi.fn();
    const { container } = render(
      <MockProvider>
        <PromptInput onSubmit={onSubmit} />
      </MockProvider>
    );
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test prompt' } });
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onSubmit).toHaveBeenCalledWith('test prompt');
  });

  it('should display the generate button with label', () => {
    const { container } = render(
      <MockProvider>
        <PromptInput />
      </MockProvider>
    );
    const button = container.querySelector('button');
    expect(button).toBeDefined();
    expect(button?.textContent).toContain('Generate');
  });
});