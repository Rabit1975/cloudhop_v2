import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockMusicStudioProjects } from '@cloudrabbit/music.entities.music-studio-project';
import { MusicStudioProjectCard } from './music-studio-project-card.js';
import styles from './music-studio-project-card.module.scss';

// Mock useNavigate globally using vi.mock
const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>), // Explicitly cast to object for spreading
    useNavigate: () => mockUseNavigate,
  };
});

describe('MusicStudioProjectCard', () => {
  const mockProject = mockMusicStudioProjects()[0]; // Get the first project from the array

  beforeEach(() => {
    mockUseNavigate.mockClear(); // Clear mock calls before each test
  });

  it('should render the project name', () => {
    render(
      <MemoryRouter>
        <MusicStudioProjectCard project={mockProject} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockProject.name)).toBeInTheDocument();
  });

  it('should navigate to the project editor on card click', () => {
    render(
      <MemoryRouter>
        <MusicStudioProjectCard project={mockProject} />
      </MemoryRouter>
    );

    const cardElement = screen.getByText(mockProject.name).closest(`.${styles.musicStudioProjectCard}`);
    fireEvent.click(cardElement as Element);
    expect(mockUseNavigate).toHaveBeenCalledWith(`/music/studio?projectId=${mockProject.id}`);
  });

  it('should stop navigation when edit button is clicked', () => {
    render(
      <MemoryRouter>
        <MusicStudioProjectCard project={mockProject} />
      </MemoryRouter>
    );
    // The "Edit" is rendered as a Link (<a> tag) because it has an href prop
    const editButton = screen.getByRole('link', { name: /edit/i });
    fireEvent.click(editButton as Element);
    expect(mockUseNavigate).not.toHaveBeenCalled();
  });
});