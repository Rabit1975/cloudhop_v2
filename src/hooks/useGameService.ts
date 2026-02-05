import { useState, useEffect } from 'react';
import { Game, GameServiceState } from '../types/games';
import { SAMPLE_GAMES } from '../data/gameProviders';

export function useGameService() {
  const [state, setState] = useState<GameServiceState>({
    games: [],
    loading: true,
    error: null,
    selectedProvider: null,
    searchQuery: '',
    filters: {
      status: [],
      tags: [],
      providers: [],
    },
  });

  // Modal state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading games from providers
    const loadGames = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setState(prev => ({
          ...prev,
          games: SAMPLE_GAMES,
          loading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to load games',
          loading: false,
        }));
      }
    };

    loadGames();
  }, []);

  const setProvider = (providerId: string | null) => {
    setState(prev => ({ ...prev, selectedProvider: providerId }));
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const updateFilters = (filters: Partial<GameServiceState['filters']>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }));
  };

  const filteredGames = state.games.filter(game => {
    // Provider filter
    if (state.selectedProvider && game.provider.id !== state.selectedProvider) {
      return false;
    }

    // Search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      return (
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (state.filters.status.length > 0 && !state.filters.status.includes(game.status)) {
      return false;
    }

    // Tags filter
    if (state.filters.tags.length > 0 && !game.tags.some(tag => state.filters.tags.includes(tag))) {
      return false;
    }

    // Provider filter
    if (state.filters.providers.length > 0 && !state.filters.providers.includes(game.provider.id)) {
      return false;
    }

    return true;
  });

  const launchGame = (game: Game) => {
    console.log(`Launching ${game.title} from ${game.provider.label}...`);
    // Here you would integrate with actual game launchers
    // For Epic Games: epicgames://launch/${game.appId}
    // For Steam: steam://rungameid/${game.appId}
    // For Xbox: xbox-game-pass://launch/${game.appId}
  };

  const openGameDetails = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const closeGameDetails = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  const getRelatedGames = (game: Game): Game[] => {
    if (!game.related || game.related.length === 0) return [];

    return game.related
      .map(id => state.games.find(g => g.id === id))
      .filter((g): g is Game => g !== undefined);
  };

  return {
    ...state,
    filteredGames,
    selectedGame,
    isModalOpen,
    relatedGames: selectedGame ? getRelatedGames(selectedGame) : [],
    setProvider,
    setSearchQuery,
    updateFilters,
    launchGame,
    openGameDetails,
    closeGameDetails,
  };
}
