import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Tabs } from './tabs.js';
import type { TabItem } from './tab-item-type.js';
import styles from './tabs.module.scss';

describe('Tabs', () => {
  const tabs: TabItem[] = [
    { label: 'Tab 1', href: '/tab1' },
    { label: 'Tab 2', href: '/tab2' },
  ];

  it('should render tabs with correct labels', () => {
    const { container } = render(
      <MemoryRouter>
        <Tabs tabs={tabs} />
      </MemoryRouter>
    );

    expect(container.querySelector(`.${styles.tab}:nth-child(1) span`)).toHaveTextContent('Tab 1');
    expect(container.querySelector(`.${styles.tab}:nth-child(2) span`)).toHaveTextContent('Tab 2');
  });

  it('should apply active class to the active tab', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/tab2']}>
        <Tabs tabs={tabs} />
      </MemoryRouter>
    );

    const tab2 = container.querySelector(`.${styles.tab}:nth-child(2)`);
    expect(tab2).toHaveClass(styles.active);
  });

  it('should render an icon if provided', () => {
    const tabsWithIcons: TabItem[] = [
      { label: 'Tab 1', href: '/tab1', icon: <svg data-testid="tab-icon" /> },
    ];

    const { container } = render(
      <MemoryRouter>
        <Tabs tabs={tabsWithIcons} />
      </MemoryRouter>
    );

    expect(container.querySelector('[data-testid="tab-icon"]')).toBeInTheDocument();
  });
});