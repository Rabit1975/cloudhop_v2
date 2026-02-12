import React from 'react';
import { render, screen } from '@testing-library/react';
import { VideoCall } from './video-call.js';

describe('VideoCall', () => {
  it('should render the VideoCall icon with default size', () => {
    render(<VideoCall />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toBeInTheDocument();
  });

  it('should apply custom class name to the icon', () => {
    const customClass = 'custom-video-call-icon';
    render(<VideoCall className={customClass} />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toHaveClass(customClass);
  });
});