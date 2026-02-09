import { cn } from "../lib/utils";

interface RabbitAIProps {
  size?: "sm" | "md" | "lg" | "xl";
  isThinking?: boolean;
  className?: string;
}

export default function RabbitAI({
  size = "md",
  isThinking = false,
  className,
}: RabbitAIProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeMap[size],
        className
      )}
    >
      {/* Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-magenta-400 blur-xl opacity-60",
          isThinking ? "animate-pulse" : ""
        )}
      />

      {/* Avatar Image with Border */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F9a635ebefcaf44018ad40aa521cab19d%2F2accbe8620304a3989ae804c5c8de95c?format=webp"
        alt="RabbitAI"
        className="relative z-10 w-full h-full rounded-full object-cover border-2 border-cyan-400/60 shadow-lg shadow-cyan-400/40"
      />

      {/* Thinking Indicator - Dots */}
      {isThinking && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-100" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-200" />
        </div>
      )}
    </div>
  );
}
