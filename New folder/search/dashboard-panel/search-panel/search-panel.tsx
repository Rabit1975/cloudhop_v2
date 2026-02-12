import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from '@cloudrabbit/design.navigation.link';
import { PanelCard } from '@cloudrabbit/cloudhop-platform.ui.panel-card';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { SearchIcon } from '@cloudrabbit/search.icons.search-icon';
import styles from './search-panel.module.scss';

export type SearchPanelProps = {
  /**
   * Additional class name for the panel container.
   */
  className?: string;

  /**
   * Inline styles for the panel.
   */
  style?: React.CSSProperties;

  /**
   * Placeholder text for the search input.
   * @default "Search CloudHop..."
   */
  placeholder?: string;
};

export function SearchPanel({
  className,
  style,
  placeholder = 'Search CloudHop...',
  ...rest
}: SearchPanelProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    const encodedQuery = encodeURIComponent(query.trim());
    navigate(`/search?query=${encodedQuery}`);
  }, [navigate, query]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    []
  );

  return (
    <PanelCard
      title="Global Search"
      icon={<SearchIcon className={styles.icon} />}
      className={classNames(styles.searchPanel, className)}
      style={style}
      variant="default"
      {...rest}
    >
      <div className={styles.content}>
        <div className={styles.inputContainer}>
          <TextInput
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={styles.input}
            aria-label="Global Search"
          />
          <button
            onClick={handleSearch}
            className={styles.searchButton}
            aria-label="Submit Search"
            type="button"
          >
            <SearchIcon className={styles.buttonIcon} />
          </button>
        </div>
        <p className={styles.helperText}>
          Press Enter to search across messages, channels, and files.
        </p>
      </div>
    </PanelCard>
  );
}