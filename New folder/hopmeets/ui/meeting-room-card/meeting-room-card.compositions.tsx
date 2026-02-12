import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';
import { MeetingRoomCard } from './meeting-room-card.js';

export const BasicMeetingRoom = () => {
  const room = new MeetingRoom(
    'room-01',
    'Open Lounge',
    50,
    false,
    'system'
  );

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '400px' }}>
          <MeetingRoomCard room={room} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const LiveMeetingRoom = () => {
  const room = new MeetingRoom(
    'room-02',
    'Daily Standup',
    15,
    false,
    'team-lead',
    'meeting-active-123'
  );

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '400px' }}>
          <MeetingRoomCard room={room} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const PrivateMeetingRoom = () => {
  const room = new MeetingRoom(
    'room-03',
    'Executive Board',
    8,
    true,
    'admin'
  );

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '400px' }}>
          <MeetingRoomCard room={room} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const MeetingRoomGrid = () => {
  const rooms = [
    new MeetingRoom('r1', 'General Chat', 100, false, 'sys', 'm1'),
    new MeetingRoom('r2', 'Gaming Lounge', 25, false, 'sys'),
    new MeetingRoom('r3', 'Music Studio', 10, true, 'sys'),
    new MeetingRoom('r4', 'Quiet Space', 5, false, 'sys'),
  ];

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: '32px', 
          backgroundColor: 'var(--colors-surface-background)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {rooms.map((room) => (
            <MeetingRoomCard 
              key={room.id} 
              room={room} 
              onEnter={(id) => console.log(`Entering room ${id}`)}
            />
          ))}
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};