import React from 'react';
import { render } from '@testing-library/react';
import { MusicNoteIcon } from './music-note-icon.js';
import styles from './music-note-icon.module.scss';

describe('MusicNoteIcon', () => {
  it('should render the MusicNoteIcon component with default props', () => {
    const { container } = render(<MusicNoteIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should apply the musicNoteIcon class', () => {
    const { container } = render(<MusicNoteIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveClass(styles.musicNoteIcon);
  });

  it('should render the MusicNoteIcon with a custom size', () => {
    const { container } = render(<MusicNoteIcon size={32} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });
});