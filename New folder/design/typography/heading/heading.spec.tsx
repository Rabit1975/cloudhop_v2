import React from 'react';
import { render } from '@testing-library/react';
import { Heading } from './heading.js';
import styles from './heading.module.scss';

describe('Heading Component', () => {
  it('should render the heading with the correct text', () => {
    const { getByText } = render(<Heading>Test Heading</Heading>);
    const headingElement = getByText('Test Heading');
    expect(headingElement).toBeInTheDocument();
  });

  it('should apply the correct visual level class', () => {
    const { container } = render(<Heading visualLevel="display-large">Test Heading</Heading>);
    const headingElement = container.querySelector('h1');
    expect(headingElement).toHaveClass(styles.displayLarge);
  });

  it('should apply the inverse color class when inverseColor is true', () => {
    const { container } = render(<Heading inverseColor>Test Heading</Heading>);
    const headingElement = container.querySelector('h1');
    expect(headingElement).toHaveClass(styles.inverse);
  });
});