import { useState } from "react";
import { Send, Plus, Hash, Lock, Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CloudHopLayout from "@/components/CloudHopLayout";
import GameHub from "./GameHub";
import SpacesWithChat from "./SpacesWithChat";
import Music from "./Music";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  avatar: string;
  username: string;
  timestamp: Date;
}

interface Channel {
  id: string;
  name: string;
  type: "public" | "private";
  unread: number;
  members?: number;
}

interface Group {
  id: string;
  name: string;
  channels: Channel[];
  expanded: boolean;
}

export default function Chat() {
  const [activeTab, setActiveTab] = useState<"hophub" | "music" | "gamehub" | "spaces">(
    "hophub"
  );
  const [inputValue, setInputValue] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: "dev",
      name: "Development",
      expanded: true,
      channels: [
        {
          id: "general",
          name: "general",
          type: "public",
          unread: 0,
          members: 24,
        },
        {
          id: "frontend",
          name: "frontend",
          type: "public",
          unread: 3,
          members: 12,
        },
        {
          id: "backend",
          name: "backend",
          type: "public",
          unread: 0,
          members: 8,
        },
      ],
    },
    {
      id: "creative",
      name: "Creative Team",
      expanded: true,
      channels: [
        {
          id: "design",
          name: "design",
          type: "public",
          unread: 5,
          members: 6,
        },
        {
          id: "music-prod",
          name: "music-production",
          type: "private",
          unread: 0,
          members: 3,
        },
      ],
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey everyone! Just pushed the new UI updates to the design system 🎨",
      sender: "assistant",
      username: "Sarah Chen",
      avatar: "SC",
      timestamp: new Date(Date.now() - 15 * 60000),
    },
    {
      id: "2",
      content:
        "Looking amazing! The neon accents really make the nebula background pop.",
      sender: "user",
      username: "You",
      avatar: "U",
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: "3",
      content:
        "Thanks! We're using semi-transparent glass panels with backdrop blur. It creates this immersive effect that really ties into CloudHop's aesthetic.",
      sender: "assistant",
      username: "Sarah Chen",
      avatar: "SC",
      timestamp: new Date(Date.now() - 8 * 60000),
    },
    {
      id: "4",
      content: "This is exactly what we needed. The whole layout feels premium now.",
      sender: "user",
      username: "You",
      avatar: "U",
      timestamp: new Date(Date.now() - 2 * 60000),
    },
  ]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      content: inputValue,
      sender: "user",
      username: "You",
      avatar: "U",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const responses = [
        "That's awesome! Let me know if you need any adjustments.",
        "Totally agree! This is looking really polished.",
        "Great feedback, thanks for the input!",
      ];

      const assistantMessage: Message = {
        id: String(messages.length + 2),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        username: "Sarah Chen",
        avatar: "SC",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleGroup = (groupId: string) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId ? { ...g, expanded: !g.expanded } : g
      )
    );
  };

  const currentChannel =
    groups
      .flatMap((g) => g.channels)
      .find((c) => c.id === selectedChannel) || groups[0].channels[0];

  // Show GameHub when GameHub tab is active
  if (activeTab === "gamehub") {
    return (
      <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <GameHub />
      </CloudHopLayout>
    );
  }

  // Show Music player
  if (activeTab === "music") {
    return (
      <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <Music />
      </CloudHopLayout>
    );
  }

  // Show Spaces with RabbitAI chat
  if (activeTab === "spaces") {
    return (
      <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <SpacesWithChat />
      </CloudHopLayout>
    );
  }

  // Default to Hophub chat
  return (
    <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="flex h-full gap-4 p-4 overflow-hidden bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10">
        {/* Sidebar */}
        <div
          className={cn(
            "glass-panel rounded-xl overflow-hidden flex flex-col transition-all duration-300",
            sidebarOpen ? "w-64" : "w-0"
          )}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-cyan-400/20">
            <h2 className="font-bold text-white text-lg">Channels</h2>
            <button className="p-1.5 hover:bg-cyan-400/10 rounded-lg transition-all text-cyan-400 hover:text-cyan-300">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Groups List */}
          <div className="flex-1 overflow-y-auto">
            {groups.map((group) => (
              <div key={group.id}>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all flex items-center justify-between group"
                >
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white">
                    {group.name}
                  </span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-gray-500 transition-transform",
                      group.expanded ? "rotate-90" : ""
                    )}
                  />
                </button>

                {group.expanded && (
                  <div className="space-y-1 px-2">
                    {group.channels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={cn(
                          "w-full px-3 py-2 rounded-lg text-left transition-all flex items-center gap-2 text-sm group",
                          selectedChannel === channel.id
                            ? "bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 border border-cyan-400/50 text-cyan-300"
                            : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                        )}
                      >
                        {channel.type === "public" ? (
                          <Hash className="w-3 h-3" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                        <span className="flex-1">{channel.name}</span>
                        {channel.unread > 0 && (
                          <span className="text-xs bg-cyan-500/50 px-2 py-1 rounded-full text-cyan-200">
                            {channel.unread}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="glass-panel rounded-xl overflow-hidden flex flex-col flex-1">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-400/20">
            <div>
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">
                  {currentChannel.name}
                </h2>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {currentChannel.members} members
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-cyan-400/10 rounded-lg transition-all text-gray-400 hover:text-cyan-400">
                <Users className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-cyan-400/10 rounded-lg transition-all text-gray-400 hover:text-cyan-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-in fade-in slide-in-from-bottom-2",
                  message.sender === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                    message.sender === "user"
                      ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white"
                      : "bg-gradient-to-br from-magenta-500 to-purple-600 text-white"
                  )}
                >
                  {message.avatar}
                </div>

                <div className={cn("flex-1", message.sender === "user" ? "flex-row-reverse" : "")}>
                  <div className={cn("flex items-baseline gap-2 mb-1", message.sender === "user" ? "flex-row-reverse justify-end" : "")}>
                    <span className="text-sm font-semibold text-white">
                      {message.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "max-w-xs rounded-lg px-4 py-2.5 text-sm leading-relaxed",
                      message.sender === "user"
                        ? "bg-gradient-to-br from-cyan-500/80 to-cyan-600/80 text-white shadow-lg shadow-cyan-500/30 rounded-br-none"
                        : "glass-panel border-magenta-400/30 text-gray-100 rounded-bl-none"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-cyan-400/20 p-6 flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message #general..."
              className={cn(
                "flex-1 rounded-lg px-4 py-3 bg-white/5 border border-cyan-400/30 text-white placeholder-gray-500 outline-none",
                "focus:border-cyan-400/60 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-400/20 transition-all"
              )}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={cn(
                "px-4 py-3 rounded-lg font-medium transition-all active:scale-95 flex items-center gap-2",
                inputValue.trim()
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:opacity-90 shadow-lg shadow-cyan-500/30"
                  : "bg-gray-600/30 text-gray-500 cursor-not-allowed opacity-50"
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </CloudHopLayout>
  );
}
