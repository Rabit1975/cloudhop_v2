import { cn } from "@/lib/utils";
import logoRabbit from "@/assets/3dsplashlogo.svg";

interface RabbitAIProps {
  size?: "sm" | "md" | "lg";
  isThinking?: boolean;
}

export default function RabbitAI({ size = "md", isThinking = false }: RabbitAIProps) {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("relative rounded-full overflow-hidden flex-shrink-0", sizeClasses[size])}>
      <img src={logoRabbit} alt="RabbitAI" className="w-full h-full object-cover" />
      {isThinking && (
        <div className="absolute inset-0 bg-cyan-400/20 animate-pulse rounded-full" />
      )}
    </div>
  );
}
