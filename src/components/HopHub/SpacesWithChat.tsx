import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "../../lib/utils";
import Spaces from "./Spaces";
import RabbitAI from "../RabbitAI/RabbitAI";

interface Message {
  id: string;
  sender: "user" | "rabbit";
  content: string;
  timestamp: Date;
  isThinking?: boolean;
}

export default function SpacesWithChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "rabbit",
      content:
        "Welcome to CloudHop Spaces! 🚀 I'm RabbitAI, here to help with your creative journey. What would you like to explore today?",
      timestamp: new Date(Date.now() - 10 * 60000),
    },
    {
      id: "2",
      sender: "user",
      content:
        "I want to try fluid art painting, never done it before though",
      timestamp: new Date(Date.now() - 8 * 60000),
    },
    {
      id: "3",
      sender: "rabbit",
      content:
        "Perfect! Acrylic pouring is a fantastic way to create beautiful, unique art. The great thing is you don't need to be an expert - gravity and chemistry do most of the work! Let me guide you through the basics. First, you'll want to gather your materials...",
      timestamp: new Date(Date.now() - 7 * 60000),
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

    // Simulate RabbitAI thinking
    setIsRabbitThinking(true);
    setTimeout(() => {
      const thinkingMessage: Message = {
        id: String(messages.length + 2),
        sender: "rabbit",
        content: "",
        timestamp: new Date(),
        isThinking: true,
      };
      setMessages((prev) => [...prev, thinkingMessage]);

      // Then respond after a bit
      setTimeout(() => {
        const responses = [
          "That's a great question! In fluid art, the ratio of paint to pouring medium is crucial - typically 1:1 or 1:2 depending on the effect you want.",
          "Absolutely! Color theory plays a huge role. Colors that are opposite on the color wheel create stunning contrast. Cool and warm tones really make the composition pop.",
          "You're thinking like an artist already! The technique is all about understanding how different densities and viscosities interact with each other.",
          "I love your curiosity! Let me show you some techniques that will really elevate your first piece. The swipe technique is a personal favorite of mine.",
          "Wonderful observation! That's exactly what makes fluid art so unpredictable and beautiful - every pour is unique and surprising.",
        ];

        const response: Message = {
          id: String(messages.length + 3),
          sender: "rabbit",
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };

        setMessages((prev) => [
          ...prev.filter((m) => !m.isThinking),
          response,
        ]);
        setIsRabbitThinking(false);
      }, 800);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full overflow-hidden gap-4 p-4 bg-gradient-to-br from-purple-900/20 via-transparent to-black">
      {/* Main Spaces Area */}
      <div className="flex-1 overflow-hidden">
        <Spaces />
      </div>

      {/* RabbitAI Chat Sidebar */}
      <div className="w-96 glass-panel rounded-xl overflow-hidden border-cyan-400/30 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-cyan-400/20 bg-cyan-500/10 flex items-center gap-3">
          <RabbitAI size="md" isThinking={isRabbitThinking} />
          <div>
            <h3 className="font-bold text-white text-sm">RabbitAI</h3>
            <p className="text-xs text-gray-400">Creative Guide</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message) => {
            if (message.isThinking) {
              return (
                <div key={message.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <RabbitAI size="sm" isThinking={true} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">RabbitAI</div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.sender === "user" ? "flex-row-reverse" : ""
                )}
              >
                {message.sender === "rabbit" ? (
                  <div className="flex-shrink-0 mt-1">
                    <RabbitAI size="sm" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                    U
                  </div>
                )}

                <div className={cn("flex-1", message.sender === "user" ? "flex-row-reverse" : "")}>
                  <div className="text-xs text-gray-500 mb-1 px-2">
                    {message.sender === "rabbit" ? "RabbitAI" : "You"}
                  </div>
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm leading-relaxed",
                      message.sender === "rabbit"
                        ? "glass-panel border-cyan-400/30 text-gray-100"
                        : "bg-gradient-to-r from-cyan-500/80 to-cyan-600/80 text-white rounded-br-none"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="border-t border-cyan-400/20 p-4 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask RabbitAI..."
            className={cn(
              "flex-1 rounded-lg px-3 py-2 bg-white/5 border border-cyan-400/30 text-white placeholder-gray-500 outline-none",
              "focus:border-cyan-400/60 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-400/20 transition-all text-sm"
            )}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={cn(
              "px-3 py-2 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center",
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
  );
}
