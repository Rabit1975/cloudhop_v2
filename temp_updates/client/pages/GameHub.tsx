import { useState, useEffect } from "react";
import { Search, ChevronRight, Play, Zap } from "lucide-react";
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

  // Load games manifest
  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetch("/games-manifest.json");
        const data = await response.json();
        setGames(data.games);

        // Extract unique categories
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

  // Filter games based on search and category
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayClick = () => {
    if (selectedGame) {
      setIsPlaying(true);
    }
  };

  // Game Playing View
  if (isPlaying && selectedGame) {
    return (
      <div className="h-full w-full bg-black flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-400/20 glass-panel relative z-10">
          <h2 className="text-white font-bold">{selectedGame.name}</h2>
          <button
            onClick={() => setIsPlaying(false)}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all"
          >
            Back to Details
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center bg-black">
          <iframe
            src={`/games/${selectedGame.id}/index.html`}
            title={selectedGame.name}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          />
        </div>
      </div>
    );
  }

  // Game Details View
  if (selectedGame) {
    return (
      <div className="h-full w-full overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-transparent to-black p-6">
          {/* Back Button */}
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Games
          </button>

          <div className="max-w-4xl mx-auto">
            {/* Game Hero */}
            <div className="glass-panel rounded-2xl overflow-hidden mb-8 border-cyan-400/30">
              <div className="relative h-80 bg-gradient-to-br from-purple-900 to-black overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-24 h-24 text-cyan-400/30 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">{selectedGame.category}</p>
                </div>
              </div>

              {/* Game Info */}
              <div className="p-8">
                <h1 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400">
                  {selectedGame.name}
                </h1>
                <p className="text-cyan-300 font-semibold mb-6">
                  {selectedGame.category} Game
                </p>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Ready to play {selectedGame.name}? Click the button below to
                  launch the game and start playing!
                </p>

                {/* Play Button */}
                <button
                  onClick={handlePlayClick}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-cyan-500/40"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Games Grid View
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-transparent to-black p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-2">
              HTML5 Games
            </h1>
            <p className="text-gray-400">
              {games.length} amazing games ready to play
            </p>
          </div>

          {/* Search and Filter */}
          <div className="glass-panel rounded-xl border-cyan-400/30 p-6 mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="flex items-center bg-white/5 rounded-lg px-4 py-3 border border-cyan-400/30">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-3">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                    !selectedCategory
                      ? "bg-cyan-500/30 border border-cyan-400 text-cyan-300"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                  )}
                >
                  All Games
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                      selectedCategory === cat
                        ? "bg-cyan-500/30 border border-cyan-400 text-cyan-300"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Info */}
          <p className="text-sm text-gray-400 mb-6">
            {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""}{" "}
            found
          </p>

          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredGames.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="group glass-panel rounded-xl overflow-hidden border-magenta-400/20 hover:border-magenta-400/60 transition-all hover:shadow-xl hover:shadow-magenta-400/20 text-left"
                >
                  {/* Game Image Placeholder */}
                  <div className="relative h-40 bg-gradient-to-br from-purple-900 to-black overflow-hidden flex items-center justify-center">
                    <div className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
                      🎮
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg mb-1 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {game.name}
                    </h3>
                    <p className="text-xs text-cyan-300 font-semibold">
                      {game.category}
                    </p>
                  </div>

                  {/* Play Indicator */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      <Play className="w-3 h-3 fill-current" />
                      Play Game
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No games found matching your search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
