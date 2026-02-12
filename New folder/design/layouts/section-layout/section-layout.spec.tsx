import React from 'react';
import { render } from '@testing-library/react';
import { SectionLayout } from './section-layout.js';
import styles from './section-layout.module.scss';

describe('SectionLayout', () => {
  it('should render the section with title and subtitle', () => {
    const { container } = render(
      <SectionLayout
        title="Section Title"
        subtitle="Section Subtitle"
      >
        <div>Section Content</div>
      </SectionLayout>
    );

    const titleElement = container.querySelector(`.${styles.title}`);
    const subtitleElement = container.querySelector(`.${styles.subtitle}`);
    const contentElement = container.querySelector(`.${styles.content}`);

    expect(titleElement).toHaveTextContent('Section Title');
    expect(subtitleElement).toHaveTextContent('Section Subtitle');
    expect(contentElement).toHaveTextContent('Section Content');
  });

  it('should apply custom class names', () => {
    const { container } = render(
      <SectionLayout
        className="custom-section"
        contentClassName="custom-content"
        headerClassName="custom-header"
        title="Title"
      >
        <div>Content</div>
      </SectionLayout>
    );

    const sectionElement = container.querySelector('.custom-section');
    const contentElement = container.querySelector('.custom-content');
    const headerElement = container.querySelector('.custom-header');

    expect(sectionElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
  });

  it('should render caption above title', () => {
    const { container } = render(
      <SectionLayout
        caption="Section Caption"
        title="Section Title"
      >
        <div>Section Content</div>
      </SectionLayout>
    );

    const captionElement = container.querySelector(`.${styles.caption}`);
    expect(captionElement).toHaveTextContent('Section Caption');
  });
});