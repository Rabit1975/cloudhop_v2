import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, Play, ChevronLeft, ChevronRight, X, RotateCcw, Maximize2,
  Star, Gamepad2, Settings, Bell, Download, FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import API_CONFIG from '@/config/api';

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

const parseGameMonetizeXML = (xmlText: string): Game[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  
  if (xmlDoc.parseError.errorCode !== 0) {
    console.error('XML Parse error:', xmlDoc.parseError.reason);
    return [];
  }

  const games: Game[] = [];
  const gameElements = xmlDoc.getElementsByTagName('game');

  for (let i = 0; i < gameElements.length; i++) {
    const gameEl = gameElements[i];
    
    const id = gameEl.getElementsByTagName('id')[0]?.textContent || '';
    const name = gameEl.getElementsByTagName('name')[0]?.textContent || '';
    const categoryRaw = gameEl.getElementsByTagName('category')[0]?.textContent || 'Arcade';
    const image = gameEl.getElementsByTagName('image')[0]?.textContent || '';
    const thumbnail = gameEl.getElementsByTagName('thumbnail')[0]?.textContent || image;

    // Map GameMonetize categories to our UI categories
    let category = 'Arcade';
    const categoryLower = categoryRaw.toLowerCase();
    
    if (categoryLower.includes('action')) category = 'Action';
    else if (categoryLower.includes('puzzle')) category = 'Puzzle';
    else if (categoryLower.includes('sport') || categoryLower.includes('ball')) category = 'Sports';
    else if (categoryLower.includes('adventure')) category = 'Adventure';
    else if (categoryLower.includes('strategy') || categoryLower.includes('chess')) category = 'Strategy';
    else if (categoryLower.includes('idle') || categoryLower.includes('clicker')) category = 'Idle';
    else if (categoryLower.includes('racing') || categoryLower.includes('race')) category = 'Racing';
    else if (categoryLower.includes('horror') || categoryLower.includes('scary')) category = 'Horror';
    else if (categoryLower.includes('platformer') || categoryLower.includes('platform')) category = 'Platformer';
    else if (categoryLower.includes('match') || categoryLower.includes('match-3')) category = 'Match 3';
    else if (categoryLower.includes('multiplayer')) category = 'Multiplayer';
    else if (categoryLower.includes('casual')) category = 'Casual';

    if (id && name) {
      games.push({
        id,
        name,
        category,
        image: thumbnail || image,
        pressKitUrl: `https://gamemonetize.com/?p=${id}`,
      });
    }
  }

  return games;
};

export default function GameHub() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const gridEndRef = useRef<HTMLDivElement>(null);

  // Load games from GameMonetize feed with pagination (using CORS proxy)
  const loadGamesFromFeed = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      // Use CORS proxy to bypass cross-origin restrictions
      const feedUrl = `https://gamemonetize.com/feed.php?format=1&page=${page}`;
      const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
      
      console.log(`📡 Fetching games page ${page} via CORS proxy...`);
      const response = await fetch(corsProxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/xml, text/plain',
        },
      });

      if (!response.ok) {
        throw new Error(`CORS proxy error: ${response.status}`);
      }

      const xmlText = await response.text();
      const loadedGames = parseGameMonetizeXML(xmlText);

      console.log(`✅ Loaded ${loadedGames.length} games from page ${page}`);

      if (loadedGames.length === 0) {
        if (!append) {
          setError('No games found in feed. Please check your connection.');
        }
        setHasMore(false);
      } else {
        if (append) {
          setGames(prev => [...prev, ...loadedGames]);
        } else {
          setGames(loadedGames);
          setSelectedGame(loadedGames[0]);
        }
        setCurrentPage(page);
        setHasMore(loadedGames.length > 0);
      }
    } catch (err) {
      console.error('Error loading games:', err);
      if (!append) {
        setError(`Failed to load games: ${err instanceof Error ? err.message : 'Unknown error'}. Retrying in 5 seconds...`);
        
        // Retry after 5 seconds
        setTimeout(() => {
          loadGamesFromFeed(page, append);
        }, 5000);
      }
    } finally {
      if (!append) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  }, []);

  // Initial load on mount
  useEffect(() => {
    loadGamesFromFeed(1, false);
  }, [loadGamesFromFeed]);

  // Infinite scroll observer
  useEffect(() => {
    if (!gridEndRef.current) return;
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadGamesFromFeed(currentPage + 1, true);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(gridEndRef.current);
    return () => observer.disconnect();
  }, [currentPage, hasMore, loadingMore, loading, loadGamesFromFeed]);

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
            src={`https://gamemonetize.com/?p=${selectedGame.id}`}
            title={selectedGame.name}
            className="absolute inset-0 w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; gamepad"
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
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Battle Arena Gaming Platform - {games.length} Games Loaded</p>
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
              <p className="text-slate-400 text-lg">Loading your game collection from GameMonetize...</p>
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
                      (e.target as HTMLImageElement).style.display = 'none';
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
                          <span className="hidden sm:inline">More Info</span>
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

                {/* Scrolling Game Grid with Infinite Scroll */}
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
                  
                  {/* Infinite scroll trigger */}
                  <div ref={gridEndRef} className="h-4" />
                  
                  {/* Loading more indicator */}
                  {loadingMore && (
                    <div className="text-center py-8">
                      <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-red-500 animate-spin" />
                      <p className="text-slate-400 text-sm">Loading more games...</p>
                    </div>
                  )}
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
