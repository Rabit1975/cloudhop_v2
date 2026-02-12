import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from './avatar.js';
import styles from './avatar.module.scss';

describe('Avatar', () => {
  it('should render the avatar image when src is provided and image loads successfully', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(imgElement).toHaveAttribute('alt', 'User Avatar');
  });

  it('should render initials when src is not provided', () => {
    const { container } = render(<Avatar letters="AB" />);
    const initialsElement = container.querySelector(`.${styles.initials}`);
    expect(initialsElement).toBeInTheDocument();
    expect(initialsElement).toHaveTextContent('AB');
  });

  it('should display the status indicator when status is provided', () => {
    const { container } = render(<Avatar status="online" />);
    const statusIndicator = container.querySelector(`.${styles.statusIndicator}`);
    expect(statusIndicator).toBeInTheDocument();
  });
});