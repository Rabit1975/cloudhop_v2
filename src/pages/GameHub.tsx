import { useState, useEffect } from "react";
import { Search, ChevronRight, Play, Zap, Flame, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  name: string;
  category: string;
}

export default function GameHub() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetch("/games-manifest.json");
        const data = await response.json();
        setGames(data.games);
        const uniqueCategories = Array.from(
          new Set(data.games.map((g: Game) => g.category))
        ) as string[];
        setCategories(uniqueCategories.sort());
      } catch (error) {
        console.error("Failed to load games manifest:", error);
      }
    };
    loadGames();
  }, []);

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayClick = () => {
    if (selectedGame) setIsPlaying(true);
  };

  if (isPlaying && selectedGame) {
    return (
      <div className="h-full w-full bg-black flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-400/20 glass-panel relative z-10">
          <h2 className="text-foreground font-bold">{selectedGame.name}</h2>
          <button onClick={() => setIsPlaying(false)} className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all">
            Back to Details
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center bg-black">
          <iframe src={`/games/${selectedGame.id}/index.html`} title={selectedGame.name} style={{ width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" />
        </div>
      </div>
    );
  }

  if (selectedGame) {
    return (
      <div className="h-full w-full overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-transparent to-black p-6">
          <button onClick={() => setSelectedGame(null)} className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Games
          </button>
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel rounded-2xl overflow-hidden mb-8 border-cyan-400/30">
              <div className="relative h-80 bg-gradient-to-br from-purple-900 to-black overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-24 h-24 text-cyan-400/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">{selectedGame.category}</p>
                </div>
              </div>
              <div className="p-8">
                <h1 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400">{selectedGame.name}</h1>
                <p className="text-cyan-300 font-semibold mb-6">{selectedGame.category} Game</p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">Ready to play {selectedGame.name}? Click the button below to launch the game and start playing!</p>
                <button onClick={handlePlayClick} className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-cyan-500/40">
                  <Play className="w-6 h-6 fill-current" /> Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const trendingGames = games.slice(0, 5);
  const featuredGame = games[0];

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-transparent to-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 mb-2">HTML5 Games</h1>
            <p className="text-muted-foreground text-lg">{games.length} amazing games ready to play</p>
          </div>

          {featuredGame && (
            <div className="mb-12">
              <button onClick={() => setSelectedGame(featuredGame)} className="w-full group glass-panel rounded-2xl overflow-hidden border-cyan-400/40 hover:border-cyan-400/80 transition-all relative hover:shadow-2xl hover:shadow-cyan-500/30">
                <div className="relative h-56 bg-gradient-to-br from-cyan-900/40 via-magenta-900/30 to-purple-900/40 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 group-hover:from-cyan-500/20 group-hover:to-magenta-500/20 transition-all" />
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-magenta-400 px-4 py-2 rounded-full">
                    <Flame className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">Featured</span>
                  </div>
                  <div className="text-8xl opacity-30 group-hover:opacity-50 transition-opacity">🎮</div>
                </div>
                <div className="p-8 relative z-10 text-left">
                  <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-magenta-300">{featuredGame.name}</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-semibold text-sm">{featuredGame.category}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-current" />))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6 max-w-2xl">Jump into {featuredGame.name} and experience an incredible gaming adventure!</p>
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-lg group-hover:gap-3 transition-all">
                    <Play className="w-5 h-5 fill-current" /> Play Now
                  </div>
                </div>
              </button>
            </div>
          )}

          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {trendingGames.map((game) => (
                <button key={`trending-${game.id}`} onClick={() => setSelectedGame(game)} className="group relative rounded-lg overflow-hidden border border-orange-400/30 hover:border-orange-400/80 transition-all h-32 hover:shadow-lg hover:shadow-orange-500/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-red-900/20 group-hover:from-orange-900/40 group-hover:to-red-900/40 transition-all" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl mb-2">🎮</div>
                    <p className="text-xs font-bold text-foreground text-center px-2 line-clamp-2">{game.name}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">{game.category}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-magenta-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-all" />
              <div className="relative flex items-center bg-black/50 rounded-lg px-4 py-3 border border-cyan-400/50 group-hover:border-cyan-400/80 transition-all">
                <Search className="w-5 h-5 text-cyan-400 mr-3" />
                <input type="text" placeholder="Search games..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none text-lg" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <p className="text-lg font-bold text-foreground">Filter by Category</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setSelectedCategory(null)} className={cn("px-6 py-2 rounded-full font-bold text-sm transition-all border", !selectedCategory ? "bg-gradient-to-r from-cyan-500 to-magenta-500 text-white border-transparent shadow-lg shadow-cyan-500/50" : "bg-white/5 border-cyan-400/30 text-muted-foreground hover:border-cyan-400/60 hover:text-foreground")}>
                All Games
              </button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={cn("px-6 py-2 rounded-full font-bold text-sm transition-all border", selectedCategory === cat ? "bg-gradient-to-r from-cyan-500 to-magenta-500 text-white border-transparent shadow-lg shadow-cyan-500/50" : "bg-white/5 border-cyan-400/20 text-muted-foreground hover:border-cyan-400/60 hover:text-foreground")}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-8 font-semibold">{filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} found</p>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredGames.map((game) => (
                <button key={game.id} onClick={() => setSelectedGame(game)} className="group glass-panel rounded-xl overflow-hidden border-cyan-400/30 hover:border-cyan-400/80 transition-all text-left relative hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-magenta-500/0 group-hover:from-cyan-500/20 group-hover:to-magenta-500/20 transition-all pointer-events-none" />
                  <div className="relative h-48 bg-gradient-to-br from-cyan-900/30 via-purple-900/20 to-magenta-900/20 overflow-hidden flex items-center justify-center border-b border-cyan-400/20 group-hover:border-cyan-400/40">
                    <div className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity transform group-hover:scale-110 duration-300">🎮</div>
                  </div>
                  <div className="p-5 relative z-10">
                    <h3 className="font-black text-foreground text-base mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">{game.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded">{game.category}</span>
                      <span className="text-xs text-magenta-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{Math.floor(Math.random() * 500) + 100} plays</span>
                    </div>
                  </div>
                  <div className="px-5 pb-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 fill-current" /> Play
                      </div>
                      <ChevronRight className="w-4 h-4 text-magenta-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-xl font-semibold">No games found matching your search</p>
              <button onClick={() => setSearchQuery("")} className="mt-4 px-6 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all">Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
