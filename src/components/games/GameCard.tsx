import React from 'react';
import { Game } from '../../types/games';
import { Icons } from '../../constants';
import { playSkyPulse, getArchetypeTone } from '../../utils/audioEngine';
import { hapticSkyPulse } from '../../utils/hapticEngine';

interface GameCardProps {
  game: Game;
  onLaunch: (game: Game) => void;
  onViewDetails: (game: Game) => void;
  variant?: 'grid' | 'list';
}

const GameCard: React.FC<GameCardProps> = ({ game, onLaunch, onViewDetails, variant = 'grid' }) => {
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

  const handleViewDetails = () => {
    // Play ceremonial tone when opening game details
    const tone = getArchetypeTone(game.tags);
    playSkyPulse(tone);
    hapticSkyPulse(game); // Add haptic feedback for opening details
    onViewDetails(game);
  };

  if (variant === 'list') {
    return (
      <div
        className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
        onClick={handleViewDetails}
      >
        <div className="flex items-center gap-4">
          <img
            src={game.imageUrl}
            alt={game.title}
            className="w-16 h-16 rounded-lg object-cover"
            onError={e => {
              e.currentTarget.src = `https://via.placeholder.com/64x64/1a1a2e/16213e?text=${game.title.charAt(0)}`;
            }}
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold">{game.title}</h3>
              <span
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: game.provider.color + '20', color: game.provider.color }}
              >
                {game.provider.icon} {game.provider.label}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-2">{game.description}</p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              {game.rating && <span className="flex items-center gap-1">⭐ {game.rating}</span>}
              {game.players && <span>👥 {game.players}</span>}
              {game.lastPlayed && <span>🕐 {formatDate(game.lastPlayed)}</span>}
              {game.playTime && <span>⏱️ {formatPlayTime(game.playTime)}</span>}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {game.price && game.price.amount > 0 ? (
              <span className="text-green-400 font-semibold">${game.price.amount}</span>
            ) : (
              <span className="text-green-400 font-semibold">Free</span>
            )}

            <div className="flex gap-2">
              <button
                onClick={e => {
                  e.stopPropagation();
                  onLaunch(game);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Launch
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleViewDetails();
                }}
                className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group hover:transform hover:scale-105 cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Game Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.bannerUrl || game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => {
            e.currentTarget.src = `https://via.placeholder.com/400x200/1a1a2e/16213e?text=${game.title}`;
          }}
        />

        {/* Provider Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
            style={{ backgroundColor: game.provider.color + '40', color: 'white' }}
          >
            {game.provider.icon} {game.provider.label}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              game.status === 'available'
                ? 'bg-green-500/40 text-green-300'
                : game.status === 'coming-soon'
                  ? 'bg-yellow-500/40 text-yellow-300'
                  : 'bg-red-500/40 text-red-300'
            }`}
          >
            {game.status === 'available'
              ? 'Available'
              : game.status === 'coming-soon'
                ? 'Coming Soon'
                : 'Unavailable'}
          </span>
        </div>

        {/* Rating */}
        {game.rating && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 rounded-lg text-xs font-medium bg-black/50 backdrop-blur-sm text-yellow-400">
              ⭐ {game.rating}
            </span>
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2">{game.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{game.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {game.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
              {tag}
            </span>
          ))}
          {game.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
              +{game.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
          {game.players && <span>👥 {game.players}</span>}
          {game.lastPlayed && <span>🕐 {formatDate(game.lastPlayed)}</span>}
          {game.playTime && <span>⏱️ {formatPlayTime(game.playTime)}</span>}
        </div>

        {/* Action */}
        <div className="flex items-center justify-between">
          {game.price && game.price.amount > 0 ? (
            <span className="text-green-400 font-semibold">${game.price.amount}</span>
          ) : (
            <span className="text-green-400 font-semibold">Free</span>
          )}

          <div className="flex gap-2">
            <button
              onClick={e => {
                e.stopPropagation();
                onLaunch(game);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Launch
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                onViewDetails(game);
              }}
              className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
