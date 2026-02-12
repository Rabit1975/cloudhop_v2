import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { Meeting, MeetingStatus } from '@cloudrabbit/hopmeets.entities.meeting';
import { MeetingSearchResult } from './meeting-search-result.js';

const mockMeetingData = {
  id: 'meet-123',
  topic: 'Weekly Design Sync',
  description: 'Discussing the new nebula design system updates and component migration.',
  startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  endTime: new Date(Date.now() + 86400000 + 3600000).toISOString(), // Tomorrow + 1hr
  hostId: 'user-1',
  participants: [],
  status: 'scheduled' as MeetingStatus,
  joinUrl: '/hopmeets/join/meet-123',
  createdAt: new Date().toISOString(),
};

// Create a mock SearchResult that wraps the Meeting
const mockResult = SearchResult.from({
  id: 'search-1',
  relevanceScore: 0.95,
  content: Meeting.from(mockMeetingData) as any,
});

const mockLiveMeetingData = {
  ...mockMeetingData,
  id: 'meet-456',
  topic: 'Town Hall - Q3 Goals',
  description: 'All hands meeting to review quarterly goals and achievements.',
  status: 'live' as MeetingStatus,
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 3600000).toISOString(),
};

const mockLiveResult = SearchResult.from({
  id: 'search-2',
  relevanceScore: 0.99,
  content: Meeting.from(mockLiveMeetingData) as any,
});

export const BasicMeetingResult = () => {
  return (
    <MockProvider>
      <div style={{ maxWidth: '400px', padding: '24px' }}>
        <MeetingSearchResult result={mockResult} />
      </div>
    </MockProvider>
  );
};

export const LiveMeetingResult = () => {
  return (
    <MockProvider>
      <div style={{ maxWidth: '400px', padding: '24px' }}>
        <MeetingSearchResult result={mockLiveResult} />
      </div>
    </MockProvider>
  );
};

export const DarkThemeResult = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          maxWidth: '400px', 
          padding: '48px', 
          background: 'var(--colors-surface-background)',
          minHeight: '300px' 
        }}>
          <MeetingSearchResult result={mockResult} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const GridDisplay = () => {
  return (
    <MockProvider>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px', 
        padding: '24px' 
      }}>
        <MeetingSearchResult result={mockResult} />
        <MeetingSearchResult result={mockLiveResult} />
        <MeetingSearchResult result={mockResult} />
      </div>
    </MockProvider>
  );
};