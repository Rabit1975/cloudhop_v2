import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { mockMeeting } from '@cloudrabbit/hopmeets.entities.meeting';
import { MeetingCard } from './meeting-card.js';

const scheduledMeeting = mockMeeting({
  topic: 'Weekly Design Sync',
  description: 'Reviewing the latest nebula theme updates and card components for the CloudHop platform. Please prepare your design files.',
  startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  endTime: new Date(Date.now() + 90000000).toISOString(),
  status: 'scheduled'
}).toObject();

const liveMeeting = mockMeeting({
  topic: 'CloudHop Town Hall',
  description: 'All-hands meeting to discuss Q4 roadmap and upcoming game hub features.',
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 3600000).toISOString(),
  status: 'live'
}).toObject();

const endedMeeting = mockMeeting({
  topic: 'Incident Post-Mortem',
  description: 'Analysis of yesterday\'s downtime in the music streaming service.',
  startTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  endTime: new Date(Date.now() - 82800000).toISOString(),
  status: 'ended'
}).toObject();

export const ScheduledMeetingCard = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '400px' }}>
          <MeetingCard meeting={scheduledMeeting} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const LiveMeetingCard = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '32px', 
          maxWidth: '400px',
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <MeetingCard meeting={liveMeeting} style={{ width: '100%' }} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const MeetingGrid = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: '32px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px',
          backgroundColor: 'var(--colors-surface-secondary)'
        }}>
          <MeetingCard meeting={liveMeeting} />
          <MeetingCard meeting={scheduledMeeting} />
          <MeetingCard meeting={endedMeeting} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};