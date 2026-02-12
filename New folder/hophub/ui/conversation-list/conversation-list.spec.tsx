import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { createMockConversation } from '@cloudrabbit/hophub.entities.conversation';
import { useConversations } from '@cloudrabbit/hophub.hooks.use-conversations';
import { ConversationList } from './conversation-list.js';
import styles from './conversation-list.module.scss';

// Mock the useConversations hook
vi.mock('@cloudrabbit/hophub.hooks.use-conversations', () => ({
  useConversations: vi.fn(),
}));

describe('ConversationList', () => {
  const mockUseConversations = useConversations as unknown as ReturnType<typeof vi.fn>;

  const mockConversations = [
    createMockConversation({ id: '1', name: 'Channel 1', type: 'CHANNEL' }),
    createMockConversation({ id: '2', name: 'DM 1', type: 'DM' }),
  ];

  beforeEach(() => {
    mockUseConversations.mockReset();
    // Default mock implementation for useConversations
    mockUseConversations.mockReturnValue({
      conversations: [],
      loading: false,
      error: undefined,
    });
  });

  it('renders "No conversations found" when conversations array is empty', () => {
    render(
      <MockProvider>
        <ConversationList conversations={[]} currentUserId="user1" />
      </MockProvider>
    );
    const statusElement = screen.getByText(/No conversations found/i);
    expect(statusElement).toBeInTheDocument();
  });

  it('renders conversation list items when conversations are provided', () => {
    const { container } = render(
      <MockProvider>
        <ConversationList conversations={mockConversations} currentUserId="user1" />
      </MockProvider>
    );

    const conversationItems = container.querySelectorAll(`.${styles.item}`);
    expect(conversationItems.length).toBe(mockConversations.length);
    expect(screen.getByText('Channel 1')).toBeInTheDocument();
    expect(screen.getByText('DM 1')).toBeInTheDocument();
  });

  it('renders "Loading conversations..." when loading and no conversations are passed', () => {
    // Mock useConversations to return loading: true
    mockUseConversations.mockReturnValue({
      conversations: [],
      loading: true,
      error: undefined,
    });

    render(
        <MockProvider>
          <ConversationList currentUserId="user1" />
        </MockProvider>
      );
    const loadingElement = screen.getByText('Loading conversations...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders "Unable to load conversations" when there is an error and no conversations are passed', () => {
    mockUseConversations.mockReturnValue({
      conversations: [],
      loading: false,
      error: new Error('Network error'),
    });

    render(
      <MockProvider>
        <ConversationList currentUserId="user1" />
      </MockProvider>
    );
    const errorElement = screen.getByText('Unable to load conversations');
    expect(errorElement).toBeInTheDocument();
  });
});