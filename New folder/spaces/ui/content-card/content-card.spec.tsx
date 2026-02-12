import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockContent } from '@cloudrabbit/spaces.entities.content';
import { ContentCard } from './content-card.js';
import styles from './content-card.module.scss';

describe('ContentCard', () => {
  const mockContentData = mockContent({
    title: 'Test Content',
    body: 'This is a test content card.',
    type: 'document',
  });

  it('should render the content title and excerpt', () => {
    const { container } = render(
      <MemoryRouter>
        <ContentCard content={mockContentData} href="/test" />
      </MemoryRouter>
    );

    const titleElement = container.querySelector(`.${styles.title}`);
    const excerptElement = container.querySelector(`.${styles.excerpt}`);

    expect(titleElement).toHaveTextContent('Test Content');
    expect(excerptElement).toHaveTextContent('This is a test content card.');
  });

  it('should render the type tag with the correct text', () => {
    const { container } = render(
      <MemoryRouter>
        <ContentCard content={mockContentData} href="/test" />
      </MemoryRouter>
    );

    const typeTagElement = container.querySelector(`.${styles.typeTag}`);
    expect(typeTagElement).toHaveTextContent('document');
  });

  it('should render the "View Details" action text', () => {
    const { container } = render(
      <MemoryRouter>
        <ContentCard content={mockContentData} href="/test" />
      </MemoryRouter>
    );

    const actionTextElement = container.querySelector(`.${styles.actionText}`);
    expect(actionTextElement).toHaveTextContent('View Details →');
  });
});