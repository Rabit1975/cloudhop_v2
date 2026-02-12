import React from 'react';
import { render, screen } from '@testing-library/react';
import { NebulaBackground } from './nebula-background.js';
import styles from './nebula-background.module.scss';

describe('NebulaBackground', () => {
  it('should render children within the component', () => {
    render(
      <NebulaBackground>
        <div>Test Content</div>
      </NebulaBackground>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply the root class name', () => {
    const { container } = render(<NebulaBackground />);
    expect(container.firstChild).toHaveClass(styles.root);
  });

  it('should apply intensified style when intensified prop is true', () => {
    const { container } = render(<NebulaBackground intensified={true} />);
    const gradientLayer = container.querySelector(`.${styles.gradientLayer}`);
    expect(gradientLayer).toHaveStyle('opacity: 0.6');
  });
});