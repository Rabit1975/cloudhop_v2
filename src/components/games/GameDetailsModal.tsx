import React, { useEffect } from 'react';
import { Game } from '../../types/games';
import RelatedGamesCarousel from './RelatedGamesCarousel';
import { useConstellationLinking } from '../../hooks/useConstellationLinking';
import { StrikeForceProvider, useStrikeForce } from '../../context/StrikeForceContext';
import { playSkyPulse, getArchetypeTone } from '../../utils/audioEngine';
import { useAdaptiveSoundscape } from '../../hooks/useAdaptiveSoundscape';
import { useEmotionalWeather } from '../../hooks/useEmotionalWeather';
import { useGalaxy } from '../../context/GalaxyContext';
import { hapticEmotionalShift, hapticSkyPulse } from '../../utils/hapticEngine';

interface GameDetailsModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onGameSelect: (game: Game) => void;
  relatedGames: Game[];
}

const GameDetailsModalContent: React.FC<GameDetailsModalProps> = ({
  game,
  isOpen,
  onClose,
  onGameSelect,
  relatedGames,
}) => {
  // Initialize constellation linking
  useConstellationLinking(game, relatedGames);

  // Get selectedGame from StrikeForce context for recentering
  const { selectedGame } = useStrikeForce();
  const { state: galaxyState } = useGalaxy();

  // Use selectedGame if available, otherwise fall back to props
  const currentGame = selectedGame || game;
  const currentRelatedGames = selectedGame
    ? relatedGames.filter(g => selectedGame.related?.includes(g.id))
    : relatedGames;

  // Initialize adaptive soundscape based on current game and galaxy mood
  useAdaptiveSoundscape(currentGame, galaxyState.mood, 1); // presenceCount can be dynamic

  // Initialize emotional weather based on current game and galaxy mood
  useEmotionalWeather(currentGame, galaxyState.mood, currentRelatedGames.length);

  // Play ceremonial sky pulse when modal opens or game changes
  useEffect(() => {
    if (currentGame && isOpen) {
      const tone = getArchetypeTone(currentGame.tags);
      playSkyPulse(tone);
      hapticSkyPulse(currentGame); // Add haptic feedback for modal opening
    }
  }, [currentGame, isOpen]);

  // Haptic feedback for emotional shifts when selected game changes
  useEffect(() => {
    if (selectedGame && isOpen) {
      hapticEmotionalShift(selectedGame);
    }
  }, [selectedGame, isOpen]);

  if (!isOpen || !currentGame) return null;

  const formatPlayTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        {/* Constellation Canvas */}
        <canvas
          id="related-constellation"
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{ zIndex: 1 }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Hero Section */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img
            src={currentGame.bannerUrl || currentGame.imageUrl}
            alt={currentGame.title}
            className="w-full h-full object-cover"
            onError={e => {
              e.currentTarget.src = `https://via.placeholder.com/800x400/1a1a2e/16213e?text=${currentGame.title}`;
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Game Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {currentGame.title}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                    style={{
                      backgroundColor: currentGame.provider.color + '40',
                      color: 'white',
                    }}
                  >
                    {currentGame.provider.icon} {currentGame.provider.label}
                  </span>
                  {currentGame.rating && (
                    <span className="px-3 py-1 rounded-lg text-sm font-medium bg-black/50 backdrop-blur-sm text-yellow-400">
                      ⭐ {currentGame.rating}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentGame.status === 'available'
                        ? 'bg-green-500/40 text-green-300'
                        : currentGame.status === 'coming-soon'
                          ? 'bg-yellow-500/40 text-yellow-300'
                          : 'bg-red-500/40 text-red-300'
                    }`}
                  >
                    {currentGame.status === 'available'
                      ? 'Available'
                      : currentGame.status === 'coming-soon'
                        ? 'Coming Soon'
                        : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">About</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{currentGame.description}</p>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {currentGame.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 rounded-lg text-sm text-gray-300 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentGame.players && (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-2xl mb-1">👥</div>
                <div className="text-white font-semibold">{currentGame.players}</div>
                <div className="text-gray-400 text-sm">Players</div>
              </div>
            )}
            {currentGame.lastPlayed && (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-2xl mb-1">🕐</div>
                <div className="text-white font-semibold">{formatDate(currentGame.lastPlayed)}</div>
                <div className="text-gray-400 text-sm">Last Played</div>
              </div>
            )}
            {currentGame.playTime && (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-white font-semibold">
                  {formatPlayTime(currentGame.playTime)}
                </div>
                <div className="text-gray-400 text-sm">Play Time</div>
              </div>
            )}
            {currentGame.price && (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-white font-semibold">
                  {currentGame.price.amount > 0 ? `$${currentGame.price.amount}` : 'Free'}
                </div>
                <div className="text-gray-400 text-sm">Price</div>
              </div>
            )}
          </div>

          {/* Features */}
          {currentGame.features && currentGame.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentGame.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Games Carousel */}
          <RelatedGamesCarousel related={currentRelatedGames} onGameSelect={onGameSelect} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                console.log(`Launching ${currentGame.title} from ${currentGame.provider.label}...`);
                // Here you would integrate with actual game launchers
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎮 Play Now
            </button>
            <button
              onClick={() => {
                console.log(`Adding ${currentGame.title} to wishlist...`);
              }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameDetailsModal: React.FC<GameDetailsModalProps> = props => {
  return (
    <StrikeForceProvider>
      <GameDetailsModalContent {...props} />
    </StrikeForceProvider>
  );
};

export default GameDetailsModal;
