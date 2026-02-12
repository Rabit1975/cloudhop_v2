import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { SelectList, type SelectOption } from '@cloudrabbit/design.inputs.select-list';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { Button } from '@cloudrabbit/design.actions.button';
import type { GameFilters } from './game-filters-type.js';
import styles from './game-filter-bar.module.scss';

export type GameFilterBarProps = {
  /**
   * Callback fired when any filter changes.
   */
  onFilterChange?: (filters: GameFilters) => void;

  /**
   * Available genre options for the dropdown.
   */
  genreOptions?: SelectOption[];

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: React.CSSProperties;
};

const defaultPlatformOptions: SelectOption[] = [
  { value: 'html5', label: 'HTML5' },
  { value: 'unity', label: 'Unity WebGL' },
  { value: 'external_stream', label: 'Stream' },
];

export function GameFilterBar({
  onFilterChange,
  genreOptions = [],
  className,
  style,
}: GameFilterBarProps) {
  const [filters, setFilters] = useState<GameFilters>({
    genre: '',
    platform: '',
    developer: '',
  });

  const handleFilterUpdate = useCallback(
    (newFilters: GameFilters) => {
      setFilters(newFilters);
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
    },
    [onFilterChange]
  );

  const handleGenreChange = useCallback(
    (value: string) => {
      handleFilterUpdate({ ...filters, genre: value });
    },
    [filters, handleFilterUpdate]
  );

  const handlePlatformChange = useCallback(
    (value: string) => {
      handleFilterUpdate({ ...filters, platform: value });
    },
    [filters, handleFilterUpdate]
  );

  const handleDeveloperChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFilterUpdate({ ...filters, developer: event.target.value });
    },
    [filters, handleFilterUpdate]
  );

  const handleClearFilters = useCallback(() => {
    const clearedFilters = {
      genre: '',
      platform: '',
      developer: '',
    };
    handleFilterUpdate(clearedFilters);
  }, [handleFilterUpdate]);

  return (
    <div className={classNames(styles.container, className)} style={style}>
      <div className={styles.filterItem}>
        <SelectList
          label="Genre"
          placeholder="All Genres"
          options={genreOptions}
          value={filters.genre}
          onChange={handleGenreChange}
        />
      </div>

      <div className={styles.filterItem}>
        <SelectList
          label="Platform"
          placeholder="All Platforms"
          options={defaultPlatformOptions}
          value={filters.platform}
          onChange={handlePlatformChange}
        />
      </div>

      <div className={styles.filterItem}>
        <TextInput
          label="Developer"
          placeholder="Search developer..."
          value={filters.developer}
          onChange={handleDeveloperChange}
          className={styles.developerInput}
        />
      </div>

      <div className={styles.actions}>
        <Button appearance="tertiary" onClick={handleClearFilters} className={styles.clearButton}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}