import { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Search, ChevronLeft, ChevronRight, Play, Gamepad2,
  Flame, Star, TrendingUp, Grid3X3, X, Maximize2,
  RotateCcw, List, Clock, Trophy, Target, LayoutGrid,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Game {
  id: string;
  name: string;
  category: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  Puzzle: '🧩', Action: '⚔️', Sports: '⚽', Adventure: '🗺️',
  Social: '👥', Classic: '🕹️', Strategy: '♟️', Idle: '⏳',
  Arcade: '🕹️', Platformer: '🏃',
};

const CATEGORY_GRADIENT: Record<string, string> = {
  Puzzle: 'from-blue-600/50 to-indigo-900/70',
  Action: 'from-red-600/50 to-orange-900/70',
  Sports: 'from-green-600/50 to-emerald-900/70',
  Adventure: 'from-amber-500/50 to-yellow-900/70',
  Social: 'from-pink-600/50 to-fuchsia-900/70',
  Classic: 'from-gray-500/50 to-slate-900/70',
  Strategy: 'from-violet-600/50 to-purple-900/70',
  Idle: 'from-teal-500/50 to-cyan-900/70',
  Arcade: 'from-orange-500/50 to-red-900/70',
  Platformer: 'from-lime-500/50 to-green-900/70',
};

const BADGE_LABELS = ['HOT 🔥', 'NEW ✨', 'TOP RATED ⭐', 'TRENDING 📈', 'FEATURED 🎯'];
const ITEMS_PER_PAGE = 24;

export default function GameHub() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCarouselIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => { emblaApi.off('select', onSelect); clearInterval(timer); };
  }, [emblaApi]);

  useEffect(() => {
    fetch('/games-manifest.json')
      .then((r) => r.json())
      .then((data) => {
        setGames(data.games);
        const cats = Array.from(new Set(data.games.map((g: Game) => g.category))) as string[];
        setCategories(cats.sort());
      })
      .catch(console.error);
  }, []);

  const handleFilterChange = (fn: () => void) => { fn(); setCurrentPage(1); };

  const filtered = games
    .filter((g) => {
      const ms = g.name.toLowerCase().includes(searchQuery.toLowerCase());
      const mc = !selectedCategory || g.category === selectedCategory;
      return ms && mc;
    })
    .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageGames = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const carouselGames = games.slice(0, 5);
  const trending = games.slice(0, 6);

  const emoji = (g: Game) => CATEGORY_EMOJI[g.category] ?? '🎮';
  const grad = (g: Game) => CATEGORY_GRADIENT[g.category] ?? 'from-cyan-900/50 to-black';

  const handleFullscreen = () => iframeRef.current?.requestFullscreen?.();
  const handleReload = () => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; };

  /* ── Active Game View ─────────────────────────────────────────── */
  if (isPlaying && selectedGame) {
    return (
      <div className="h-full w-full flex flex-col bg-slate-950">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xl">{emoji(selectedGame)}</span>
            <div>
              <p className="text-white font-black text-sm leading-tight">{selectedGame.name}</p>
              <p className="text-cyan-400 text-[11px]">{selectedGame.category}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReload} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all"><RotateCcw className="w-4 h-4" /></button>
            <button onClick={handleFullscreen} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all"><Maximize2 className="w-4 h-4" /></button>
            <button onClick={() => setIsPlaying(false)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all text-sm font-bold"><X className="w-3.5 h-3.5" /> Exit</button>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <iframe ref={iframeRef} src={`/games/${selectedGame.id}/index.html`} title={selectedGame.name} className="absolute inset-0 w-full h-full border-none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" />
        </div>
      </div>
    );
  }

  /* ── Game Detail Screen ───────────────────────────────────────── */
  if (selectedGame) {
    return (
      <div className="h-full w-full overflow-y-auto bg-slate-950">
        <div className="min-h-screen p-6">
          <button onClick={() => setSelectedGame(null)} className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all font-bold text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Games
          </button>
          <div className="max-w-xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <div className={cn('relative h-52 bg-gradient-to-br flex items-center justify-center', grad(selectedGame))}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
                <div className="relative text-center">
                  <div className="text-8xl drop-shadow-2xl mb-3">{emoji(selectedGame)}</div>
                  <span className="px-4 py-1.5 rounded-full bg-black/50 border border-cyan-400/40 text-cyan-300 text-xs font-black tracking-widest uppercase">{selectedGame.category}</span>
                </div>
              </div>
              <div className="p-7">
                <h1 className="text-3xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400">{selectedGame.name}</h1>
                <p className="text-sm text-slate-400 mb-5">Free to play · No download · Runs instantly in your browser</p>
                <div className="flex items-center gap-5 mb-7 text-sm">
                  <span className="flex items-center gap-1.5 text-yellow-400 font-bold"><Star className="w-4 h-4 fill-current" /> 4.7</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold"><TrendingUp className="w-4 h-4" /> Popular</span>
                  <span className="flex items-center gap-1.5 text-cyan-400/70"><Gamepad2 className="w-4 h-4" /> HTML5</span>
                </div>
                <button onClick={() => setIsPlaying(true)} className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-black text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/40 hover:brightness-110">
                  <Play className="w-6 h-6 fill-current" /> Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main Dashboard ───────────────────────────────────────────── */
  return (
    <div className="h-full w-full overflow-y-auto bg-slate-950 text-white">
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 mb-0.5">Game Hub</h1>
              <p className="text-slate-400 text-sm"><span className="text-cyan-400 font-bold">{games.length}</span> free HTML5 games · instant play · no credits</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-full px-4 py-2">
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" /> No downloads needed
            </div>
          </div>

          {/* Featured Carousel */}
          {carouselGames.length > 0 && (
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl border border-slate-800" ref={emblaRef}>
                <div className="flex">
                  {carouselGames.map((game, i) => (
                    <div key={game.id} className="flex-[0_0_100%] min-w-0">
                      <div className="relative h-72 md:h-[420px] overflow-hidden bg-slate-900">
                        {/* hero bg */}
                        <img src="/Robotninja%20.png" alt="hero" className="absolute inset-0 w-full h-full object-cover object-top opacity-40" />
                        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-60', grad(game))} />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        {/* content */}
                        <div className="absolute inset-0 flex items-center">
                          <div className="p-8 md:p-12 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 backdrop-blur-sm rounded-full text-xs font-black text-cyan-300 mb-4 tracking-widest">
                              {BADGE_LABELS[i % BADGE_LABELS.length]}
                            </div>
                            <div className="text-6xl md:text-7xl mb-4 drop-shadow-2xl">{emoji(game)}</div>
                            <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight text-white drop-shadow-lg">{game.name}</h2>
                            <div className="flex items-center gap-4 mb-6 text-sm">
                              <span className="flex items-center gap-1 text-yellow-400 font-bold"><Star className="w-4 h-4 fill-current" /> 4.8</span>
                              <span className="text-slate-300">{game.category}</span>
                              <span className="flex items-center gap-1 text-cyan-300"><Gamepad2 className="w-4 h-4" /> HTML5</span>
                            </div>
                            <div className="flex gap-3">
                              <button onClick={() => { setSelectedGame(game); setIsPlaying(true); }} className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-black rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/40 hover:brightness-110 active:scale-95 transition-all">
                                <Play className="w-5 h-5 fill-current" /> Play Now
                              </button>
                              <button onClick={() => setSelectedGame(game)} className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl font-bold transition-all">
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Arrows */}
              <button onClick={scrollPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={scrollNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10">
                <ChevronRight className="w-5 h-5" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselGames.map((_, i) => (
                  <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={cn('h-1.5 rounded-full transition-all', i === carouselIndex ? 'w-8 bg-cyan-400' : 'w-4 bg-white/30 hover:bg-white/50')} />
                ))}
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Gamepad2, label: 'Games Available', value: games.length.toString(), change: 'Free to play', color: 'from-cyan-500 to-blue-500' },
              { icon: Trophy, label: 'Categories', value: categories.length.toString(), change: 'All genres', color: 'from-yellow-500 to-orange-500' },
              { icon: Target, label: 'Arcade & Action', value: games.filter(g => ['Arcade','Action','Classic'].includes(g.category)).length.toString(), change: 'Fast-paced', color: 'from-red-500 to-pink-500' },
              { icon: Clock, label: 'Puzzle & Strategy', value: games.filter(g => ['Puzzle','Strategy'].includes(g.category)).length.toString(), change: 'Brain games', color: 'from-violet-500 to-purple-500' },
            ].map((s) => (
              <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center', s.color)}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-slate-400">{s.change}</span>
                </div>
                <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Trending Row */}
          {trending.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-400" />
                <h2 className="text-base font-black text-white">Trending Now</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {trending.map((game) => (
                  <button key={`trend-${game.id}`} onClick={() => setSelectedGame(game)}
                    className={cn('flex-shrink-0 group relative w-28 h-28 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20 bg-gradient-to-br', grad(game))}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                      <span className="text-3xl">{emoji(game)}</span>
                      <span className="text-[10px] font-black text-white/90 text-center px-1 line-clamp-2 leading-tight">{game.name}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Library Section */}
          <div>
            {/* Library header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-black text-white">Game Library</h2>
                <p className="text-slate-400 text-sm">{filtered.length} games available</p>
              </div>
              <div className="flex items-center gap-2">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'category')}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors">
                  <option value="name">Sort: Name</option>
                  <option value="category">Sort: Category</option>
                </select>
                <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-300' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white')}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-300' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white')}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search + categories */}
            <div className="space-y-3 mb-5">
              <div className="relative flex items-center bg-slate-900 border border-slate-800 hover:border-slate-700 focus-within:border-cyan-500 rounded-xl px-4 py-2.5 transition-all">
                <Search className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                <input type="text" placeholder="Search your library..." value={searchQuery}
                  onChange={(e) => handleFilterChange(() => setSearchQuery(e.target.value))}
                  className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm" />
                {searchQuery && <button onClick={() => handleFilterChange(() => setSearchQuery(''))} className="ml-2 text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>}
              </div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => handleFilterChange(() => setSelectedCategory(null))}
                  className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all border',
                    !selectedCategory ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white')}>
                  <Grid3X3 className="w-3 h-3" /> All Games
                </button>
                {categories.map((cat) => (
                  <button key={cat} onClick={() => handleFilterChange(() => setSelectedCategory(selectedCategory === cat ? null : cat))}
                    className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all border',
                      selectedCategory === cat ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white')}>
                    <span>{CATEGORY_EMOJI[cat] ?? '🎮'}</span> {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid or List */}
            {pageGames.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 mb-6">
                  {pageGames.map((game) => (
                    <button key={game.id} onClick={() => setSelectedGame(game)}
                      className="group relative rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/15 hover:-translate-y-0.5 text-left">
                      <div className={cn('relative h-20 bg-gradient-to-br flex items-center justify-center', grad(game))}>
                        <span className="text-3xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">{emoji(game)}</span>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900">
                        <h3 className="font-bold text-white text-[11px] leading-tight line-clamp-2 group-hover:text-cyan-300 transition-colors">{game.name}</h3>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">{game.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 mb-6">
                  {pageGames.map((game) => (
                    <div key={game.id} onClick={() => setSelectedGame(game)}
                      className="flex items-center gap-4 p-3 bg-slate-900 border border-slate-800 hover:border-cyan-400/50 rounded-xl transition-all cursor-pointer group">
                      <div className={cn('w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br', grad(game))}>
                        <span className="text-2xl">{emoji(game)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">{game.name}</h3>
                        <p className="text-xs text-slate-400">{game.category} · HTML5 · Free</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedGame(game); setIsPlaying(true); }}
                        className="px-5 py-2 bg-cyan-500/20 border border-cyan-400/50 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-all text-sm font-bold flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 fill-current" /> Play
                      </button>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-white font-bold mb-1">No games found</p>
                <p className="text-slate-400 text-sm mb-6">Try a different search or category</p>
                <button onClick={() => { handleFilterChange(() => setSearchQuery('')); setSelectedCategory(null); }}
                  className="px-6 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all font-bold text-sm">
                  Show All Games
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pb-8">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-40 hover:bg-slate-800 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p = i + 1;
                  if (totalPages > 5) {
                    if (currentPage <= 3) p = i + 1;
                    else if (currentPage >= totalPages - 2) p = totalPages - 4 + i;
                    else p = currentPage - 2 + i;
                  }
                  return (
                    <button key={p} onClick={() => setCurrentPage(p)}
                      className={cn('w-9 h-9 rounded-lg text-sm font-bold transition-colors', currentPage === p ? 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-300' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800')}>
                      {p}
                    </button>
                  );
                })}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-40 hover:bg-slate-800 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
