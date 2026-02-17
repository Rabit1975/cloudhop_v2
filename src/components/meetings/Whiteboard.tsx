import { useState, useRef, useEffect } from "react";
import { Pencil, Square, Type, Eraser, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = ["#ffffff", "#ef4444", "#22d3ee", "#d946ef", "#eab308", "#22c55e", "#3b82f6"];

interface WhiteboardProps {
  onClose: () => void;
}

export default function Whiteboard({ onClose }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<"pen" | "rect" | "text" | "eraser">("pen");
  const [color, setColor] = useState("#ffffff");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    return rect ? { x: e.clientX - rect.left, y: e.clientY - rect.top } : { x: 0, y: 0 };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setLastPos(getPos(e));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);

    if (tool === "pen" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = tool === "eraser" ? "#111827" : color;
      ctx.lineWidth = tool === "eraser" ? 20 : 3;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    setLastPos(pos);
  };

  const endDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && tool === "rect" && lastPos) {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        const pos = getPos(e);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(lastPos.x, lastPos.y, pos.x - lastPos.x, pos.y - lastPos.y);
      }
    }
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
      <div className="glass-panel flex items-center justify-between px-6 py-3 border-b border-cyan-400/20">
        <h2 className="font-bold text-foreground">Whiteboard</h2>
        <div className="flex items-center gap-2">
          {/* Tools */}
          {([["pen", <Pencil className="w-4 h-4" />], ["rect", <Square className="w-4 h-4" />], ["text", <Type className="w-4 h-4" />], ["eraser", <Eraser className="w-4 h-4" />]] as [string, React.ReactNode][]).map(([t, icon]) => (
            <button key={t} onClick={() => setTool(t as any)} className={cn("p-2 rounded transition-all", tool === t ? "bg-cyan-500/20 text-cyan-400" : "text-muted-foreground hover:text-foreground")}>{icon}</button>
          ))}
          <div className="w-px h-6 bg-white/20 mx-1" />
          {/* Colors */}
          {COLORS.map((c) => (
            <button key={c} onClick={() => setColor(c)} className={cn("w-6 h-6 rounded-full border-2 transition-all", color === c ? "border-white scale-110" : "border-transparent")} style={{ backgroundColor: c }} />
          ))}
          <div className="w-px h-6 bg-white/20 mx-1" />
          <button onClick={clearCanvas} className="p-2 rounded text-muted-foreground hover:text-red-400 transition-all"><Trash2 className="w-4 h-4" /></button>
          <button onClick={onClose} className="p-2 rounded text-muted-foreground hover:text-foreground transition-all"><X className="w-4 h-4" /></button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="flex-1 cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />
    </div>
  );
}
