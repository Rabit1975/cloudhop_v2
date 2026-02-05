import { useEffect, useState } from 'react';
import { subscribe } from '../services/mockApi';
import { ActivityItem } from '../types';

export interface WebSocketEvent {
  type: string;
  payload: any;
  timestamp: string;
}

const NAMES = ['User_X', 'Dev_Alex', 'Design_Sarah', 'PM_Mike', 'Guest_User', 'Bot_System'];
const MESSAGES = [
  'Deployed v2.3 to prod.',
  'Can someone review PR #42?',
  'Starting the sync...',
  'Lounge vibe is great today.',
  'Meeting starting in 5m.',
  'Uploading assets...',
];

export function useWebSocket(userId: string, spaceId: string = 'global') {
  const [events, setEvents] = useState<WebSocketEvent[]>([]);

  useEffect(() => {
    // Temporarily disabled to prevent console spam
    console.log(`🔇 WebSocket disabled for user: ${userId} in space: ${spaceId}`);

    // TODO: Re-enable when we have proper WebSocket server
    return () => {
      console.log('🔇 WebSocket cleanup');
    };
  }, [userId, spaceId]);

  const clearEvents = () => {
    setEvents([]);
  };

  return { events, clearEvents };
}
