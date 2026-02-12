import { Game } from './game.js';
import { PlainGame } from './game-type.js';

export const mockGameList: PlainGame[] = [
  {
    id: 'game-001',
    name: 'Cosmic Voyager',
    description: 'Explore the vast universe in this HTML5 space adventure.',
    categoryId: 'category-001',
    gameType: 'html5',
    imageUrls: ['https://storage.googleapis.com/bit-generated-images/images/image_a_breathtaking__high_resolutio_0_1770831607513.png'],
    developer: 'Stellar Games',
    publisher: 'CloudHop Games',
    releaseDate: '2023-10-15',
    tags: ['space', 'adventure', 'sci-fi'],
    createdAt: new Date().toISOString(),
    playUrl: 'https://example.com/play/cosmic',
  },
  {
    id: 'game-002',
    name: 'Neon Racer',
    description: 'High speed racing with unity physics.',
    categoryId: 'category-002',
    gameType: 'unity',
    imageUrls: ['https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gf70c3bed43a8032f1916cfbc0df3078c54403547a7f1b38773a6e865b4122d9c028c0b7fb9409b8657a8a4adf9e98821687ecc8a134a9277e35871cdbc252585_1280.jpg'],
    developer: 'Neon Studios',
    publisher: 'UnityWorks',
    releaseDate: '2023-11-01',
    tags: ['racing', 'cyberpunk', 'action'],
    createdAt: new Date().toISOString(),
    unityGameId: 'unity-neon-racer',
  },
  {
    id: 'game-003',
    name: 'Live Tournament: Apex Legends',
    description: 'Watch the pros play live on Twitch.',
    categoryId: 'category-003',
    gameType: 'external_stream',
    imageUrls: ['https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g33551dc12cdf86bb29f6a8b0249460600fff414b05f3739767ae0d81d89b786ae8d9864faaf3d3ea5cccaec500b6d67ff7c45d14a615718f372102158d3cad3b_1280.jpg'],
    developer: 'StreamCorp',
    releaseDate: '2023-12-05',
    tags: ['esports', 'stream', 'shooter'],
    createdAt: new Date().toISOString(),
    playUrl: 'https://twitch.tv/example_stream',
  },
  {
    id: 'game-004',
    name: 'Mystery of the Lilac',
    description: 'A puzzle game set in a mysterious lilac forest.',
    categoryId: 'category-004',
    gameType: 'html5',
    imageUrls: ['https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gf70c3bed43a8032f1916cfbc0df3078c54403547a7f1b38773a6e865b4122d9c028c0b7fb9409b8657a8a4adf9e98821687ecc8a134a9277e35871cdbc252585_1280.jpg'],
    developer: 'PuzzleMinds',
    releaseDate: '2024-01-20',
    tags: ['puzzle', 'mystery', 'casual'],
    createdAt: new Date().toISOString(),
    playUrl: 'https://example.com/play/lilac-mystery',
  },
];

export function mockGames(overrides?: Partial<PlainGame>[]): Game[] {
  return mockGameList.map((game, index) => {
    const override = overrides && overrides[index] ? overrides[index] : {};
    return Game.from({ ...game, ...override });
  });
}