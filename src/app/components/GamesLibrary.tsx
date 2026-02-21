import { useState } from "react";
import { Search, Grid3x3, List, Star, Clock, Download, Filter, ChevronLeft, ChevronRight, Play as PlayIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Generate a larger game library with variety
const generateGames = () => {
  const gameTemplates = [
    {
      title: "Cyber Nexus 2077",
      image: "https://images.unsplash.com/photo-1664092815283-19c6196f5319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1pbmclMjBuZW9ufGVufDF8fHx8MTc3MTE3Njg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "RPG",
      unityPlay: true,
      platform: "unity",
    },
    {
      title: "Fantasy Realm",
      image: "https://images.unsplash.com/photo-1765606290905-b9d377ea4d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ2FtZSUyMG1lZGlldmFsfGVufDF8fHx8MTc3MTE3Njg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "MMORPG",
      unityPlay: true,
      platform: "unity",
    },
    {
      title: "Starship Commander",
      image: "https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaS1maSUyMGdhbWV8ZW58MXx8fHwxNzcxMTY4OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Strategy",
      unityPlay: false,
      platform: "steam",
    },
    {
      title: "Velocity Racers",
      image: "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTE2ODkzNnww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Racing",
      unityPlay: true,
      platform: "unity",
    },
    {
      title: "Battle Legends",
      image: "https://images.unsplash.com/photo-1562222502-17b433b091c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyfGVufDF8fHx8MTc3MTE2ODkzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Battle Royale",
      unityPlay: true,
      platform: "steam",
    },
    {
      title: "Dark Corridor",
      image: "https://images.unsplash.com/photo-1762217235246-4235328d882b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBnYW1lJTIwZGFya3xlbnwxfHx8fDE3NzExMjY3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Horror",
      unityPlay: false,
      platform: "steam",
    },
    {
      title: "Dragon Warriors",
      image: "https://images.unsplash.com/photo-1763296557023-853de43acadc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHJhZ29uJTIwd2FycmlvcnxlbnwxfHx8fDE3NzEwODMzODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Action",
      unityPlay: true,
      platform: "unity",
    },
    {
      title: "Neon City",
      image: "https://images.unsplash.com/photo-1715614176939-f5c46ae99d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eSUyMG5lb258ZW58MXx8fHwxNzcxMTI0NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Adventure",
      unityPlay: true,
      platform: "steam",
    },
  ];

  const games = [];
  for (let i = 0; i < 150; i++) {
    const template = gameTemplates[i % gameTemplates.length];
    games.push({
      id: i + 1,
      title: `${template.title} ${i > 7 ? (i + 1) : ''}`.trim(),
      image: template.image,
      genre: template.genre,
      hoursPlayed: Math.floor(Math.random() * 200) + 5,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      installed: Math.random() > 0.3,
      unityPlay: template.unityPlay,
      platform: template.platform,
    });
  }
  return games;
};

const allGames = generateGames();
const genres = ["All Games", "RPG", "MMORPG", "Strategy", "Racing", "Battle Royale", "Horror", "Action", "Adventure"];
const ITEMS_PER_PAGE = 24;

export function GamesLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedGenre, setSelectedGenre] = useState("All Games");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "hours" | "rating">("name");
  const [showUnityOnly, setShowUnityOnly] = useState(false);

  const filteredGames = allGames
    .filter((game) => {
      const matchesGenre = selectedGenre === "All Games" || game.genre === selectedGenre;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesUnity = !showUnityOnly || game.unityPlay;
      return matchesGenre && matchesSearch && matchesUnity;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "hours") return b.hoursPlayed - a.hoursPlayed;
      if (sortBy === "rating") return parseFloat(b.rating) - parseFloat(a.rating);
      return 0;
    });

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  const handleFilterChange = (callback: () => void) => {
    callback();
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Game Library</h1>
          <p className="text-slate-400">{filteredGames.length} games available</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUnityOnly(!showUnityOnly)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              showUnityOnly
                ? "bg-purple-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <PlayIcon className="w-4 h-4" />
            Unity Play Only
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(e) => handleFilterChange(() => setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="name">Sort by Name</option>
            <option value="hours">Sort by Hours</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-purple-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-purple-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleFilterChange(() => setSelectedGenre(genre))}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedGenre === genre
                ? "bg-purple-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Games Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedGames.map((game) => (
            <div
              key={game.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500 transition-all group"
            >
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className="absolute top-2 left-2 right-2 flex gap-1 flex-wrap">
                  <span className="px-2 py-1 bg-slate-900/90 backdrop-blur-sm rounded-full text-xs">
                    {game.genre}
                  </span>
                  {game.unityPlay && (
                    <span className="px-2 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
                      <PlayIcon className="w-3 h-3" />
                      Unity
                    </span>
                  )}
                  {game.platform === "steam" && (
                    <span className="px-2 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c.93 0 1.83-.13 2.68-.37L8.5 18.4l-.11-.02a3.5 3.5 0 0 1 0-6.98l7.52-3.2A10 10 0 0 0 12 2m0 1.5a8.5 8.5 0 0 1 8.5 8.5 8.5 8.5 0 0 1-8.5 8.5 8.5 8.5 0 0 1-8.5-8.5 8.5 8.5 0 0 1 8.5-8.5m5.5 5a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 20 11a2.5 2.5 0 0 0-2.5-2.5m0 1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S16 11.33 16 10.5s.67-1.5 1.5-1.5M8.5 12.5a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"/>
                      </svg>
                      Steam
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="font-semibold mb-1 text-sm truncate">{game.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{game.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{game.hoursPlayed}h</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3">
                {game.installed ? (
                  <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm">
                    Play Now
                  </button>
                ) : (
                  <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                    <Download className="w-3 h-3" />
                    Install
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {paginatedGames.map((game) => (
            <div
              key={game.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-purple-500 transition-all flex items-center gap-4"
            >
              <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{game.title}</h3>
                  <div className="flex items-center gap-1">
                    {game.unityPlay && (
                      <span className="px-2 py-0.5 bg-purple-600 rounded text-xs flex items-center gap-1">
                        <PlayIcon className="w-3 h-3" />
                        Unity
                      </span>
                    )}
                    {game.platform === "steam" && (
                      <span className="px-2 py-0.5 bg-blue-500 rounded text-xs flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c.93 0 1.83-.13 2.68-.37L8.5 18.4l-.11-.02a3.5 3.5 0 0 1 0-6.98l7.52-3.2A10 10 0 0 0 12 2m0 1.5a8.5 8.5 0 0 1 8.5 8.5 8.5 8.5 0 0 1-8.5 8.5 8.5 8.5 0 0 1-8.5-8.5 8.5 8.5 0 0 1 8.5-8.5m5.5 5a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 20 11a2.5 2.5 0 0 0-2.5-2.5m0 1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S16 11.33 16 10.5s.67-1.5 1.5-1.5M8.5 12.5a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"/>
                        </svg>
                        Steam
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{game.genre}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{game.hoursPlayed}h played</span>
                  </div>
                </div>
              </div>
              {game.installed ? (
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  Play
                </button>
              ) : (
                <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Install
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? "bg-purple-600 text-white"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No games found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}