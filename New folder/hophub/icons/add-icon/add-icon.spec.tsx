import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { AddIcon } from './add-icon.js';

describe('AddIcon', () => {
  it('should render the AddIcon component', () => {
    const { container } = render(
      <MockProvider>
        <AddIcon />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render the AddIcon with a specified size', () => {
    const { container } = render(
      <MockProvider>
        <AddIcon size={32} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });

  it('should render the AddIcon with a specified color', () => {
    const { container } = render(
      <MockProvider>
        <AddIcon color="var(--colors-primary-default)" />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('fill', 'var(--colors-primary-default)');
  });
});