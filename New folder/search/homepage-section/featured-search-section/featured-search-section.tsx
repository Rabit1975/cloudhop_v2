import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { SectionLayout } from '@cloudrabbit/design.layouts.section-layout';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { Button } from '@cloudrabbit/design.actions.button';
import { SearchIcon } from '@cloudrabbit/search.icons.search-icon';
import styles from './featured-search-section.module.scss';

export type FeaturedSearchSectionProps = {
  /**
   * Title for the featured section.
   * @default 'Explore the Nebula'
   */
  title?: string;

  /**
   * Subtitle description.
   * @default 'Search for channels, users, and games across the CloudHop universe.'
   */
  subtitle?: string;

  /**
   * Caption text.
   * @default 'Global Search'
   */
  caption?: string;

  /**
   * Custom class name.
   */
  className?: string;
};

export function FeaturedSearchSection({
  title = 'Explore the Nebula',
  subtitle = 'Search for channels, users, and games across the CloudHop universe.',
  caption = 'Global Search',
  className,
}: FeaturedSearchSectionProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    },
    [query, navigate]
  );

  return (
    <SectionLayout
      align="center"
      title={title}
      subtitle={subtitle}
      caption={caption}
      className={classNames(styles.featuredSearchSection, className)}
      contentClassName={styles.content}
    >
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.inputContainer}>
          <TextInput
            className={styles.input}
            placeholder="Search CloudHop..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search query"
          />
          <SearchIcon className={styles.searchIcon} />
        </div>
        <Button
          type="submit"
          appearance="primary"
          className={styles.searchButton}
          disabled={!query.trim()}
        >
          Search
        </Button>
      </form>
    </SectionLayout>
  );
}