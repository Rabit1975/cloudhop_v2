import { Twitch, Eye, Radio } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const liveStreams = [
  {
    id: 1,
    streamer: "Sarah_M",
    game: "Cyber Nexus 2077",
    viewers: 1234,
    thumbnail: "https://images.unsplash.com/photo-1664092815283-19c6196f5319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1pbmclMjBuZW9ufGVufDF8fHx8MTc3MTE3Njg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Epic PVP Battles - Road to Champion!",
    platform: "twitch" as const,
  },
  {
    id: 2,
    streamer: "Alex_K",
    game: "Fantasy Realm",
    viewers: 856,
    thumbnail: "https://images.unsplash.com/photo-1765606290905-b9d377ea4d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ2FtZSUyMG1lZGlldmFsfGVufDF8fHx8MTc3MTE3Njg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Raiding the Ancient Dungeon - Join Discord!",
    platform: "twitch" as const,
  },
  {
    id: 3,
    streamer: "Chris_T",
    game: "Battle Legends",
    viewers: 2341,
    thumbnail: "https://images.unsplash.com/photo-1562222502-17b433b091c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyfGVufDF8fHx8MTc3MTE2ODkzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "24 Hour Stream! Grinding to Top 10",
    platform: "twitch" as const,
  },
];

export function LiveStreamSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Radio className="w-5 h-5 text-red-500" />
          Friends Live on Twitch
        </h2>
        <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {liveStreams.map((stream) => (
          <div
            key={stream.id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500 transition-all group cursor-pointer"
          >
            <div className="relative h-40 overflow-hidden">
              <ImageWithFallback
                src={stream.thumbnail}
                alt={stream.game}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Live indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-red-600 rounded text-xs font-bold">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
              {/* Viewer count */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs">
                <Eye className="w-3 h-3" />
                <span>{stream.viewers.toLocaleString()}</span>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
            </div>
            
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">{stream.streamer[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 truncate">{stream.title}</h3>
                  <div className="text-xs text-slate-400">{stream.streamer}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Twitch className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-slate-400">{stream.game}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
