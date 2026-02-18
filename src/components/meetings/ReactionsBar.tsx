import { useState } from 'react';
import { X, Hand, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Reaction {
  id: string;
  emoji: string;
  x: number;
  timestamp: number;
}

interface ReactionsBarProps {
  onHandRaise: () => void;
  isHandRaised: boolean;
}

const EMOJIS = ['👏', '🎉', '❤️', '😂', '👍', '🔥'];

export default function ReactionsBar({
  onHandRaise,
  isHandRaised,
}: ReactionsBarProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const handleReaction = (emoji: string) => {
    const newReaction: Reaction = {
      id: String(Date.now()),
      emoji,
      x: 20 + Math.random() * 60,
      timestamp: Date.now(),
    };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2000);
  };

  return (
    <>
      {/* Floating reactions */}
      <div className="fixed bottom-32 left-0 right-0 pointer-events-none z-50">
        {reactions.map((r) => (
          <div
            key={r.id}
            className="absolute text-4xl animate-bounce"
            style={{
              left: `${r.x}%`,
              animation: 'floatUp 2s ease-out forwards',
            }}
          >
            {r.emoji}
          </div>
        ))}
      </div>

      {/* Reactions bar */}
      <div className="flex items-center gap-1">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all text-xl hover:scale-125 active:scale-95"
          >
            {emoji}
          </button>
        ))}
        <div className="w-px h-6 bg-white/20 mx-1" />
        <button
          onClick={onHandRaise}
          className={cn(
            'p-2 rounded-full transition-all flex items-center gap-1 text-sm font-medium',
            isHandRaised
              ? 'bg-yellow-500/30 border border-yellow-400 text-yellow-300'
              : 'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10'
          )}
        >
          ✋
        </button>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-200px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}
