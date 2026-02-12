import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageLayout } from './page-layout.js';
import styles from './page-layout.module.scss';

describe('PageLayout', () => {
  it('should render children within the content area', () => {
    const { container } = render(
      <MemoryRouter>
        <PageLayout>
          <div data-testid="test-child">Hello World</div>
        </PageLayout>
      </MemoryRouter>
    );

    const contentArea = container.querySelector(`.${styles.content}`);
    expect(contentArea).toBeInTheDocument();

    const childElement = container.querySelector('[data-testid="test-child"]');
    expect(contentArea).toContainElement(childElement as HTMLElement);
  });

  it('should apply additional class name to the content area', () => {
    const { container } = render(
      <MemoryRouter>
        <PageLayout contentClassName="custom-content-class">
          <div>Hello World</div>
        </PageLayout>
      </MemoryRouter>
    );
    const contentArea = container.querySelector(`.${styles.content}`);
    expect(contentArea).toHaveClass('custom-content-class');
  });

  it('should render tabs when provided', () => {
    const tabs = [
      { label: 'Tab 1', href: '/tab1' },
      { label: 'Tab 2', href: '/tab2' },
    ];
    const { container } = render(
      <MemoryRouter>
        <PageLayout tabs={tabs}>
          <div>Hello World</div>
        </PageLayout>
      </MemoryRouter>
    );
    const tabsContainer = container.querySelector(`.${styles.tabsContainer}`);
    expect(tabsContainer).toBeInTheDocument();
  });
});