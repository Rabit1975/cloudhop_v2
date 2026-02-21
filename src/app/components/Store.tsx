import { ShoppingCart, Star, TrendingUp, Zap, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featuredGame = {
  title: "Epic Quest: Legends Reborn",
  image: "https://images.unsplash.com/photo-1664092815283-19c6196f5319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1pbmclMjBuZW9ufGVufDF8fHx8MTc3MTE3Njg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
  description: "Embark on the adventure of a lifetime in this critically acclaimed action RPG.",
  price: 59.99,
  discount: 25,
  rating: 4.9,
  reviews: 12453,
};

const storeGames = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image: "https://images.unsplash.com/photo-1664092815283-19c6196f5319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1pbmclMjBuZW9ufGVufDF8fHx8MTc3MTE3Njg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 49.99,
    discount: 15,
    rating: 4.5,
    genre: "RPG",
  },
  {
    id: 2,
    title: "Pixel Warriors",
    image: "https://images.unsplash.com/photo-1765606290905-b9d377ea4d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ2FtZSUyMG1lZGlldmFsfGVufDF8fHx8MTc3MTE3Njg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 19.99,
    discount: 0,
    rating: 4.7,
    genre: "Indie",
  },
  {
    id: 3,
    title: "Starship Commander",
    image: "https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaS1maSUyMGdhbWV8ZW58MXx8fHwxNzcxMTY4OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 39.99,
    discount: 30,
    rating: 4.2,
    genre: "Strategy",
  },
  {
    id: 4,
    title: "Velocity Racers",
    image: "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTE2ODkzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 44.99,
    discount: 20,
    rating: 4.6,
    genre: "Racing",
  },
  {
    id: 5,
    title: "Battle Legends",
    image: "https://images.unsplash.com/photo-1562222502-17b433b091c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyfGVufDF8fHx8MTc3MTE2ODkzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 0,
    discount: 0,
    rating: 4.7,
    genre: "Battle Royale",
  },
  {
    id: 6,
    title: "Dark Corridor",
    image: "https://images.unsplash.com/photo-1762217235246-4235328d882b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBnYW1lJTIwZGFya3xlbnwxfHx8fDE3NzExMjY3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 29.99,
    discount: 10,
    rating: 4.4,
    genre: "Horror",
  },
];

const categories = [
  { name: "New Releases", icon: Zap },
  { name: "Top Sellers", icon: TrendingUp },
  { name: "On Sale", icon: Tag },
];

export function Store() {
  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Store</h1>
        <p className="text-slate-400">Discover and purchase new games</p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <category.icon className="w-6 h-6" />
              </div>
              <span className="font-semibold">{category.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Featured Game */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500 transition-all">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-64 md:h-auto">
            <ImageWithFallback
              src={featuredGame.image}
              alt={featuredGame.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent" />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-sm text-purple-400 mb-2">
              <Zap className="w-4 h-4" />
              <span>Featured Game</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">{featuredGame.title}</h2>
            <p className="text-slate-400 mb-4">{featuredGame.description}</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{featuredGame.rating}</span>
                <span className="text-sm text-slate-400">
                  ({featuredGame.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-400">
                    ${calculateDiscountedPrice(featuredGame.price, featuredGame.discount)}
                  </span>
                  {featuredGame.discount > 0 && (
                    <>
                      <span className="text-lg text-slate-500 line-through">
                        ${featuredGame.price}
                      </span>
                      <span className="px-2 py-1 bg-green-500 text-white text-sm rounded">
                        -{featuredGame.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button className="ml-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Games */}
      <div>
        <h2 className="text-xl font-bold mb-4">Browse Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeGames.map((game) => (
            <div
              key={game.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                {game.discount > 0 && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-green-500 text-white rounded text-sm font-bold">
                      -{game.discount}%
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold mb-1">{game.title}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{game.rating}</span>
                    </div>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-400">{game.genre}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  {game.price === 0 ? (
                    <span className="text-lg font-bold text-green-400">Free to Play</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      {game.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-green-400">
                            ${calculateDiscountedPrice(game.price, game.discount)}
                          </span>
                          <span className="text-sm text-slate-500 line-through">
                            ${game.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">${game.price}</span>
                      )}
                    </div>
                  )}
                </div>
                <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
