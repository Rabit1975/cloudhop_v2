import { useState } from "react";
import { cn } from "@/lib/utils";

const BACKGROUNDS = [
  { id: "none", name: "None", preview: "🚫", gradient: "" },
  { id: "blur", name: "Blur", preview: "🔵", gradient: "blur(20px)" },
  { id: "cosmic", name: "Cosmic", preview: "🌌", gradient: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" },
  { id: "aurora", name: "Aurora", preview: "🌈", gradient: "linear-gradient(135deg, #00d2ff, #3a7bd5, #ff6bcd)" },
  { id: "cloudhop", name: "CloudHop", preview: "☁️", gradient: "linear-gradient(135deg, #0ea5e9, #d946ef, #0ea5e9)" },
  { id: "sunset", name: "Sunset", preview: "🌅", gradient: "linear-gradient(135deg, #fa709a, #fee140)" },
  { id: "forest", name: "Forest", preview: "🌲", gradient: "linear-gradient(135deg, #134e5e, #71b280)" },
  { id: "ocean", name: "Ocean", preview: "🌊", gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)" },
];

interface VirtualBackgroundsProps {
  selectedBg: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function VirtualBackgrounds({ selectedBg, onSelect, onClose }: VirtualBackgroundsProps) {
  return (
    <div className="glass-panel rounded-xl border-cyan-400/30 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground text-sm">Virtual Backgrounds</h3>
        <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">✕</button>
      </div>

      {/* Preview */}
      <div
        className="h-32 rounded-lg mb-4 flex items-center justify-center border border-cyan-400/20 overflow-hidden"
        style={{
          background: BACKGROUNDS.find((b) => b.id === selectedBg)?.gradient || "transparent",
        }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center text-white font-bold text-xl">U</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
              selectedBg === bg.id
                ? "bg-cyan-500/20 border border-cyan-400/50"
                : "bg-white/5 border border-transparent hover:border-cyan-400/30"
            )}
          >
            <span className="text-xl">{bg.preview}</span>
            <span className="text-[10px] text-muted-foreground">{bg.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
