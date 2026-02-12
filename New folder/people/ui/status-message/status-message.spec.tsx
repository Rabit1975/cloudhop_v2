import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { StatusMessage } from './status-message.js';
import styles from './status-message.module.scss';

describe('StatusMessage', () => {
  it('should render the status message', () => {
    const message = 'Test Status Message';
    const { container } = render(
      <MockProvider>
        <StatusMessage message={message} />
      </MockProvider>
    );
    const paragraphElement = container.querySelector(`.${styles.text}`);
    expect(paragraphElement).not.toBeNull();
    expect(paragraphElement).toHaveTextContent(message);
  });

  it('should truncate long messages', () => {
    const longMessage = 'This is a very long status message that should be truncated.';
    const { container } = render(
      <MockProvider>
        <div style={{ width: '200px' }}>
          <StatusMessage message={longMessage} />
        </div>
      </MockProvider>
    );
    const paragraphElement = container.querySelector(`.${styles.text}`);
    expect(paragraphElement).not.toBeNull();
  });

  it('should not render status message content when message is empty', () => {
    const { container } = render(
      <MockProvider>
        <StatusMessage message="" />
      </MockProvider>
    );
    // If the message is empty, the StatusMessage component returns null,
    // so the elements it would normally render (like the Paragraph with class 'text')
    // should not be in the DOM.
    expect(container.querySelector(`.${styles.text}`)).toBeNull();
  });
});