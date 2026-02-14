import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { mockLeaderboard } from '@cloudrabbit/gamehub.entities.leaderboard';
import { mockUsers, User, UserRole } from '@cloudrabbit/cloudhop-platform.entities.user'; // Added User to import
import { LeaderboardList } from './leaderboard-list.js';

// Setup mock data
const users = mockUsers();
const currentUser = new User(
  'user-current', 
  'NeonRider', 
  'Neon Rider', 
  'neon@hop.com', 
  [UserRole.User], 
  'https://i.pravatar.cc/150?u=current'
);

const allUsers = [...users, currentUser];

const leaderboard = mockLeaderboard({
  scores: [
    { userId: users[0].userId, score: 12500, timestamp: Date.now() - 3600000 },
    { userId: 'user-current', score: 10200, timestamp: Date.now() - 7200000 },
    { userId: users[1].userId, score: 8400, timestamp: Date.now() - 86400000 },
    { userId: users[2].userId, score: 5600, timestamp: Date.now() - 172800000 },
  ]
});

export const BasicLeaderboard = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '48px', 
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <h2 style={{ 
            marginBottom: '24px', 
            color: 'var(--colors-text-primary)',
            fontSize: 'var(--typography-sizes-heading-h3)'
          }}>
            Global Rankings
          </h2>
          <LeaderboardList 
            leaderboard={leaderboard} 
            users={allUsers}
          />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const WithGameBannerAndHighlight = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '48px', 
        backgroundColor: '#0f172a', // Hardcoded dark bg to match nebula theme feel
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <div style={{
            marginBottom: '32px',
            borderRadius: 'var(--borders-radius-large)',
            overflow: 'hidden',
            position: 'relative',
            height: '240px',
            boxShadow: 'var(--effects-shadows-large)'
          }}>
            <img 
              src="https://storage.googleapis.com/bit-generated-images/images/image_a_vibrant_and_futuristic_digit_0_1770834020665.png"
              alt="Game Banner"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '32px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
            }}>
              <h1 style={{ 
                margin: 0, 
                color: '#fff',
                fontSize: 'var(--typography-sizes-display-small)',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                Cyber Racer 2077
              </h1>
              <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.8)' }}>Weekly Championship</p>
            </div>
          </div>

          <LeaderboardList 
            leaderboard={leaderboard} 
            users={allUsers}
            currentUserId="user-current"
          />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const LoadingAndEmptyStates = () => {
  const emptyBoard = mockLeaderboard({ scores: [] });
  
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '48px', 
        backgroundColor: 'var(--colors-surface-background)', 
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px'
      }}>
        <div>
          <h4 style={{ marginBottom: '16px', color: 'var(--colors-text-secondary)' }}>Loading State</h4>
          <LeaderboardList 
            leaderboard={leaderboard} 
            users={[]}
            loading={true}
          />
        </div>

        <div>
          <h4 style={{ marginBottom: '16px', color: 'var(--colors-text-secondary)' }}>Empty State</h4>
          <LeaderboardList 
            leaderboard={emptyBoard} 
            users={[]}
          />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};