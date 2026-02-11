import { useState } from "react";
import { Send, Palette, Globe, MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import RabbitAI from "@/components/RabbitAI";

interface Message {
  id: string;
  sender: "user" | "rabbit";
  content: string;
  timestamp: Date;
}

interface Room {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const ROOMS: Room[] = [
  {
    id: "fluid-art",
    name: "Fluid Art Studio",
    icon: <Palette className="w-5 h-5" />,
    description: "Create and explore acrylic pour paintings",
  },
  {
    id: "solar-system",
    name: "Solar System",
    icon: <Globe className="w-5 h-5" />,
    description: "Explore the cosmos",
  },
  {
    id: "community",
    name: "Community",
    icon: <MessageSquare className="w-5 h-5" />,
    description: "Connect with others",
  },
];

export default function Spaces() {
  const [currentRoom, setCurrentRoom] = useState<string | null>("fluid-art");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "rabbit",
      content:
        "Welcome to your Fluid Art Studio! 🎨 I'm RabbitAI, your creative companion. Want to learn about acrylic pour painting or jump right into creating?",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRabbitThinking, setIsRabbitThinking] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate RabbitAI thinking and responding
    setIsRabbitThinking(true);
    setTimeout(() => {
      const responses = [
        "That's a wonderful idea! Let me guide you through the technique. The key is to pour colors in layers and let gravity do the work. 🌊",
        "I love your enthusiasm! For acrylic pouring, you'll want to mix your paints with a pouring medium. It creates those beautiful flowing patterns.",
        "Great question! The canvas should be tilted at about 45 degrees to allow the paint to flow and create interesting patterns naturally.",
        "Perfect timing to explore! I've found some amazing tutorials on YouTube - let me show you some techniques used by the masters.",
      ];

      const response: Message = {
        id: String(messages.length + 2),
        sender: "rabbit",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, response]);
      setIsRabbitThinking(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle any room with a back button
  if (currentRoom && currentRoom !== "fluid-art") {
    const room = ROOMS.find((r) => r.id === currentRoom);
    return (
      <div className="h-full w-full overflow-hidden flex flex-col bg-gradient-to-br from-purple-900/20 via-transparent to-black">
        {/* Room Header with Back Button */}
        <div className="glass-panel flex items-center justify-between px-6 py-4 border-b border-cyan-400/20 relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRoom(null)}
              className="p-2 hover:bg-white/10 rounded-lg text-cyan-400 transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white">{room?.name}</h2>
              <p className="text-xs text-gray-400">{room?.description}</p>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">{room?.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{room?.name}</h3>
            <p className="text-gray-400 mb-6">Coming soon...</p>
            <button
              onClick={() => setCurrentRoom(null)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold hover:opacity-90 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fluid Art Studio Room
  if (currentRoom === "fluid-art") {
    return (
      <div className="h-full w-full overflow-hidden flex flex-col bg-gradient-to-br from-purple-900/20 via-transparent to-black">
        {/* Room Header */}
        <div className="glass-panel flex items-center justify-between px-6 py-4 border-b border-cyan-400/20 relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRoom(null)}
              className="p-2 hover:bg-white/10 rounded-lg text-cyan-400 transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white">Fluid Art Studio</h2>
              <p className="text-xs text-gray-400">Create acrylic pour art</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden flex gap-4 p-4">
          {/* Canvas Area */}
          <div className="flex-1 glass-panel rounded-xl overflow-hidden border-cyan-400/30 flex flex-col">
            <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative flex items-center justify-center">
              {/* Canvas Placeholder */}
              <div className="w-full h-full max-w-2xl max-h-2xl bg-white/5 border-2 border-dashed border-cyan-400/30 rounded-lg flex flex-col items-center justify-center">
                <Palette className="w-16 h-16 text-cyan-400/30 mb-4" />
                <p className="text-gray-500 font-semibold">Canvas Area</p>
                <p className="text-gray-600 text-sm mt-2">
                  HTML5 Canvas + Drawing Library Integration
                </p>
              </div>
            </div>

            {/* Canvas Controls */}
            <div className="px-6 py-4 border-t border-cyan-400/20 flex gap-2 flex-wrap">
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all text-sm font-medium">
                Clear Canvas
              </button>
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all text-sm font-medium">
                Save Artwork
              </button>
              <button className="px-4 py-2 rounded-lg bg-magenta-500/20 border border-magenta-400/50 text-magenta-300 hover:bg-magenta-500/30 transition-all text-sm font-medium">
                Undo
              </button>
            </div>
          </div>

          {/* Tutorial Sidebar */}
          <div className="w-80 glass-panel rounded-xl overflow-hidden border-magenta-400/30 flex flex-col">
            <div className="px-4 py-4 border-b border-magenta-400/20 bg-magenta-500/10">
              <h3 className="font-bold text-white text-sm">
                Tutorial Videos
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Acrylic Pour Techniques
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {[
                {
                  title: "Basics of Pouring",
                  creator: "Art Masters",
                  duration: "12:45",
                },
                {
                  title: "Color Blending Secrets",
                  creator: "Paint Flow",
                  duration: "8:30",
                },
                {
                  title: "Advanced Swipes",
                  creator: "Fluid Artist",
                  duration: "15:20",
                },
              ].map((video, idx) => (
                <button
                  key={idx}
                  className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-magenta-400/20 hover:border-magenta-400/40 transition-all"
                >
                  <div className="flex gap-2 mb-2">
                    <div className="w-12 h-12 rounded bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      ▶
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {video.title}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {video.creator}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">
                    {video.duration}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Room Selection View
  if (!currentRoom) {
    return (
      <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-purple-900/20 via-transparent to-black p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-2">
              My Spaces
            </h1>
            <p className="text-gray-400">
              Creative sanctuaries powered by RabbitAI
            </p>
          </div>

          {/* Space Card */}
          <div className="glass-panel rounded-2xl overflow-hidden border-cyan-400/30 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Creative Haven
                </h2>
                <p className="text-gray-400">
                  Your personal creative space with RabbitAI as your guide
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50">
                <RabbitAI size="md" />
                <span className="text-sm font-semibold text-cyan-300">
                  RabbitAI
                </span>
              </div>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ROOMS.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setCurrentRoom(room.id)}
                  className="group glass-panel rounded-xl p-4 border-magenta-400/20 hover:border-magenta-400/60 transition-all text-left hover:shadow-lg hover:shadow-magenta-400/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-lg bg-magenta-500/20 group-hover:bg-magenta-500/30 transition-all text-magenta-400">
                      {room.icon}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">
                    {room.name}
                  </h3>
                  <p className="text-xs text-gray-400">{room.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
