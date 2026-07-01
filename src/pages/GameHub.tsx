import { useEffect, useState } from 'react';
import {
  Search,
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  Bell,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Game {
  id: string;
  name: string;
  category: string;
  image: string;
  playUrl: string;
  pressKitUrl: string;
  width?: number;
  height?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Action: 'from-red-600 to-orange-500',
  Puzzle: 'from-blue-600 to-cyan-500',
  Sports: 'from-green-600 to-emerald-500',
  Adventure: 'from-amber-600 to-yellow-500',
  Strategy: 'from-purple-600 to-violet-500',
  Idle: 'from-teal-600 to-cyan-500',
  Arcade: 'from-orange-600 to-red-500',
  Racing: 'from-indigo-600 to-purple-500',
  Horror: 'from-slate-700 to-slate-900',
  Platformer: 'from-lime-600 to-green-500',
  Casual: 'from-pink-500 to-purple-500',
  Multiplayer: 'from-cyan-600 to-blue-500',
  'Match 3': 'from-red-500 to-pink-500',
};

const CATEGORY_EMOJI: Record<string, string> = {
  Action: '🎯',
  Puzzle: '🧩',
  Sports: '⚽',
  Adventure: '🗺️',
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

const normalizeCategory = (value: string) => {
  const categoryLower = value.toLowerCase();

  if (categoryLower.includes('action') || categoryLower.includes('shoot')) return 'Action';
  if (categoryLower.includes('puzzle') || categoryLower.includes('brain')) return 'Puzzle';
  if (categoryLower.includes('sport') || categoryLower.includes('ball') || categoryLower.includes('tennis')) return 'Sports';
  if (categoryLower.includes('adventure')) return 'Adventure';
  if (categoryLower.includes('strategy') || categoryLower.includes('chess')) return 'Strategy';
  if (categoryLower.includes('idle') || categoryLower.includes('clicker') || categoryLower.includes('tycoon')) return 'Idle';
  if (categoryLower.includes('racing') || categoryLower.includes('race') || categoryLower.includes('car') || categoryLower.includes('bike')) return 'Racing';
  if (categoryLower.includes('horror')) return 'Horror';
  if (categoryLower.includes('platform')) return 'Platformer';
  if (categoryLower.includes('match')) return 'Match 3';
  if (categoryLower.includes('multiplayer') || categoryLower.includes('.io')) return 'Multiplayer';
  if (categoryLower.includes('casual') || categoryLower.includes('hypercasual')) return 'Casual';

  return 'Arcade';
};

const parseGameMonetizeJSON = (jsonData: unknown): Game[] => {
  if (!Array.isArray(jsonData)) {
    return [];
  }

  return jsonData
    .map((game) => {
      if (!game || typeof game !== 'object') return null;

      const record = game as Record<string, unknown>;
      const id = typeof record.id === 'string' ? record.id : '';
      const name = typeof record.title === 'string' ? record.title : '';
      const playUrl = typeof record.url === 'string' ? record.url : '';
      let imageUrl = typeof record.thumb === 'string' ? record.thumb : '';
      const categoryRaw = typeof record.category === 'string' ? record.category : 'Arcade';

      if (!id || !name || !playUrl) {
        return null;
      }

      if (imageUrl.includes('gamemonetize.com')) {
        imageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}&n=-1`;
      }

      return {
        id,
        name,
        category: normalizeCategory(categoryRaw),
        image: imageUrl,
        playUrl,
        pressKitUrl: playUrl,
        width: typeof record.width === 'number' ? record.width : 800,
        height: typeof record.height === 'number' ? record.height : 600,
      };
    })
    .filter((game): game is Game => Boolean(game));
};

export default function GameHub() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameIsPlaying, setGameIsPlaying] = useState(false);
  const [displayedGamesCount, setDisplayedGamesCount] = useState(12);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.BASE_URL}rssfeed.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch rssfeed.json: ${response.status}`);
        }

        const jsonData = await response.json();
        const loadedGames = parseGameMonetizeJSON(jsonData);

        if (loadedGames.length === 0) {
          throw new Error('No games were parsed from rssfeed.json');
        }

        setGames(loadedGames);
        setSelectedGame(loadedGames[0]);
      } catch (err) {
        console.error('Error loading GameMonetize feed:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load GameMonetize feed.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  useEffect(() => {
    if (games.length === 0) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        const nextIndex = (prev + 1) % games.length;
        setSelectedGame(games[nextIndex]);
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [games]);

  const filteredGames = games
    .filter((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((g) => !selectedCategory || g.category === selectedCategory);

  const displayedGames = filteredGames.slice(0, displayedGamesCount);

  // Get unique categories with counts
  const categoryCounts = games.reduce(
    (acc, game) => {
      acc[game.category] = (acc[game.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const categories = Object.keys(categoryCounts).sort();

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

  const handleOpenGame = (game: Game) => {
    setSelectedGame(game);
    setGameIsPlaying(true);
  };

  const handleCloseGame = () => {
    setGameIsPlaying(false);
    setTimeout(() => setSelectedGame(null), 300);
  };

  const handleLoadMore = () => {
    setDisplayedGamesCount((prev) => Math.min(prev + 12, filteredGames.length));
  };

  const featuredGame = selectedGame || games[carouselIndex];

  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="min-h-screen p-3 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 line-clamp-2">
                STRIKEFORCE
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Live GameMonetize Feed - {games.length} Games Loaded
              </p>
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

            {!loading && !error && (
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm transition-all',
                    !selectedCategory
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-500'
                  )}
                >
                  All ({games.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5',
                      selectedCategory === cat
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-500'
                    )}
                  >
                    <span>{CATEGORY_EMOJI[cat] || '🎮'}</span>
                    {cat} ({categoryCounts[cat]})
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading && (
            <div className="text-center py-12">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-red-500 animate-bounce" />
              <p className="text-slate-400 text-lg">Loading your game collection...</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-6 text-center">
              <p className="text-red-400 font-bold">{error}</p>
              <p className="text-red-300 text-sm mt-2">
                Make sure `public/rssfeed.json` exists in production.
              </p>
            </div>
          )}

          {!loading && !error && (
            <>
              {featuredGame && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 h-48 sm:h-64 md:h-96 group">
                  <img
                    src={featuredGame.image}
                    alt={featuredGame.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-6 md:p-8 z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-red-600/80 border border-red-500/50 text-[10px] sm:text-xs font-black text-white">
                        FEATURED
                      </span>
                    </div>
                    <div className="space-y-2 sm:space-y-4 max-w-lg">
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-1 sm:mb-2 line-clamp-2">
                          {featuredGame.name}
                        </h2>
                        <p className="text-slate-300 text-xs sm:text-sm">
                          {featuredGame.category}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
                        <button
                          onClick={() => handleOpenGame(featuredGame)}
                          className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-xs sm:text-base"
                        >
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                          Open Game
                        </button>
                        <a
                          href={featuredGame.pressKitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition-all text-xs sm:text-base"
                        >
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                          Info
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {gameIsPlaying && selectedGame && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                  <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden border border-red-500/30 bg-slate-950 animate-in zoom-in-95">
                    <button
                      onClick={handleCloseGame}
                      className="absolute top-2 right-2 z-10 p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="relative w-full" style={{ paddingBottom: `${(selectedGame.height || 600) / (selectedGame.width || 800) * 100}%` }}>
                      <iframe
                        src={selectedGame.playUrl}
                        title={selectedGame.name}
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen
                        frameBorder="0"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-lg font-black text-white">
                    All Games - {filteredGames.length} Available
                  </h2>
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

                <div className="relative group">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                    {displayedGames.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => handleOpenGame(game)}
                        className="group relative rounded-lg overflow-hidden border border-slate-700 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/20 flex-shrink-0 active:scale-95 sm:active:scale-100"
                      >
                        <div
                          className={cn(
                            'relative h-24 sm:h-32 md:h-40 bg-gradient-to-br flex items-center justify-center overflow-hidden',
                            CATEGORY_COLORS[game.category] || CATEGORY_COLORS.Arcade
                          )}
                        >
                          <img
                            src={game.image}
                            alt={game.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <span className="absolute text-2xl sm:text-3xl md:text-4xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
                            {CATEGORY_EMOJI[game.category] || '🎮'}
                          </span>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                          </div>
                        </div>
                        <div className="p-1.5 sm:p-2 md:p-2.5 bg-slate-900">
                          <h3 className="font-bold text-white text-[9px] sm:text-[10px] md:text-[11px] leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                            {game.name}
                          </h3>
                          <span className="text-[7px] sm:text-[8px] md:text-[9px] text-slate-500 mt-0.5 block">
                            {game.category}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {displayedGames.length === 0 && (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-slate-400 text-sm sm:text-base">
                      No games found matching "{searchQuery}"
                    </p>
                  </div>
                )}

                {displayedGamesCount < filteredGames.length && (
                  <div className="flex justify-center pt-4 sm:pt-6">
                    <button
                      onClick={handleLoadMore}
                      className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold transition-all text-sm sm:text-base"
                    >
                      Load More Games ({displayedGamesCount}/{filteredGames.length})
                    </button>
                  </div>
                )}
              </div>

              {!searchQuery && (
                <div className="rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-2xl font-black text-white mb-1 sm:mb-2">
                    Live Feed Active ✓
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-base">
                    {gameIsPlaying ? '✓ Games now embed inside CloudHop!' : 'Games embedded within CloudHop - click a game to play inside your site (no external links).'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
