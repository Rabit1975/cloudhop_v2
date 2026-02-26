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
            // Try to find the image
            const imageName = gameId.includes(' ') ? gameId : gameId;
            const imageUrl = `/games/${gameId}/${imageName}.jpg`;
            const pressKitUrl = `/games/${gameId}/${gameId} - Press Kit.pdf`;

            // Determine category based on game name or ID
            let category = 'Arcade';
            if (gameId.includes('duck')) category = 'Sports';
            else if (gameId.includes('fireboy') || gameId.includes('candy')) category = 'Puzzle';
            else if (gameId.includes('doge') || gameId.includes('clicker')) category = 'Idle';
            else if (gameId.includes('chess') || gameId.includes('strategy')) category = 'Strategy';
            else if (gameId.includes('ball') || gameId.includes('8ball')) category = 'Sports';
            else if (gameId.includes('rope') || gameId.includes('connect')) category = 'Puzzle';
            else if (gameId.includes('fnaf') || gameId.includes('horror')) category = 'Horror';
            else if (gameId.includes('race') || gameId.includes('drift')) category = 'Racing';
            else if (gameId.includes('among') || gameId.includes('social')) category = 'Multiplayer';
            else if (gameId.includes('match') || gameId.includes('candy')) category = 'Match 3';

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
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xl">{CATEGORY_EMOJI[selectedGame.category] || '🎮'}</span>
            <div>
              <p className="text-white font-bold text-sm">{selectedGame.name}</p>
              <p className="text-purple-400 text-[11px]">{selectedGame.category}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReload} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={handleFullscreen} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button onClick={() => setIsPlaying(false)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 transition-all text-sm font-bold">
              <X className="w-3.5 h-3.5" /> Exit
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
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header with Search */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
                STRIKEFORCE
              </h1>
              <p className="text-slate-400 text-sm mt-1">Battle Arena Gaming Platform - {games.length} Games</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <button className="p-2.5 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 transition-colors">
                <Bell className="w-5 h-5 text-slate-400" />
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
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 h-96 group">
                  <img
                    src={featuredGame.image}
                    alt={featuredGame.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/games/default.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-4 py-2 rounded-full bg-red-600/80 border border-red-500/50 text-xs font-black text-white">
                        ⚡ FEATURED
                      </span>
                    </div>
                    <div className="space-y-4 max-w-lg">
                      <div>
                        <h2 className="text-5xl font-black text-white mb-2">{featuredGame.name}</h2>
                        <p className="text-slate-300">{featuredGame.category}</p>
                      </div>
                      <div className="flex items-center gap-3 pt-4">
                        <button
                          onClick={() => {
                            setSelectedGame(featuredGame);
                            setIsPlaying(true);
                          }}
                          className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold flex items-center gap-2 transition-all active:scale-95"
                        >
                          <Play className="w-5 h-5" />
                          Play Now
                        </button>
                        <a
                          href={featuredGame.pressKitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white font-bold flex items-center gap-2 transition-all"
                        >
                          <FileText className="w-5 h-5" />
                          Press Kit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Game Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-white">All Games - {filteredGames.length} Available</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCarouselPrev}
                      className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCarouselNext}
                      className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Scrolling Game Grid */}
                <div className="relative group">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredGames.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => {
                          setSelectedGame(game);
                          setIsPlaying(true);
                        }}
                        className="group relative rounded-lg overflow-hidden border border-slate-700 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/20 flex-shrink-0"
                      >
                        <div className={cn('relative h-40 bg-gradient-to-br flex items-center justify-center overflow-hidden', CATEGORY_COLORS[game.category] || CATEGORY_COLORS.Arcade)}>
                          <img
                            src={game.image}
                            alt={game.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <span className="absolute text-4xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">{CATEGORY_EMOJI[game.category] || '🎮'}</span>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white" />
                          </div>
                        </div>
                        <div className="p-2.5 bg-slate-900">
                          <h3 className="font-bold text-white text-[11px] leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                            {game.name}
                          </h3>
                          <span className="text-[9px] text-slate-500 mt-0.5 block">{game.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {filteredGames.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-slate-400">No games found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>

              {/* Welcome Message */}
              {!searchQuery && (
                <div className="rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 p-6">
                  <h3 className="text-2xl font-black text-white mb-2">Welcome to STRIKEFORCE</h3>
                  <p className="text-slate-400">Select a game from the arena and dominate the competition. Every battle counts!</p>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
