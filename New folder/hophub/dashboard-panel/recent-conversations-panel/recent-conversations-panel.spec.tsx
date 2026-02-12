import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { createMockConversation } from '@cloudrabbit/hophub.entities.conversation';
import { RecentConversationsPanel } from './recent-conversations-panel.js';
import styles from './recent-conversations-panel.module.scss';

const mockConversations = [
  createMockConversation({
    id: 'c1',
    type: 'CHANNEL',
    name: '# general',
    unreadCount: 3,
    lastMessage: {
      id: 'm1',
      conversationId: 'c1',
      senderId: 'u2',
      text: 'Has anyone seen the new design?',
      type: 'TEXT',
      createdAt: new Date().toISOString(),
    }
  }),
];

describe('RecentConversationsPanel', () => {
  it('should render the panel title', () => {
    const { container } = render(
      <MockProvider>
        <RecentConversationsPanel conversations={mockConversations} />
      </MockProvider>
    );
    expect(container.querySelector(`.${styles.recentConversationsPanel}`)).toBeInTheDocument();
  });

  it('should render "View All" link in the footer', () => {
    render(
      <MockProvider>
        <RecentConversationsPanel conversations={mockConversations} />
      </MockProvider>
    );
    const viewAllLink = screen.getByText('View All');
    expect(viewAllLink).toBeInTheDocument();
  });

  it('should render conversation items when conversations are provided', () => {
    const { container } = render(
      <MockProvider>
        <RecentConversationsPanel conversations={mockConversations} />
      </MockProvider>
    );
    expect(container.querySelector(`.${styles.item}`)).toBeInTheDocument();
  });
});