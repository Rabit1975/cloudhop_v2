import React, { useState } from 'react';
import { Icons } from '../constants';
import GameServiceGlyph from './glyphs/GameServiceGlyph';
import { useGalaxy } from '../context/GalaxyContext';
import { useGameService } from '../hooks/useGameService';
import GameCard from './games/GameCard';
import GameProviderFilter from './games/GameProviderFilter';
import GameSearch from './games/GameSearch';
import GameDetailsModal from './games/GameDetailsModal';

const GameService: React.FC = () => {
  // PERFORMANCE: All living environment hooks removed
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

  return (
    <section className="game-service-section relative overflow-hidden h-full w-full">
      {/* Static Background instead of Nebula Stack */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 h-full flex flex-col">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <GameServiceGlyph className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Game Service</h1>
              <p className="text-slate-400 text-sm">Cloud Gaming & Local Library</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <GameSearch onSearch={setSearchQuery} />
             <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
               <button
                 onClick={() => setViewMode('grid')}
                 className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-700 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
               >
                 <Icons.Grid className="w-4 h-4" />
               </button>
               <button
                 onClick={() => setViewMode('list')}
                 className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-700 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
               >
                 <Icons.List className="w-4 h-4" />
               </button>
             </div>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-6 shrink-0">
          <GameProviderFilter selectedProvider={selectedProvider} onSelect={setProvider} />
        </div>

        {/* Games Grid */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-2 -mr-2 custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-4">
                <Icons.AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">Failed to load games</h3>
              <p className="text-slate-400">{error}</p>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No games found matching your criteria</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
                : 'grid-cols-1'
            }`}>
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() => openGameDetails(game)}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Game Details Modal */}
      {isModalOpen && selectedGame && (
        <GameDetailsModal
          game={selectedGame}
          isOpen={isModalOpen}
          onClose={closeGameDetails}
          onLaunch={() => launchGame(selectedGame.id)}
          relatedGames={relatedGames}
        />
      )}
    </section>
  );
};

export default GameService;
