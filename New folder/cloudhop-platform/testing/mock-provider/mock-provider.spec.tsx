import React from 'react';
import { render } from '@testing-library/react';
import { BasicMockProvider } from './mock-provider.composition.js';

it('should render the children in the mock providers', () => {
  const { container } = render(<BasicMockProvider />);
  const rendered = container.querySelector('h1');
  expect(rendered).toBeTruthy();
});