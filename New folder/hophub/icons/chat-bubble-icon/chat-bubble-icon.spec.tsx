import React from 'react';
import { render } from '@testing-library/react';
import { ChatBubbleIcon } from './chat-bubble-icon.js';

describe('ChatBubbleIcon', () => {
  it('should render the chat bubble icon', () => {
    const { container } = render(<ChatBubbleIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should apply the provided color', () => {
    const color = 'var(--colors-primary-default)';
    const { container } = render(<ChatBubbleIcon color={color} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', color);
  });

  it('should apply the provided size', () => {
    const size = 32;
    const { container } = render(<ChatBubbleIcon size={size} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', size.toString());
    expect(svg).toHaveAttribute('height', size.toString());
  });
});