import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { NotFoundPage } from './not-found-page.js';
import styles from './not-found-page.module.scss';

describe('NotFoundPage', () => {
  it('should render the component with the correct class', () => {
    const { container } = render(
      <MockProvider>
        <NotFoundPage />
      </MockProvider>
    );
    const notFoundPage = container.querySelector(`.${styles.notFoundPage}`);
    expect(notFoundPage).toBeInTheDocument();
  });

  it('should render the heading and description', () => {
    const { container } = render(
      <MockProvider>
        <NotFoundPage />
      </MockProvider>
    );
    const heading = container.querySelector(`.${styles.title}`);
    const description = container.querySelector(`.${styles.description}`);
    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should render the link with correct text', () => {
    const { container } = render(
      <MockProvider>
        <NotFoundPage />
      </MockProvider>
    );
    const link = container.querySelector(`.${styles.homeButton}`);
    expect(link).toHaveTextContent('Return to HopHub');
  });
});