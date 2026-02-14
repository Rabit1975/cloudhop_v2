import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CtaButton } from './cta-button.js';
import styles from './cta-button.module.scss';

describe('CtaButton', () => {
  it('should render the button with the provided text', () => {
    render(
      <MemoryRouter>
        <CtaButton>Click Me</CtaButton>
      </MemoryRouter>
    );
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  it('should apply the correct class names', () => {
    const { container } = render(
      <MemoryRouter>
        <CtaButton appearance="primary">Click Me</CtaButton>
      </MemoryRouter>
    );
    const button = container.querySelector(`.${styles.ctaButton}`);
    expect(button).toBeInTheDocument();
    const primaryClass = container.querySelector(`.${styles.primary}`);
    expect(primaryClass).toBeInTheDocument();
  });

  it('should render a disabled button when the disabled prop is true', () => {
    render(
      <MemoryRouter>
        <CtaButton disabled>Click Me</CtaButton>
      </MemoryRouter>
    );
    const button = screen.getByText('Click Me');
    expect(button).toBeDisabled();
  });
});