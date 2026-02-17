import { useState } from "react";
import { cn } from "@/lib/utils";
import logoSplash from "@/assets/cloudhopq1.png";

interface WaitingParticipant {
  id: string;
  name: string;
  avatar: string;
}

interface WaitingRoomProps {
  isHost: boolean;
  waitingParticipants: WaitingParticipant[];
  onAdmit: (id: string) => void;
  onDeny: (id: string) => void;
  onAdmitAll: () => void;
}

export default function WaitingRoom({ isHost, waitingParticipants, onAdmit, onDeny, onAdmitAll }: WaitingRoomProps) {
  if (!isHost) {
    // Participant waiting view
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
        <img src={logoSplash} alt="CloudHop" className="w-24 h-24 object-contain" />
        <h2 className="text-2xl font-bold text-foreground">Waiting to be admitted</h2>
        <p className="text-muted-foreground text-center max-w-md">
          The host will let you in soon. Please wait...
        </p>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" />
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>
    );
  }

  // Host view
  return (
    <div className="glass-panel rounded-xl border-cyan-400/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-foreground text-sm">Waiting Room ({waitingParticipants.length})</h3>
        {waitingParticipants.length > 0 && (
          <button onClick={onAdmitAll} className="text-xs px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all">
            Admit All
          </button>
        )}
      </div>
      {waitingParticipants.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">No one waiting</p>
      ) : (
        <div className="space-y-2">
          {waitingParticipants.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center text-white font-bold text-xs">{p.avatar}</div>
              <span className="flex-1 text-sm text-foreground">{p.name}</span>
              <button onClick={() => onAdmit(p.id)} className="text-xs px-2 py-1 rounded bg-green-500/20 border border-green-400/50 text-green-300 hover:bg-green-500/30">Admit</button>
              <button onClick={() => onDeny(p.id)} className="text-xs px-2 py-1 rounded bg-red-500/20 border border-red-400/50 text-red-300 hover:bg-red-500/30">Deny</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
