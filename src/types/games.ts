export interface GameProvider {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Game {
  id: string;
  appId: string;
  title: string;
  provider: GameProvider;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  tags: string[];
  rating?: number;
  players?: string;
  status: 'available' | 'unavailable' | 'coming-soon';
  price?: {
    amount: number;
    currency: string;
  };
  features: string[];
  lastPlayed?: Date;
  playTime?: number;
  related?: string[]; // Array of game IDs
}

export interface GameServiceState {
  games: Game[];
  loading: boolean;
  error: string | null;
  selectedProvider: string | null;
  searchQuery: string;
  filters: {
    status: string[];
    tags: string[];
    providers: string[];
  };
}
