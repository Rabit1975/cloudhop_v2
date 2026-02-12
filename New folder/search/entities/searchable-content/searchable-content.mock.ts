import { SearchableContent } from './searchable-content.js';

export function mockSearchableContents(): SearchableContent[] {
  return [
    SearchableContent.from({
      id: 'u-101',
      type: 'user',
      title: 'Sam Doe',
      description: 'Senior Developer at CloudHop',
      url: '/profile/samdoe',
      thumbnail: 'https://cdn.cloudhop.com/users/samdoe.jpg',
      keywords: ['developer', 'typescript', 'react'],
    }),
    SearchableContent.from({
      id: 'c-202',
      type: 'chat',
      title: 'Tech Talk',
      description: 'A channel for technology discussions',
      url: '/hophub/techtalk',
      keywords: ['tech', 'chat', 'group'],
    }),
    SearchableContent.from({
      id: 'm-303',
      type: 'meeting',
      title: 'Weekly Standup',
      description: 'Team sync meeting',
      url: '/hopmeets/standup-room',
      keywords: ['meeting', 'sync', 'agile'],
    }),
    SearchableContent.from({
      id: 'g-404',
      type: 'game',
      title: 'Space Invaders Redux',
      description: 'Classic arcade game reimagined',
      url: '/gamehub/space-invaders',
      thumbnail: 'https://cdn.cloudhop.com/games/space.jpg',
      keywords: ['game', 'arcade', 'retro'],
    }),
    SearchableContent.from({
      id: 'mu-505',
      type: 'music',
      title: 'Lo-Fi Beats',
      description: 'Relaxing beats to study to',
      url: '/music/playlist/lofi-123',
      keywords: ['music', 'lofi', 'relax'],
    }),
  ];
}