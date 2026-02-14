import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Dropdown } from './dropdown.js';
import styles from './dropdown.module.scss';

describe('Dropdown', () => {
  it('should open and close the dropdown on placeholder click', () => {
    const placeholderText = 'Open Dropdown';
    const { container } = render(
      <Dropdown placeholder={<button>{placeholderText}</button>}>
        <div>Dropdown Content</div>
      </Dropdown>
    );

    const placeholderButton = container.querySelector('button');
    expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();

    if (placeholderButton) {
      fireEvent.click(placeholderButton);
    }

    expect(screen.getByText('Dropdown Content')).toBeInTheDocument();

    if (placeholderButton) {
      fireEvent.click(placeholderButton);
    }

    expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
  });

  it('should close the dropdown when clicking outside', () => {
    const placeholderText = 'Open Dropdown';
    const { container } = render(
      <Dropdown placeholder={<button>{placeholderText}</button>}>
        <div>Dropdown Content</div>
      </Dropdown>
    );

    const placeholderButton = container.querySelector('button');
    if (placeholderButton) {
      fireEvent.click(placeholderButton);
    }
    expect(screen.getByText('Dropdown Content')).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
  });

  it('should apply the correct open position class', () => {
    const placeholderText = 'Open Dropdown';
    const openPosition = 'right';
    const { container } = render(
      <Dropdown placeholder={<button>{placeholderText}</button>} openPosition={openPosition}>
        <div>Dropdown Content</div>
      </Dropdown>
    );

    const placeholderButton = container.querySelector('button');
    if (placeholderButton) {
      fireEvent.click(placeholderButton);
    }
    const dropdownElement = container.querySelector(`.${styles.dropdown}`);
    expect(dropdownElement).toHaveClass(styles[openPosition]);
  });
});