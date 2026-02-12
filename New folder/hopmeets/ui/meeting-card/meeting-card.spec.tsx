import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockMeeting } from '@cloudrabbit/hopmeets.entities.meeting';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MeetingCard } from './meeting-card.js';

describe('MeetingCard', () => {
  it('renders a scheduled meeting correctly', () => {
    const scheduledMeeting = mockMeeting({
      topic: 'Team Standup',
      startTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
      endTime: new Date(Date.now() + 90 * 60 * 1000).toISOString(), // 1.5 hours from now
      status: 'scheduled',
      description: 'Daily sync to discuss progress.',
    }).toObject();

    render(
      <MockProvider>
        <MeetingCard meeting={scheduledMeeting} />
      </MockProvider>
    );

    expect(screen.getByText('Team Standup')).toBeInTheDocument();
    expect(screen.getByText('Video Meeting')).toBeInTheDocument();
    expect(screen.getByText('Daily sync to discuss progress.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Join Meeting/i })).toBeInTheDocument();
  });

  it('renders a live meeting correctly with "Live Now" status', () => {
    const liveMeeting = mockMeeting({
      topic: 'Project Review',
      startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
      endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 mins from now
      status: 'live',
      description: 'Review of current sprint progress.',
    }).toObject();

    render(
      <MockProvider>
        <MeetingCard meeting={liveMeeting} />
      </MockProvider>
    );

    expect(screen.getByText('Project Review')).toBeInTheDocument();
    expect(screen.getByText('Live Now')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Join Meeting/i })).toBeInTheDocument();
  });

  it('renders an ended meeting with "Ended" button and disabled join', () => {
    const endedMeeting = mockMeeting({
      topic: 'Retrospective',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      endTime: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      status: 'ended',
      description: 'Post-mortem for recent release.',
    }).toObject();

    render(
      <MockProvider>
        <MeetingCard meeting={endedMeeting} />
      </MockProvider>
    );

    expect(screen.getByText('Retrospective')).toBeInTheDocument();
    const joinButton = screen.getByRole('button', { name: /Ended/i });
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toBeDisabled();
  });

  it('does not render description if showDescription is false', () => {
    const meeting = mockMeeting({
      topic: 'Secret Meeting',
      description: 'Top secret details.',
      status: 'scheduled',
    }).toObject();

    render(
      <MockProvider>
        <MeetingCard meeting={meeting} showDescription={false} />
      </MockProvider>
    );

    expect(screen.queryByText('Top secret details.')).not.toBeInTheDocument();
  });

  it('displays "View Details" link', () => {
    const meeting = mockMeeting({ status: 'scheduled' }).toObject();

    render(
      <MockProvider>
        <MeetingCard meeting={meeting} />
      </MockProvider>
    );

    expect(screen.getByRole('link', { name: /View Details/i })).toBeInTheDocument();
  });
});