import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { DirectMessageSearchResultItem } from './direct-message-search-result-item.js';
import styles from './direct-message-search-result-item.module.scss';

const mockResult = {
  id: 'dm-123',
  title: 'Alice, Bob',
  description: 'Alice: Hey, did you see the new design specs?',
  type: 'DM',
  link: '/hophub?conversationId=dm-123',
  imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_user_avatar_icon_for__0_1770835141208.png',
  data: {
    participantIds: ['user-1', 'user-2'],
    lastMessageAt: '2023-10-27T10:00:00Z',
  },
};

describe('DirectMessageSearchResultItem', () => {
  it('should render the title and description from the result prop', () => {
    render(
      <MemoryRouter>
        <CloudrabbitTheme>
          <DirectMessageSearchResultItem result={mockResult} />
        </CloudrabbitTheme>
      </MemoryRouter>
    );

    expect(screen.getByText('Alice, Bob')).toBeInTheDocument();
    expect(screen.getByText('Alice: Hey, did you see the new design specs?')).toBeInTheDocument();
  });

  it('should apply the directMessageSearchResultItem class', () => {
    const { container } = render(
      <MemoryRouter>
        <CloudrabbitTheme>
          <DirectMessageSearchResultItem result={mockResult} />
        </CloudrabbitTheme>
      </MemoryRouter>
    );
    const directMessageSearchResultItem = container.querySelector(`.${styles.directMessageSearchResultItem}`);

    expect(directMessageSearchResultItem).toBeInTheDocument();
  });

  it('should render "Direct Message" as the type', () => {
    render(
      <MemoryRouter>
        <CloudrabbitTheme>
          <DirectMessageSearchResultItem result={mockResult} />
        </CloudrabbitTheme>
      </MemoryRouter>
    );
    expect(screen.getByText('Direct Message')).toBeInTheDocument();
  });
});