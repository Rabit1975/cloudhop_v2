import { useState, useEffect } from "react";
import { Mic, MicOff, Video, VideoOff, Phone, Share2, Settings, Users, MessageSquare, MoreVertical, Clock, Circle, MonitorUp, Grid3x3, Copy, Palette, PenTool, BarChart3, Layers, Hand, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactionsBar from "@/components/meetings/ReactionsBar";
import WaitingRoom from "@/components/meetings/WaitingRoom";
import BreakoutRooms from "@/components/meetings/BreakoutRooms";
import VirtualBackgrounds from "@/components/meetings/VirtualBackgrounds";
import Whiteboard from "@/components/meetings/Whiteboard";
import PollsQA from "@/components/meetings/PollsQA";
import MeetingSettings from "@/components/meetings/MeetingSettings";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  cameraOn: boolean;
  isScreenSharing: boolean;
  isHost: boolean;
  handRaised?: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

export default function HopMeetings() {
  const [meetingState, setMeetingState] = useState<"lobby" | "active" | "ended">("lobby");
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [meetingTime, setMeetingTime] = useState(0);
  const [showParticipants, setShowParticipants] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "speaker">("grid");
  const [chatInput, setChatInput] = useState("");
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showBreakoutRooms, setShowBreakoutRooms] = useState(false);
  const [showVirtualBg, setShowVirtualBg] = useState(false);
  const [selectedBg, setSelectedBg] = useState("none");
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showPolls, setShowPolls] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [waitingRoomEnabled, setWaitingRoomEnabled] = useState(true);
  const [meetingLocked, setMeetingLocked] = useState(false);
  const [waitingParticipants, setWaitingParticipants] = useState([
    { id: "w1", name: "Morgan Star", avatar: "MS" },
    { id: "w2", name: "Riley Park", avatar: "RP" },
  ]);
  const [copied, setCopied] = useState(false);
  const [joinId, setJoinId] = useState("");

  const [participants] = useState<Participant[]>([
    { id: "1", name: "You", avatar: "U", isMuted: false, cameraOn: true, isScreenSharing: false, isHost: true },
    { id: "2", name: "Alex Chen", avatar: "AC", isMuted: false, cameraOn: true, isScreenSharing: false, isHost: false },
    { id: "3", name: "Jordan Dev", avatar: "JD", isMuted: true, cameraOn: true, isScreenSharing: false, isHost: false },
    { id: "4", name: "Casey Moon", avatar: "CM", isMuted: false, cameraOn: false, isScreenSharing: false, isHost: false },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "Alex Chen", message: "Can everyone hear me clearly?", timestamp: new Date(Date.now() - 2 * 60000) },
    { id: "2", sender: "You", message: "Yes, perfect sound quality!", timestamp: new Date(Date.now() - 90000) },
  ]);

  const [meetingInfo] = useState({ meetingId: "829 4476 9876", meetingCode: "CloudHop Meeting", startTime: new Date() });

  useEffect(() => { if (meetingState === "active") { const interval = setInterval(() => setMeetingTime((prev) => prev + 1), 1000); return () => clearInterval(interval); } }, [meetingState]);
  useEffect(() => { if (isRecording) { const interval = setInterval(() => setRecordingTime((prev) => prev + 1), 1000); return () => clearInterval(interval); } }, [isRecording]);

  const formatTime = (seconds: number) => { const hours = Math.floor(seconds / 3600); const minutes = Math.floor((seconds % 3600) / 60); const secs = seconds % 60; return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}` : `${minutes}:${String(secs).padStart(2, "0")}`; };

  const handleSendChat = () => { if (!chatInput.trim()) return; setChatMessages([...chatMessages, { id: String(chatMessages.length + 1), sender: "You", message: chatInput, timestamp: new Date() }]); setChatInput(""); };
  const handleChatKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendChat(); } };

  // Lobby Screen
  if (meetingState === "lobby") {
    return (
      <div className="h-full w-full overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-transparent to-black p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 mb-2">HopMeetings</h1>
              <p className="text-muted-foreground text-lg">Crystal-clear video conferencing for teams</p>
            </div>
            <div className="glass-panel rounded-2xl border-cyan-400/30 p-8 mb-8">
              <div className="relative h-64 bg-gradient-to-br from-cyan-900/30 via-gray-900 to-magenta-900/30 rounded-xl overflow-hidden mb-8 flex items-center justify-center border border-cyan-400/20">
                {cameraOn ? (<div className="text-center"><div className="text-6xl mb-2">📹</div><p className="text-muted-foreground">Your camera is ready</p></div>) : (<div className="text-center"><div className="text-6xl mb-2">📵</div><p className="text-muted-foreground">Camera is off</p></div>)}
              </div>
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Audio & Video</p>
                  <div className="flex gap-3">
                    <button onClick={() => setIsMuted(!isMuted)} className={cn("flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2", isMuted ? "bg-red-500/20 border border-red-400 text-red-300" : "bg-cyan-500/20 border border-cyan-400 text-cyan-300")}>
                      {isMuted ? <><MicOff className="w-5 h-5" /> Mic Off</> : <><Mic className="w-5 h-5" /> Mic On</>}
                    </button>
                    <button onClick={() => setCameraOn(!cameraOn)} className={cn("flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2", cameraOn ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300" : "bg-red-500/20 border border-red-400 text-red-300")}>
                      {cameraOn ? <><Video className="w-5 h-5" /> Camera On</> : <><VideoOff className="w-5 h-5" /> Camera Off</>}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Meeting Details</p>
                  <div className="glass-panel rounded-lg border-magenta-400/30 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-xs text-muted-foreground mb-1">Meeting ID</p><p className="font-mono text-foreground text-sm">{meetingInfo.meetingId}</p></div>
                      <div><p className="text-xs text-muted-foreground mb-1">Access Code</p><p className="font-mono text-foreground text-sm">{meetingInfo.meetingCode}</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setMeetingState("active")} className="flex-1 px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/40">
                  <Phone className="w-6 h-6" /> Start Meeting
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">You can invite others by sharing the meeting ID</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ended Screen
  if (meetingState === "ended") {
    return (
      <div className="h-full w-full overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-transparent to-black p-6 flex items-center justify-center">
          <div className="glass-panel rounded-2xl border-cyan-400/30 p-12 max-w-md w-full text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Meeting Ended</h2>
            <p className="text-muted-foreground mb-6">Meeting duration: <span className="font-mono text-cyan-300">{formatTime(meetingTime)}</span></p>
            {isRecording && (<div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-400/30"><p className="text-sm text-red-300 font-semibold mb-2">🎥 Recording saved</p><p className="text-xs text-muted-foreground">Recording duration: {formatTime(recordingTime)}</p></div>)}
            <button onClick={() => { setMeetingState("lobby"); setMeetingTime(0); setRecordingTime(0); setIsRecording(false); }} className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold hover:opacity-90 transition-all">Start New Meeting</button>
          </div>
        </div>
      </div>
    );
  }

  // Active Meeting
  return (
    <div className="h-full w-full overflow-hidden flex flex-col bg-black">
      {/* Top Bar */}
      <div className="glass-panel flex items-center justify-between px-6 py-3 border-b border-cyan-400/20 relative z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-cyan-400" /><span className="font-mono text-foreground font-bold">{formatTime(meetingTime)}</span></div>
          {isRecording && (<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-400/50"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /><span className="text-xs font-bold text-red-400">REC {formatTime(recordingTime)}</span></div>)}
          <p className="text-sm text-muted-foreground">{participants.length} participants</p>
        </div>
        <h1 className="text-lg font-bold text-foreground">CloudHop Meeting</h1>
        <button onClick={() => setMeetingState("ended")} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all flex items-center gap-2"><Phone className="w-4 h-4" /> End Meeting</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex gap-4">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-cyan-400/20">
            <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded transition-all", viewMode === "grid" ? "bg-cyan-500/20 text-cyan-400" : "text-muted-foreground hover:text-foreground")}><Grid3x3 className="w-5 h-5" /></button>
            <button onClick={() => setViewMode("speaker")} className={cn("p-2 rounded transition-all", viewMode === "speaker" ? "bg-cyan-500/20 text-cyan-400" : "text-muted-foreground hover:text-foreground")}><Video className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-auto bg-gray-950 relative">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 auto-rows-fr">
                {participants.map((participant) => (
                  <div key={participant.id} className="relative group bg-gradient-to-br from-cyan-900/20 to-magenta-900/20 rounded-lg overflow-hidden border border-cyan-400/20 flex items-center justify-center">
                    {participant.cameraOn ? (<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-800/30 to-magenta-800/30"><div className="text-4xl opacity-40">📹</div></div>) : (<div className="w-full h-full flex flex-col items-center justify-center gap-2"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center text-white font-bold text-lg">{participant.avatar}</div></div>)}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-xs font-semibold">{participant.name}{participant.isHost && <span className="ml-1 text-yellow-400">👑</span>}</p>
                      <div className="flex items-center gap-1 mt-1">{participant.isMuted && <MicOff className="w-3 h-3 text-red-400" />}{!participant.cameraOn && <VideoOff className="w-3 h-3 text-red-400" />}{participant.isScreenSharing && <Share2 className="w-3 h-3 text-cyan-400" />}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="relative w-full max-w-3xl aspect-video bg-gradient-to-br from-cyan-900/20 to-magenta-900/20 rounded-lg border border-cyan-400/30 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl opacity-30">📹</div>
                  <div className="absolute bottom-4 left-4 glass-panel rounded-lg px-4 py-3 border-cyan-400/30"><p className="text-foreground font-bold">{participants[1].name} is presenting</p><p className="text-xs text-muted-foreground mt-1">Speaking • Screen shared</p></div>
                  <div className="absolute bottom-4 right-4 flex gap-2">{participants.slice(0, 3).map((p) => (<div key={p.id} className="w-24 h-16 rounded-lg bg-gradient-to-br from-cyan-600 to-magenta-600 border border-cyan-400/30 flex items-center justify-center text-white text-xs font-bold overflow-hidden">{p.cameraOn ? "📹" : p.avatar}</div>))}</div>
                </div>
              </div>
            )}
          </div>

          {/* Control Bar */}
          <div className="glass-panel border-t border-cyan-400/20 px-4 py-3 flex items-center justify-center gap-2 flex-wrap">
            <button onClick={() => setIsMuted(!isMuted)} className={cn("p-3 rounded-full transition-all", isMuted ? "bg-red-600/20 border border-red-400 text-red-400 hover:bg-red-600/30" : "bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30")}>{isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}</button>
            <button onClick={() => setCameraOn(!cameraOn)} className={cn("p-3 rounded-full transition-all", cameraOn ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30" : "bg-red-600/20 border border-red-400 text-red-400 hover:bg-red-600/30")}>{cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}</button>
            <button onClick={() => setIsScreenSharing(!isScreenSharing)} className={cn("p-3 rounded-full transition-all", isScreenSharing ? "bg-magenta-500/20 border border-magenta-400 text-magenta-300" : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10")}><MonitorUp className="w-5 h-5" /></button>
            <button onClick={() => setIsRecording(!isRecording)} className={cn("p-3 rounded-full transition-all", isRecording ? "bg-red-600/20 border border-red-400 text-red-400 animate-pulse" : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10")}><Circle className="w-5 h-5" /></button>
            <div className="w-px h-8 bg-white/10 mx-1" />
            <button onClick={() => setIsHandRaised(!isHandRaised)} className={cn("p-3 rounded-full transition-all", isHandRaised ? "bg-yellow-500/20 border border-yellow-400 text-yellow-300" : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10")} title="Raise Hand"><Hand className="w-5 h-5" /></button>
            <button onClick={() => setShowPolls(!showPolls)} className={cn("p-3 rounded-full transition-all", showPolls ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300" : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10")} title="Polls & Q&A"><BarChart3 className="w-5 h-5" /></button>
            <button onClick={() => setShowWhiteboard(!showWhiteboard)} className={cn("p-3 rounded-full transition-all", showWhiteboard ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300" : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10")} title="Whiteboard"><PenTool className="w-5 h-5" /></button>
            <button onClick={() => setShowBreakoutRooms(!showBreakoutRooms)} className={cn("p-3 rounded-full transition-all", showBreakoutRooms ? "bg-magenta-500/20 border border-magenta-400 text-magenta-300" : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10")} title="Breakout Rooms"><Layers className="w-5 h-5" /></button>
            <button onClick={() => setShowVirtualBg(!showVirtualBg)} className={cn("p-3 rounded-full transition-all", showVirtualBg ? "bg-magenta-500/20 border border-magenta-400 text-magenta-300" : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10")} title="Virtual Background"><Palette className="w-5 h-5" /></button>
            <div className="w-px h-8 bg-white/10 mx-1" />
            <button onClick={() => setShowChat(!showChat)} className={cn("p-3 rounded-full transition-all", showChat ? "bg-magenta-500/20 border border-magenta-400 text-magenta-300" : "bg-white/5 border border-white/10 text-muted-foreground")}><MessageSquare className="w-5 h-5" /></button>
            <button onClick={() => setShowParticipants(!showParticipants)} className={cn("p-3 rounded-full transition-all", showParticipants ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300" : "bg-white/5 border border-white/10 text-muted-foreground")}><Users className="w-5 h-5" /></button>
            <button onClick={() => setShowSettings(!showSettings)} className="p-3 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 transition-all" title="Settings"><Settings className="w-5 h-5" /></button>
            <button onClick={() => { navigator.clipboard.writeText(meetingInfo.meetingId); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-3 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 transition-all" title="Copy Invite Link"><Copy className="w-5 h-5" /></button>
            {copied && <span className="text-xs text-green-400 font-semibold">Copied!</span>}
          </div>
        </div>

        {/* Participants Sidebar */}
        {showParticipants && (
          <div className="w-72 glass-panel overflow-hidden border-l border-cyan-400/20 flex flex-col">
            <div className="px-4 py-3 border-b border-cyan-400/20 bg-cyan-500/10"><p className="font-bold text-foreground text-sm">Participants ({participants.length})</p></div>
            <div className="flex-1 overflow-y-auto space-y-1 p-2">
              {participants.map((participant) => (
                <div key={participant.id} className="px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{participant.avatar}</div>
                    <span className="text-foreground font-semibold text-sm flex-1">{participant.name}</span>
                    {participant.isHost && <span className="text-yellow-400 text-xs font-bold">HOST</span>}
                  </div>
                  <div className="flex items-center gap-1 ml-10 text-xs">{participant.isMuted ? (<span className="text-red-400 flex items-center gap-1"><MicOff className="w-3 h-3" /> Muted</span>) : (<span className="text-green-400 flex items-center gap-1"><Mic className="w-3 h-3" /> Unmuted</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-72 glass-panel overflow-hidden border-l border-magenta-400/20 flex flex-col">
            <div className="px-4 py-3 border-b border-magenta-400/20 bg-magenta-500/10"><p className="font-bold text-foreground text-sm">Meeting Chat</p></div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chatMessages.map((msg) => (<div key={msg.id} className="space-y-1"><p className="text-sm font-semibold text-cyan-300">{msg.sender}</p><p className="text-sm text-muted-foreground ml-2">{msg.message}</p></div>))}
            </div>
            <div className="border-t border-magenta-400/20 p-3 flex gap-2">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={handleChatKeyDown} placeholder="Send a message..." className="flex-1 rounded-lg px-3 py-2 bg-white/5 border border-magenta-400/30 text-foreground placeholder-muted-foreground outline-none text-sm focus:border-magenta-400/60 focus:bg-white/10 transition-all" />
              <button onClick={handleSendChat} disabled={!chatInput.trim()} className={cn("px-3 py-2 rounded-lg font-medium transition-all text-sm", chatInput.trim() ? "bg-gradient-to-r from-magenta-500 to-magenta-400 text-white hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50")}>Send</button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay Panels */}
      <ReactionsBar onHandRaise={() => setIsHandRaised(!isHandRaised)} isHandRaised={isHandRaised} />

      {showBreakoutRooms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <BreakoutRooms participants={participants.map((p) => ({ id: p.id, name: p.name }))} onClose={() => setShowBreakoutRooms(false)} />
          </div>
        </div>
      )}

      {showVirtualBg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md max-h-[80vh] overflow-y-auto">
            <VirtualBackgrounds selectedBg={selectedBg} onSelect={(bg) => { setSelectedBg(bg); setShowVirtualBg(false); }} onClose={() => setShowVirtualBg(false)} />
          </div>
        </div>
      )}

      {showWhiteboard && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-3 glass-panel border-b border-cyan-400/20">
            <h2 className="text-lg font-bold text-foreground">Collaborative Whiteboard</h2>
            <button onClick={() => setShowWhiteboard(false)} className="px-4 py-2 rounded-lg bg-red-600/20 border border-red-400 text-red-300 font-semibold text-sm hover:bg-red-600/30 transition-all">Close</button>
          </div>
          <div className="flex-1">
            <Whiteboard onClose={() => setShowWhiteboard(false)} />
          </div>
        </div>
      )}

      {showPolls && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <PollsQA onClose={() => setShowPolls(false)} />
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md max-h-[80vh] overflow-y-auto">
            <MeetingSettings
              waitingRoomEnabled={waitingRoomEnabled}
              onToggleWaitingRoom={() => setWaitingRoomEnabled(!waitingRoomEnabled)}
              meetingLocked={meetingLocked}
              onToggleLock={() => setMeetingLocked(!meetingLocked)}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}

      {waitingRoomEnabled && waitingParticipants.length > 0 && (
        <div className="fixed bottom-24 right-4 z-40">
          <WaitingRoom
            isHost={true}
            waitingParticipants={waitingParticipants}
            onAdmit={(id) => setWaitingParticipants(waitingParticipants.filter((p) => p.id !== id))}
            onDeny={(id) => setWaitingParticipants(waitingParticipants.filter((p) => p.id !== id))}
            onAdmitAll={() => setWaitingParticipants([])}
          />
        </div>
      )}
    </div>
  );
}
