import { useState, useEffect } from 'react';
import {
  Search, Play, ChevronLeft, ChevronRight, X, RotateCcw, Maximize2,
  Star, Gamepad2, Settings, Bell, Download, FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Game {
  id: string;
  name: string;
  category: string;
  image: string;
  pressKitUrl: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Action: 'from-red-600 to-orange-500',
  Puzzle: 'from-blue-600 to-cyan-500',
  Sports: 'from-green-600 to-emerald-500',
  Adventure: 'from-amber-600 to-yellow-500',
  Social: 'from-pink-600 to-rose-500',
  Classic: 'from-gray-600 to-slate-500',
  Strategy: 'from-purple-600 to-violet-500',
  Idle: 'from-teal-600 to-cyan-500',
  Arcade: 'from-orange-600 to-red-500',
  Racing: 'from-indigo-600 to-purple-500',
  Horror: 'from-slate-700 to-slate-900',
  Platformer: 'from-lime-600 to-green-500',
  'Casual': 'from-pink-500 to-purple-500',
  'Multiplayer': 'from-cyan-600 to-blue-500',
  'Match 3': 'from-red-500 to-pink-500',
};

const CATEGORY_EMOJI: Record<string, string> = {
  Action: '⚔️',
  Puzzle: '🧩',
  Sports: '⚽',
  Adventure: '🗺️',
  Social: '👥',
  Classic: '🕹️',
  Strategy: '♟️',
  Idle: '⏳',
  Arcade: '🎮',
  Racing: '🏎️',
  Horror: '👻',
  Platformer: '🏃',
  Casual: '🎯',
  Multiplayer: '👾',
  'Match 3': '💎',
};

export default function GameHub() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all games from public/games folder
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the list of games dynamically
        const gameIds = [
          '1v1lol', '2048', '8ball', '99 Balls', 'adarkroom', 'amongus', 'asciispace',
          'asteroids', 'astray', 'backcountry', 'basketballstars', 'blackholesquare',
          'bloonstd4', 'bounceback', 'breaklock', 'breakout', 'Bubble Shooter Wild West',
          'Candy Riddles Free Match 3 Puzzle', 'captaincallisto', 'chess', 'chromaincident',
          'chromedino', 'connect3', 'cookieclicker', 'crossyroad', 'cubefield', 'cuttherope',
          'cuttherope2', 'cuttheropeholiday', 'cuttheropetimetravel', 'dinosaur',
          'doctor-acorn2', 'doctor-acorn3', 'doge2048', 'dogeminer', 'doodle-jump',
          'driftboss', 'ducklife', 'ducklife2', 'ducklife3', 'ducklife4', 'ducklife5',
          'edgenotfound', 'edge-surf', 'elasticmorty', 'evilglitch', 'factoryballsforever',
          'fireboy-and-watergirl-1', 'fireboy-and-watergirl-2', 'fireboy-and-watergirl-3',
          'fireboy-and-watergirl-4', 'firewater', 'flappy-2048', 'flappybird', 'fnaf',
          'fnaf2', 'fnaf3', 'fnaf4', 'friendlyfire', 'geometry', 'geometrydash', 'gopher',
          'hextris', 'icypurplehead2', 'qiciengine', 'unity-spectrum'
        ];

        const loadedGames: Game[] = [];

        for (const gameId of gameIds) {
          try {
            // Determine category based on game name or ID
            let category = 'Arcade';
            const lowerGameId = gameId.toLowerCase();
            
            if (lowerGameId.includes('duck')) category = 'Sports';
            else if (lowerGameId.includes('fireboy') || lowerGameId.includes('candy') || lowerGameId.includes('bubble') || lowerGameId.includes('match')) category = 'Puzzle';
            else if (lowerGameId.includes('doge') || lowerGameId.includes('clicker') || lowerGameId.includes('merge')) category = 'Idle';
            else if (lowerGameId.includes('chess') || lowerGameId.includes('strategy') || lowerGameId.includes('xeno') || lowerGameId.includes('defense')) category = 'Strategy';
            else if (lowerGameId.includes('ball') || lowerGameId.includes('8ball') || lowerGameId.includes('shooter') || lowerGameId.includes('water')) category = 'Sports';
            else if (lowerGameId.includes('rope') || lowerGameId.includes('connect') || lowerGameId.includes('tied')) category = 'Puzzle';
            else if (lowerGameId.includes('fnaf') || lowerGameId.includes('horror') || lowerGameId.includes('nightmare') || lowerGameId.includes('clap')) category = 'Horror';
            else if (lowerGameId.includes('race') || lowerGameId.includes('drift') || lowerGameId.includes('truck') || lowerGameId.includes('road')) category = 'Racing';
            else if (lowerGameId.includes('among') || lowerGameId.includes('social') || lowerGameId.includes('worms') || lowerGameId.includes('snake')) category = 'Multiplayer';
            else if (lowerGameId.includes('ragdoll') || lowerGameId.includes('fighting') || lowerGameId.includes('hero') || lowerGameId.includes('strike') || lowerGameId.includes('gun') || lowerGameId.includes('mech') || lowerGameId.includes('poppy') || lowerGameId.includes('dead')) category = 'Action';
            else if (lowerGameId.includes('forest') || lowerGameId.includes('adventure') || lowerGameId.includes('lost') || lowerGameId.includes('timewalker')) category = 'Adventure';
            else if (lowerGameId.includes('runner') || lowerGameId.includes('run') || lowerGameId.includes('friends')) category = 'Platformer';

            // Use image1.jpg as default - works for old and new GameDistribution games
            const imageUrl = `/games/${gameId}/image1.jpg`;
            const pressKitUrl = `/games/${gameId}/${gameId} - Press Kit.pdf`;

            loadedGames.push({
              id: gameId,
              name: gameId
                .replace(/[-_]/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
              category,
              image: imageUrl,
              pressKitUrl,
            });
          } catch (err) {
            console.warn(`Failed to load game ${gameId}:`, err);
          }
        }

        if (loadedGames.length === 0) {
          setError('No games found. Please check your games folder.');
        } else {
          setGames(loadedGames);
          setSelectedGame(loadedGames[0]);
        }
      } catch (err) {
        console.error('Error loading games:', err);
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (games.length === 0) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % games.length);
      setSelectedGame(games[(carouselIndex + 1) % games.length]);
    }, 5000);
    return () => clearInterval(interval);
  }, [games, carouselIndex]);

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFullscreen = () => {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    iframe?.requestFullscreen?.();
  };

  const handleReload = () => {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
  };

  const handleCarouselPrev = () => {
    const newIndex = (carouselIndex - 1 + games.length) % games.length;
    setCarouselIndex(newIndex);
    setSelectedGame(games[newIndex]);
  };

  const handleCarouselNext = () => {
    const newIndex = (carouselIndex + 1) % games.length;
    setCarouselIndex(newIndex);
    setSelectedGame(games[newIndex]);
  };

  const featuredGame = selectedGame || games[carouselIndex];

  /* Playing State */
  if (isPlaying && selectedGame) {
    return (
      <div className="h-full w-full flex flex-col bg-slate-950">
        <div className="flex items-center justify-between px-2 sm:px-4 py-2.5 border-b border-white/10 bg-slate-900 flex-shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-lg sm:text-xl flex-shrink-0">{CATEGORY_EMOJI[selectedGame.category] || '🎮'}</span>
            <div className="min-w-0">
              <p className="text-white font-bold text-xs sm:text-sm truncate">{selectedGame.name}</p>
              <p className="text-purple-400 text-[10px] sm:text-[11px] truncate">{selectedGame.category}</p>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <button onClick={handleReload} className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button onClick={handleFullscreen} className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all hidden sm:block">
              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button onClick={() => setIsPlaying(false)} className="flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 transition-all text-xs sm:text-sm font-bold">
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <iframe
            src={`/games/${selectedGame.id}/index.html`}
            title={selectedGame.name}
            className="absolute inset-0 w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          />
        </div>
      </div>
    );
  }

  /* Main Dashboard */
  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="min-h-screen p-3 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

          {/* Header with Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 line-clamp-2">
                STRIKEFORCE
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Battle Arena Gaming Platform - {games.length} Games</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <button className="p-2 sm:p-2.5 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 transition-colors flex-shrink-0">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-red-500 animate-bounce" />
              <p className="text-slate-400 text-lg">Loading your game collection...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-6 text-center">
              <p className="text-red-400 font-bold">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Featured Hero */}
              {featuredGame && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 h-48 sm:h-64 md:h-96 group">
                  <img
                    src={featuredGame.image}
                    alt={featuredGame.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/games/default.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-6 md:p-8 z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-red-600/80 border border-red-500/50 text-[10px] sm:text-xs font-black text-white">
                        ⚡ FEATURED
                      </span>
                    </div>
                    <div className="space-y-2 sm:space-y-4 max-w-lg">
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-1 sm:mb-2 line-clamp-2">{featuredGame.name}</h2>
                        <p className="text-slate-300 text-xs sm:text-sm">{featuredGame.category}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
                        <button
                          onClick={() => {
                            setSelectedGame(featuredGame);
                            setIsPlaying(true);
                          }}
                          className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-xs sm:text-base"
                        >
                          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                          Play Now
                        </button>
                        <a
                          href={featuredGame.pressKitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition-all text-xs sm:text-base"
                        >
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Press Kit</span>
                          <span className="sm:hidden">Info</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Game Grid */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-lg font-black text-white">All Games - {filteredGames.length} Available</h2>
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={handleCarouselPrev}
                      className="p-1.5 sm:p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={handleCarouselNext}
                      className="p-1.5 sm:p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Scrolling Game Grid */}
                <div className="relative group">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                    {filteredGames.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => {
                          setSelectedGame(game);
                          setIsPlaying(true);
                        }}
                        className="group relative rounded-lg overflow-hidden border border-slate-700 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/20 flex-shrink-0 active:scale-95 sm:active:scale-100"
                      >
                        <div className={cn('relative h-24 sm:h-32 md:h-40 bg-gradient-to-br flex items-center justify-center overflow-hidden', CATEGORY_COLORS[game.category] || CATEGORY_COLORS.Arcade)}>
                          <img
                            src={game.image}
                            alt={game.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <span className="absolute text-2xl sm:text-3xl md:text-4xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">{CATEGORY_EMOJI[game.category] || '🎮'}</span>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white fill-white" />
                          </div>
                        </div>
                        <div className="p-1.5 sm:p-2 md:p-2.5 bg-slate-900">
                          <h3 className="font-bold text-white text-[9px] sm:text-[10px] md:text-[11px] leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                            {game.name}
                          </h3>
                          <span className="text-[7px] sm:text-[8px] md:text-[9px] text-slate-500 mt-0.5 block">{game.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {filteredGames.length === 0 && (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-slate-400 text-sm sm:text-base">No games found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>

              {/* Welcome Message */}
              {!searchQuery && (
                <div className="rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-2xl font-black text-white mb-1 sm:mb-2">Welcome to STRIKEFORCE</h3>
                  <p className="text-slate-400 text-xs sm:text-base">Select a game from the arena and dominate the competition. Every battle counts!</p>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
