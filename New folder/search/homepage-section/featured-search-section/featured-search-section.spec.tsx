import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { vi } from 'vitest';
import { FeaturedSearchSection } from './featured-search-section.js';
import styles from './featured-search-section.module.scss';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
  };
});

describe('FeaturedSearchSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the title and subtitle', () => {
    const { container } = render(
      <MockProvider>
        <FeaturedSearchSection title="Test Title" subtitle="Test Subtitle" />
      </MockProvider>
    );

    expect(container.textContent).toContain('Test Title');
    expect(container.textContent).toContain('Test Subtitle');
  });

  it('should update the query state on input change', () => {
    const { container } = render(
      <MockProvider>
        <FeaturedSearchSection />
      </MockProvider>
    );
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
  });

  it('should navigate to search page on form submit with query', () => {
    const { container } = render(
      <MockProvider>
        <FeaturedSearchSection />
      </MockProvider>
    );

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test search' } });
    const button = container.querySelector(`.${styles.searchButton}`) as HTMLButtonElement;
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/search?q=test%20search');
  });
});