import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FeaturesSection } from './features-section.js';
import styles from './features-section.module.scss';

describe('FeaturesSection', () => {
  it('should render the title and subtitle', () => {
    render(
      <MemoryRouter>
        <FeaturesSection title="Test Title" subtitle="Test Subtitle" />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('should render the features', () => {
    const { container } = render(
      <MemoryRouter>
        <FeaturesSection />
      </MemoryRouter>
    );
    const gridElement = container.querySelector(`.${styles.grid}`);
    expect(gridElement).toBeInTheDocument();
  });
});