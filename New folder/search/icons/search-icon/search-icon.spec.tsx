import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { SearchIcon } from './search-icon.js';

describe('SearchIcon', () => {
  it('should render the search icon', () => {
    const { container } = render(
      <MockProvider>
        <SearchIcon />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should apply the provided size to the icon', () => {
    const size = 32;
    const { container } = render(
      <MockProvider>
        <SearchIcon size={size} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', size.toString());
    expect(svgElement).toHaveAttribute('height', size.toString());
  });

  it('should apply the provided color to the icon', () => {
    const color = 'var(--colors-primary-default)';
    const { container } = render(
      <MockProvider>
        <SearchIcon color={color} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('fill', color);
  });
});