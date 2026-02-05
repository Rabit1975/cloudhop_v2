import React, { useState } from 'react';
import { Icons } from '../constants';
import GameServiceGlyph from './glyphs/GameServiceGlyph';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { useNebulaDrift } from '../hooks/useNebulaDrift';
import { useNebulaColorShift } from '../hooks/useNebulaColorShift';
import { useNebulaPulse } from '../hooks/useNebulaPulse';
import { useNebulaMorphing } from '../hooks/useNebulaMorphing';
import { useConstellationEvolution } from '../hooks/useConstellationEvolution';
import { useGalaxy } from '../context/GalaxyContext';
import { useGameService } from '../hooks/useGameService';
import { useAdaptiveSoundscape } from '../hooks/useAdaptiveSoundscape';
import { useEmotionalWeather } from '../hooks/useEmotionalWeather';
import GameCard from './games/GameCard';
import GameProviderFilter from './games/GameProviderFilter';
import GameSearch from './games/GameSearch';
import GameDetailsModal from './games/GameDetailsModal';

const GameService: React.FC = () => {
  const fadeRef = useScrollFadeIn();
  useNebulaDrift();
  useNebulaColorShift('.game-service-section');
  useNebulaPulse();
  const { setEmotionalState } = useNebulaMorphing('.game-service-section');
  const { svgRef, setSeason, addNode, addEdge } =
    useConstellationEvolution('.game-service-section');
  const { state: galaxyState, setMood } = useGalaxy();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const {
    games,
    loading,
    error,
    selectedProvider,
    searchQuery,
    filteredGames,
    selectedGame,
    isModalOpen,
    relatedGames,
    setProvider,
    setSearchQuery,
    launchGame,
    openGameDetails,
    closeGameDetails,
  } = useGameService();

  // Initialize ambient adaptive soundscape for the game service section
  useAdaptiveSoundscape({ tags: ['game'] }, galaxyState.mood, filteredGames.length);

  // Initialize emotional weather for the game service section
  useEmotionalWeather({ tags: ['game'] }, galaxyState.mood, filteredGames.length);

  // Demo: Cycle through emotional states every 8 seconds
  React.useEffect(() => {
    const emotions = ['bloom', 'drift', 'surge', 'storm', 'frost'] as const;
    let index = 0;

    const interval = setInterval(() => {
      const emotion = emotions[index];
      setEmotionalState(emotion);
      setSeason(emotion);
      setMood(emotion);
      index = (index + 1) % emotions.length;
    }, 8000);

    return () => clearInterval(interval);
  }, [setEmotionalState, setSeason, setMood]);

  // Initialize constellation with some nodes
  React.useEffect(() => {
    // Create initial star nodes
    addNode({ x: 20, y: 30, size: 3, brightness: 0.8, resonance: 1.0, clusterId: 'cluster-1' });
    addNode({ x: 40, y: 20, size: 2, brightness: 0.6, resonance: 0.8, clusterId: 'cluster-1' });
    addNode({ x: 30, y: 50, size: 4, brightness: 0.9, resonance: 1.2, clusterId: 'cluster-2' });
    addNode({ x: 60, y: 40, size: 2.5, brightness: 0.7, resonance: 0.9, clusterId: 'cluster-2' });
    addNode({ x: 50, y: 70, size: 3.5, brightness: 0.8, resonance: 1.1, clusterId: 'cluster-3' });

    // Create initial edges
    addEdge('star-1', 'star-2', 0.7, 'connection');
    addEdge('star-2', 'star-3', 0.5, 'energy');
    addEdge('star-3', 'star-4', 0.6, 'harmony');
    addEdge('star-4', 'star-5', 0.8, 'tension');
  }, [addNode, addEdge]);

  return (
    <section className="game-service-section nebula-shift relative overflow-hidden">
      {/* Multi-Layer Nebula Stack */}
      <div className="nebula-stack">
        <div className="nebula-layer nebula-A game" data-drift="0.01" />
        <div className="nebula-layer nebula-B game" data-drift="0.03" />
        <div className="nebula-layer nebula-C game" data-drift="0.06" />
        <div className="nebula-layer nebula-stars star-twinkle-slow star-drift" data-drift="0.1" />

        {/* Micro Stars for Extra Sparkle */}
        <div className="micro-star star-twinkle-fast" style={{ top: '20%', left: '30%' }}></div>
        <div className="micro-star star-twinkle-slow" style={{ top: '60%', left: '70%' }}></div>
        <div className="micro-star star-twinkle" style={{ top: '40%', left: '10%' }}></div>
        <div className="micro-star star-twinkle-bright" style={{ top: '80%', left: '50%' }}></div>
        <div className="micro-star star-twinkle-fast" style={{ top: '15%', left: '85%' }}></div>
        <div className="micro-star star-twinkle-soft" style={{ top: '70%', left: '25%' }}></div>
      </div>

      {/* Constellation Evolution Overlay */}
      <div className="constellation-overlay" data-drift="0.02">
        <svg ref={svgRef} className="constellation-svg constellation-glow" />
      </div>

      {/* Atmospheric Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Mythic Glyph: The Play Constellation */}
          <div className="flex justify-center mb-8">
            <GameServiceGlyph
              size={120}
              className="hover:scale-110 transition-transform duration-500"
            />
          </div>

          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Game Service Pipeline
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your gateway to infinite gaming realms across all platforms. Launch, manage, and explore
            games from Epic, Steam, Xbox, PlayStation, Nintendo, and more.
          </p>
        </div>

        {/* Game Controls */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <GameSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          {/* Provider Filter */}
          <GameProviderFilter selectedProvider={selectedProvider} onProviderChange={setProvider} />

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              {loading ? 'Loading games...' : `${filteredGames.length} games found`}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/15'
                }`}
              >
                📊 Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/15'
                }`}
              >
                📋 List
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <span className="text-4xl">⚠️</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your game library...</p>
          </div>
        )}

        {/* Games Grid/List */}
        {!loading && !error && (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onLaunch={launchGame}
                onViewDetails={openGameDetails}
                variant={viewMode}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredGames.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">🎮</span>
            <p className="text-gray-400 text-lg mb-2">No games found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Current Galaxy State Display (for debugging) */}
        <div className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-400 max-w-xs">
          <div className="font-semibold text-white mb-1">Galaxy State</div>
          <div>Mood: {galaxyState.mood}</div>
          <div>Nebula Brightness: {galaxyState.nebula.brightness.toFixed(2)}</div>
          <div>Constellation Stars: {galaxyState.constellation.nodes.length}</div>
        </div>
      </div>

      {/* Game Details Modal */}
      <GameDetailsModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={closeGameDetails}
        onGameSelect={openGameDetails}
        relatedGames={relatedGames}
      />
    </section>
  );
};

export default GameService;
