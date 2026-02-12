import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { SearchPanel } from './search-panel.js';

// Mock useNavigate from the external library
const mockNavigate = vi.fn();
vi.mock('@cloudrabbit/design.navigation.link', () => ({
  useNavigate: () => mockNavigate,
}));

describe('SearchPanel', () => {
  beforeEach(() => {
    mockNavigate.mockClear(); // Clear mock calls before each test
  });

  it('should render the "Global Search" title', () => {
    render(
      <MemoryRouter>
        <SearchPanel />
      </MemoryRouter>
    );
    expect(screen.getByText('Global Search')).toBeInTheDocument();
  });

  it('should update the query state on input change', () => {
    render(
      <MemoryRouter>
        <SearchPanel />
      </MemoryRouter>
    );
    const inputElement = screen.getByLabelText('Global Search');
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    expect(inputElement).toHaveValue('test query');
  });

  it('should navigate to search results on button click', () => {
    render(
      <MemoryRouter>
        <SearchPanel />
      </MemoryRouter>
    );
    const inputElement = screen.getByLabelText('Global Search');
    fireEvent.change(inputElement, { target: { value: 'new search term' } });

    const searchButton = screen.getByLabelText('Submit Search');
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/search?query=new%20search%20term');
  });

  it('should navigate to search results on Enter key press', () => {
    render(
      <MemoryRouter>
        <SearchPanel />
      </MemoryRouter>
    );
    const inputElement = screen.getByLabelText('Global Search');
    fireEvent.change(inputElement, { target: { value: 'another query' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/search?query=another%20query');
  });

  it('should use a custom placeholder text', () => {
    const customPlaceholder = 'Search everything...';
    render(
      <MemoryRouter>
        <SearchPanel placeholder={customPlaceholder} />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });
});