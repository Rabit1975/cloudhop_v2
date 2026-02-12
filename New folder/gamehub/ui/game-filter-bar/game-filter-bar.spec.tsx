import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { GameFilterBar } from './game-filter-bar.js';

describe('GameFilterBar', () => {
  const mockGenreOptions = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
  ];

  it('should call onFilterChange when genre is selected', () => {
    const onFilterChange = vi.fn();
    render(
      <MockProvider>
        <GameFilterBar genreOptions={mockGenreOptions} onFilterChange={onFilterChange} />
      </MockProvider>
    );

    const genreSelect = screen.getByText('All Genres');
    fireEvent.click(genreSelect);
    const actionOption = screen.getByText('Action');
    fireEvent.click(actionOption);

    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith({ genre: 'action', platform: '', developer: '' });
  });

  it('should call onFilterChange when developer is typed', () => {
    const onFilterChange = vi.fn();
    render(
      <MockProvider>
        <GameFilterBar genreOptions={mockGenreOptions} onFilterChange={onFilterChange} />
      </MockProvider>
    );

    const developerInput = screen.getByPlaceholderText('Search developer...');
    fireEvent.change(developerInput, { target: { value: 'TestDev' } });

    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith({ genre: '', platform: '', developer: 'TestDev' });
  });

  it('should clear filters when clear button is clicked', () => {
    const onFilterChange = vi.fn();
    render(
      <MockProvider>
        <GameFilterBar genreOptions={mockGenreOptions} onFilterChange={onFilterChange} />
      </MockProvider>
    );

    const developerInput = screen.getByPlaceholderText('Search developer...');
    fireEvent.change(developerInput, { target: { value: 'TestDev' } });

    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearButton);

    expect(onFilterChange).toHaveBeenCalledTimes(2);
    expect(onFilterChange).toHaveBeenLastCalledWith({ genre: '', platform: '', developer: '' });
  });
});