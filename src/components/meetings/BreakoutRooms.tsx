import { useState } from 'react';
import { Plus, X, Clock, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreakoutRoom {
  id: string;
  name: string;
  participants: string[];
}

interface BreakoutRoomsProps {
  participants: { id: string; name: string }[];
  onClose: () => void;
}

export default function BreakoutRooms({
  participants,
  onClose,
}: BreakoutRoomsProps) {
  const [rooms, setRooms] = useState<BreakoutRoom[]>([
    { id: '1', name: 'Room 1', participants: [] },
    { id: '2', name: 'Room 2', participants: [] },
  ]);
  const [timer, setTimer] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const addRoom = () => {
    setRooms([
      ...rooms,
      {
        id: String(rooms.length + 1),
        name: `Room ${rooms.length + 1}`,
        participants: [],
      },
    ]);
  };

  const assignParticipant = (participantId: string, roomId: string) => {
    setRooms(
      rooms.map((r) => ({
        ...r,
        participants:
          r.id === roomId
            ? [...r.participants, participantId]
            : r.participants.filter((p) => p !== participantId),
      }))
    );
  };

  const unassignedParticipants = participants.filter(
    (p) => !rooms.some((r) => r.participants.includes(p.id))
  );

  return (
    <div className="glass-panel rounded-xl border-cyan-400/30 p-4 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground text-sm">Breakout Rooms</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-4 h-4 text-cyan-400" />
        <span className="text-xs text-muted-foreground">Timer:</span>
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          className="w-16 px-2 py-1 text-xs bg-white/5 border border-cyan-400/30 rounded text-foreground outline-none"
          min={1}
        />
        <span className="text-xs text-muted-foreground">min</span>
      </div>

      {/* Unassigned */}
      {unassignedParticipants.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">
            Unassigned ({unassignedParticipants.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {unassignedParticipants.map((p) => (
              <span
                key={p.id}
                className="text-xs px-2 py-1 rounded bg-white/10 text-foreground"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Rooms */}
      <div className="space-y-3 mb-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="p-3 rounded-lg bg-white/5 border border-cyan-400/20"
          >
            <p className="text-xs font-semibold text-cyan-300 mb-2">
              {room.name}
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              {room.participants.map((pid) => {
                const p = participants.find((x) => x.id === pid);
                return p ? (
                  <span
                    key={pid}
                    className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 flex items-center gap-1"
                  >
                    {p.name}
                    <button
                      onClick={() =>
                        setRooms(
                          rooms.map((r) =>
                            r.id === room.id
                              ? {
                                  ...r,
                                  participants: r.participants.filter(
                                    (x) => x !== pid
                                  ),
                                }
                              : r
                          )
                        )
                      }
                      className="hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ) : null;
              })}
            </div>
            {unassignedParticipants.length > 0 && (
              <select
                onChange={(e) => {
                  if (e.target.value)
                    assignParticipant(e.target.value, room.id);
                  e.target.value = '';
                }}
                className="w-full text-xs px-2 py-1 bg-white/5 border border-cyan-400/30 rounded text-foreground outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Add participant...
                </option>
                {unassignedParticipants.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addRoom}
        className="w-full text-xs px-3 py-2 rounded bg-white/5 border border-dashed border-cyan-400/30 text-cyan-300 hover:bg-white/10 transition-all flex items-center justify-center gap-1 mb-3"
      >
        <Plus className="w-3 h-3" /> Add Room
      </button>

      {/* Broadcast */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={broadcastMessage}
          onChange={(e) => setBroadcastMessage(e.target.value)}
          placeholder="Broadcast message..."
          className="flex-1 text-xs px-2 py-1 bg-white/5 border border-cyan-400/30 rounded text-foreground placeholder-muted-foreground outline-none"
        />
        <button className="text-xs px-2 py-1 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
          <MessageSquare className="w-3 h-3" />
        </button>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className={cn(
          'w-full px-4 py-2 rounded-lg font-bold text-sm transition-all',
          isActive
            ? 'bg-red-500/20 border border-red-400 text-red-300'
            : 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black'
        )}
      >
        {isActive ? 'Close Breakout Rooms' : 'Open Breakout Rooms'}
      </button>
    </div>
  );
}
