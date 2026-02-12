import React from 'react';
import { render } from '@testing-library/react';
import { mockLeaderboard } from '@cloudrabbit/gamehub.entities.leaderboard';
import { mockUsers } from '@cloudrabbit/cloudhop-platform.entities.user';
import { LeaderboardList } from './leaderboard-list.js';
import styles from './leaderboard-list.module.scss';

describe('LeaderboardList', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <LeaderboardList leaderboard={mockLeaderboard()} users={mockUsers()} />
    );
    expect(container).toBeInTheDocument();
  });

  it('should display "No scores recorded yet" when the leaderboard is empty', () => {
    const { container } = render(
      <LeaderboardList leaderboard={mockLeaderboard({ scores: [] })} users={mockUsers()} />
    );

    const emptyState = container.querySelector(`.${styles.emptyState}`);
    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent('No scores recorded yet. Be the first to play!');
  });

  it('should highlight the current user\'s score when currentUserId is provided', () => {
    const users = mockUsers();
    const currentUserId = users[0].userId;
    const leaderboard = mockLeaderboard({
      scores: [{ userId: currentUserId, score: 100, timestamp: Date.now() }],
    });

    const { container } = render(
      <LeaderboardList leaderboard={leaderboard} users={users} currentUserId={currentUserId} />
    );

    const highlightedRank = container.querySelector(`.${styles.rank}.${styles.highlight}`);
    expect(highlightedRank).toBeInTheDocument();
  });
});