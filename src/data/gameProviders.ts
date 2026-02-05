import { GameProvider } from '../types/games';

export const GAME_PROVIDERS: GameProvider[] = [
  {
    id: 'epic',
    label: 'Epic Games',
    icon: '🎮',
    color: '#313131',
  },
  {
    id: 'steam',
    label: 'Steam',
    icon: '💨',
    color: '#1B2838',
  },
  {
    id: 'xbox',
    label: 'Xbox Game Pass',
    icon: '🟢',
    color: '#107C10',
  },
  {
    id: 'playstation',
    label: 'PlayStation',
    icon: '🎯',
    color: '#003791',
  },
  {
    id: 'nintendo',
    label: 'Nintendo',
    icon: '🔴',
    color: '#E60012',
  },
  {
    id: 'gog',
    label: 'GOG',
    icon: '🎲',
    color: '#8A2BE2',
  },
];

export const SAMPLE_GAMES = [
  {
    id: '1',
    appId: 'Fortnite',
    title: 'Fortnite',
    provider: GAME_PROVIDERS[0], // Epic
    description: 'Battle Royale and Creative building game',
    imageUrl:
      'https://cdn1.epicgames.com/offer/24b9b5e4230f4758afa95b859278aee1/EGS_Fortnite_epicgames_Epic_Games_S1_2560x1440-2560x1440-a7d485857088f8c66731ee341a9a1c9c',
    bannerUrl:
      'https://cdn2.unrealengine.com/fortnite/fortnite-home-1920x1080-1920x1080-7b9c1b4e4a2d.jpg',
    tags: ['Battle Royale', 'Free-to-Play', 'Multiplayer'],
    rating: 4.2,
    players: '100M+',
    status: 'available' as const,
    price: { amount: 0, currency: 'USD' },
    features: ['Cross-platform', 'Creative Mode', 'Live Events'],
    lastPlayed: new Date('2024-01-15'),
    playTime: 245,
    related: ['2', '3', '6'], // CS:GO, Halo, Cyberpunk
  },
  {
    id: '2',
    appId: '730',
    title: 'Counter-Strike 2',
    provider: GAME_PROVIDERS[1], // Steam
    description: 'Tactical 5v5 competitive shooter',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
    tags: ['FPS', 'Competitive', 'Multiplayer'],
    rating: 4.5,
    players: '30M+',
    status: 'available' as const,
    price: { amount: 0, currency: 'USD' },
    features: ['Competitive Ranking', 'Esports', 'Skins'],
    lastPlayed: new Date('2024-01-10'),
    playTime: 156,
    related: ['1', '3', '4'], // Fortnite, Halo, God of War
  },
  {
    id: '3',
    appId: 'Halo-Infinite',
    title: 'Halo Infinite',
    provider: GAME_PROVIDERS[2], // Xbox
    description: 'Sci-fi first-person shooter',
    imageUrl:
      'https://store-images.s-microsoft.com/image/apps.60753.13744383966582111.1d4a2a18-7a1b-4c2e-9b9a-3c1b3e0c0e0e',
    tags: ['FPS', 'Sci-Fi', 'Multiplayer'],
    rating: 4.3,
    players: '20M+',
    status: 'available' as const,
    price: { amount: 0, currency: 'USD' },
    features: ['Campaign', 'Multiplayer', 'Forge'],
    lastPlayed: new Date('2024-01-08'),
    playTime: 89,
    related: ['1', '2', '5'], // Fortnite, CS:GO, Zelda
  },
  {
    id: '4',
    appId: 'God-of-War-Ragnarok',
    title: 'God of War Ragnarök',
    provider: GAME_PROVIDERS[3], // PlayStation
    description: 'Epic Norse mythology action-adventure',
    imageUrl:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/99/UP9000-PPSA01385_00-GODOFWARRAGNAROK/1596886876000/image',
    tags: ['Action', 'Adventure', 'Single-Player'],
    rating: 4.8,
    players: '15M+',
    status: 'available' as const,
    price: { amount: 69.99, currency: 'USD' },
    features: ['Story Mode', '4K Graphics', 'DualSense Support'],
    lastPlayed: new Date('2024-01-05'),
    playTime: 45,
    related: ['5', '6', '2'], // Zelda, Cyberpunk, CS:GO
  },
  {
    id: '5',
    appId: 'Zelda-Tears-of-the-Kingdom',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    provider: GAME_PROVIDERS[4], // Nintendo
    description: 'Open-world adventure with creative building',
    imageUrl:
      'https://www.nintendo.com/eu/media/images/10/games_10/nintendo_switch_10/nintendo_switch_game_the_legend_of_zelda_tears_of_the_kingdom/nintendo_switch_game_the_legend_of_zelda_tears_of_the_kingdom_image_key_visual.jpg',
    tags: ['Adventure', 'Open-World', 'Creative'],
    rating: 4.9,
    players: '25M+',
    status: 'available' as const,
    price: { amount: 69.99, currency: 'USD' },
    features: ['Open World', 'Building System', 'Physics Engine'],
    lastPlayed: new Date('2024-01-12'),
    playTime: 67,
    related: ['4', '3', '1'], // God of War, Halo, Fortnite
  },
  {
    id: '6',
    appId: 'Cyberpunk-2077',
    title: 'Cyberpunk 2077',
    provider: GAME_PROVIDERS[5], // GOG
    description: 'Open-world RPG in Night City',
    imageUrl: 'https://www.gog.com/game/cyberpunk_2077',
    tags: ['RPG', 'Open-World', 'Sci-Fi'],
    rating: 4.1,
    players: '20M+',
    status: 'available' as const,
    price: { amount: 29.99, currency: 'USD' },
    features: ['Story Choices', 'Character Customization', 'Ray Tracing'],
    lastPlayed: new Date('2024-01-03'),
    playTime: 78,
    related: ['4', '2', '1'], // God of War, CS:GO, Fortnite
  },
];
