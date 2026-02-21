import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Play, ChevronLeft, ChevronRight, Info, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featuredGames = [
  {
    id: 1,
    title: "Neon Chronicles: Future Legends",
    description: "Experience the next generation of open-world action in a stunning cyberpunk metropolis where every choice matters.",
    image: "https://images.unsplash.com/photo-1715614176939-f5c46ae99d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eSUyMG5lb258ZW58MXx8fHwxNzcxMTI0NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    genre: "Action RPG",
    rating: 4.9,
    badge: "NEW RELEASE",
    unityPlay: true,
  },
  {
    id: 2,
    title: "Dragon's Dominion: Rise of Heroes",
    description: "Unite legendary warriors and mythical beasts in an epic fantasy adventure that will determine the fate of kingdoms.",
    image: "https://images.unsplash.com/photo-1763296557023-853de43acadc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHJhZ29uJTIwd2FycmlvcnxlbnwxfHx8fDE3NzEwODMzODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    genre: "Fantasy MMORPG",
    rating: 4.8,
    badge: "TRENDING",
    unityPlay: true,
  },
  {
    id: 3,
    title: "Cosmic Warfare: Stellar Command",
    description: "Command massive fleets in breathtaking space battles across an endless universe filled with danger and discovery.",
    image: "https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGJhdHRsZSUyMHN0YXJzaGlwfGVufDF8fHx8MTc3MTE2NzMxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    genre: "Strategy",
    rating: 4.7,
    badge: "FEATURED",
    unityPlay: false,
  },
  {
    id: 4,
    title: "Wasteland Warriors: Survival",
    description: "Survive in a brutal post-apocalyptic world where resources are scarce and danger lurks around every corner.",
    image: "https://images.unsplash.com/photo-1590087494675-033d2901737e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcG9jYWx5cHRpYyUyMHdhc3RlbGFuZHxlbnwxfHx8fDE3NzExNzcxMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    genre: "Survival",
    rating: 4.6,
    badge: "POPULAR",
    unityPlay: true,
  },
  {
    id: 5,
    title: "Mystic Realms: Arcane Quest",
    description: "Unlock ancient powers and explore mystical lands in this enchanting adventure filled with magic and mystery.",
    image: "https://images.unsplash.com/photo-1677126138778-bd31ce2d4abc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcGljJTIwZ2FtZSUyMGFydHdvcmslMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcxMTc3MTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    genre: "Adventure",
    rating: 4.9,
    badge: "EDITOR'S CHOICE",
    unityPlay: true,
  },
];

export function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {featuredGames.map((game) => (
            <div key={game.id} className="flex-[0_0_100%] min-w-0">
              <div className="relative h-[500px] overflow-hidden bg-slate-900">
                {/* Background Image */}
                <ImageWithFallback
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-3xl p-12">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                      <span>{game.badge}</span>
                      {game.unityPlay && (
                        <>
                          <span className="text-purple-200">·</span>
                          <span className="text-purple-200">Unity Play</span>
                        </>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-5xl font-bold mb-4 leading-tight">
                      {game.title}
                    </h2>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{game.rating}</span>
                      </div>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-300">{game.genre}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                      {game.description}
                    </p>
                    
                    {/* CTAs */}
                    <div className="flex items-center gap-4">
                      <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-3 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105">
                        <Play className="w-6 h-6" />
                        <span className="font-semibold text-lg">Play Now</span>
                      </button>
                      <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all flex items-center gap-3 border border-white/20">
                        <Info className="w-6 h-6" />
                        <span className="font-semibold text-lg">More Info</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1 rounded-full transition-all ${
              index === selectedIndex
                ? "w-8 bg-purple-500"
                : "w-6 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
