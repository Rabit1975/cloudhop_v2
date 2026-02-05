import React from 'react';
import { Game } from '../../types/games';
import { useStrikeForce } from '../../context/StrikeForceContext';
import { playConstellationChime, getArchetypeTone } from '../../utils/audioEngine';
import { hapticHoverStar, hapticRecenterStar } from '../../utils/hapticEngine';

interface RelatedGamesCarouselProps {
  related: Game[];
  onGameSelect: (game: Game) => void;
}

const RelatedGamesCarousel: React.FC<RelatedGamesCarouselProps> = ({ related, onGameSelect }) => {
  if (!related?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="text-2xl">🌌</span>
        Related Games
        <span className="text-sm text-gray-400 font-normal">({related.length} titles)</span>
      </h3>

      <div className="relative">
        {/* Gradient fade edges for cinematic effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {related.map((game, index) => (
            <RelatedGameCard
              key={game.id}
              game={game}
              onClick={() => onGameSelect(game)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface RelatedGameCardProps {
  game: Game;
  onClick: () => void;
  index: number;
}

const RelatedGameCard: React.FC<RelatedGameCardProps> = ({ game, onClick, index }) => {
  const { setHoveredNode, openGameDetails } = useStrikeForce();

  const handleClick = () => {
    // Play deep recenter resonance when clicking
    const tone = getArchetypeTone(game.tags);
    playConstellationChime(tone - 80); // Deeper tone for recentering

    // Add haptic feedback for recentering
    hapticRecenterStar(game);

    openGameDetails(game); // This will recenter the constellation
    onClick(); // Call the original onClick for navigation
  };

  const handleMouseEnter = () => {
    setHoveredNode(game.id);

    // Play soft star chime when hovering
    const tone = getArchetypeTone(game.tags);
    playConstellationChime(tone);

    // Add subtle haptic feedback for hover
    hapticHoverStar(game);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHoveredNode(null)}
      className={`
        group w-40 flex-shrink-0 cursor-pointer
        rounded-2xl overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-white/10
        hover:border-white/20
        transition-all
      `}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both',
      }}
    >
      {/* Game Cover Image */}
      <div className="aspect-[3/4] w-full overflow-hidden relative">
        <img
          src={game.bannerUrl || game.imageUrl}
          alt={game.title}
          className="
            w-full h-full object-cover
            group-hover:scale-110 transition-transform duration-500
          "
          onError={e => {
            e.currentTarget.src = `https://via.placeholder.com/160x213/1a1a2e/16213e?text=${game.title}`;
          }}
        />

        {/* Provider Badge Overlay */}
        <div className="absolute top-2 left-2">
          <div
            className="px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
            style={{
              backgroundColor: game.provider.color + '40',
              color: 'white',
            }}
          >
            {game.provider.icon}
          </div>
        </div>

        {/* Rating Badge */}
        {game.rating && (
          <div className="absolute top-2 right-2">
            <div className="px-2 py-1 rounded-lg text-xs font-medium bg-black/50 backdrop-blur-sm text-yellow-400">
              ⭐ {game.rating}
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-2 left-2 right-2">
            <button className="w-full px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Game Info */}
      <div className="p-3 space-y-2">
        <h4 className="text-white text-sm font-semibold truncate group-hover:text-blue-400 transition-colors">
          {game.title}
        </h4>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {game.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">
              {tag}
            </span>
          ))}
          {game.tags.length > 2 && (
            <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">
              +{game.tags.length - 2}
            </span>
          )}
        </div>

        {/* Price/Status */}
        <div className="flex items-center justify-between">
          {game.price && game.price.amount > 0 ? (
            <span className="text-green-400 text-xs font-semibold">${game.price.amount}</span>
          ) : (
            <span className="text-green-400 text-xs font-semibold">Free</span>
          )}

          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              game.status === 'available'
                ? 'bg-green-500/20 text-green-400'
                : game.status === 'coming-soon'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
            }`}
          >
            {game.status === 'available'
              ? 'Available'
              : game.status === 'coming-soon'
                ? 'Coming'
                : 'Unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RelatedGamesCarousel;
