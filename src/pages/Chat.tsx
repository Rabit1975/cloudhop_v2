import { useState } from "react";
import { Send, Plus, Hash, Lock, Users, ChevronRight, MessageCircle, UserPlus, UserCheck, X, Paperclip, Image as ImageIcon, FileText, Music as MusicIcon, Search, Gift, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import CloudHopLayout from "@/components/ui/CloudHopLayout";
import GameHub from "./GameHub";
import SpacesWithChat from "./SpacesWithChat";
import Music from "./Music";
import Twitch from "./Twitch";
import Home from "./Home";
import HopMeetings from "./HopMeetings";
import Settings from "./Settings";
import Profile from "./Profile";

interface User {
  id: string;
  username: string;
  avatar: string;
  status: "online" | "away" | "offline";
  bio: string;
  following: number;
  followers: number;
  isFriend?: boolean;
  friendRequestSent?: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  avatar: string;
  username: string;
  timestamp: Date;
  attachments?: Attachment[];
}

interface Attachment {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "audio";
  url: string;
  size: number;
}

interface DirectMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  status: "online" | "away" | "offline";
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
  const [activeTab, setActiveTab] = useState<"home" | "hophub" | "music" | "gamehub" | "spaces" | "twitch" | "hopmeetings" | "settings" | "profile">("home");
  const [inputValue, setInputValue] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([
    { id: "1", userId: "u1", username: "Alex Chen", avatar: "AC", lastMessage: "Sounds good! See you then 👋", timestamp: new Date(Date.now() - 5 * 60000), unread: 0, status: "online" },
    { id: "2", userId: "u2", username: "Jordan Dev", avatar: "JD", lastMessage: "Did you see the new design updates?", timestamp: new Date(Date.now() - 30 * 60000), unread: 2, status: "online" },
    { id: "3", userId: "u3", username: "Casey Moon", avatar: "CM", lastMessage: "Thanks for the help earlier!", timestamp: new Date(Date.now() - 2 * 3600000), unread: 0, status: "away" },
  ]);
  const [selectedDM, setSelectedDM] = useState<DirectMessage | null>(null);
  const [dmMessages, setDmMessages] = useState<Message[]>([
    { id: "1", content: "Hey! How's the project coming along?", sender: "assistant", username: "Alex Chen", avatar: "AC", timestamp: new Date(Date.now() - 10 * 60000) },
    { id: "2", content: "Pretty good! Just finished the Twitch integration", sender: "user", username: "You", avatar: "U", timestamp: new Date(Date.now() - 8 * 60000) },
  ]);
  const [friendRequests, setFriendRequests] = useState([
    { id: "1", username: "Morgan Star", avatar: "MS", bio: "Creative Designer" },
    { id: "2", username: "Riley Park", avatar: "RP", bio: "Full Stack Dev" },
  ]);
  const [dmInput, setDmInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [giftsReceived, setGiftsReceived] = useState<Record<string, number>>({ "u1": 3, "u2": 1, "u3": 2 });
  const [showGiftMenu, setShowGiftMenu] = useState(false);

  const [groups, setGroups] = useState<Group[]>([
    { id: "dev", name: "Development", expanded: true, channels: [
      { id: "general", name: "general", type: "public", unread: 0, members: 24 },
      { id: "frontend", name: "frontend", type: "public", unread: 3, members: 12 },
      { id: "backend", name: "backend", type: "public", unread: 0, members: 8 },
    ]},
    { id: "creative", name: "Creative Team", expanded: true, channels: [
      { id: "design", name: "design", type: "public", unread: 5, members: 6 },
      { id: "music-prod", name: "music-production", type: "private", unread: 0, members: 3 },
    ]},
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", content: "Hey everyone! Just pushed the new UI updates to the design system 🎨", sender: "assistant", username: "Sarah Chen", avatar: "SC", timestamp: new Date(Date.now() - 15 * 60000) },
    { id: "2", content: "Looking amazing! The neon accents really make the nebula background pop.", sender: "user", username: "You", avatar: "U", timestamp: new Date(Date.now() - 12 * 60000) },
    { id: "3", content: "Thanks! We're using semi-transparent glass panels with backdrop blur. It creates this immersive effect that really ties into CloudHop's aesthetic.", sender: "assistant", username: "Sarah Chen", avatar: "SC", timestamp: new Date(Date.now() - 8 * 60000) },
    { id: "4", content: "This is exactly what we needed. The whole layout feels premium now.", sender: "user", username: "You", avatar: "U", timestamp: new Date(Date.now() - 2 * 60000) },
  ]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = { id: String(messages.length + 1), content: inputValue, sender: "user", username: "You", avatar: "U", timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInputValue("");
    setTimeout(() => {
      const responses = ["That's awesome! Let me know if you need any adjustments.", "Totally agree! This is looking really polished.", "Great feedback, thanks for the input!"];
      setMessages((prev) => [...prev, { id: String(prev.length + 1), content: responses[Math.floor(Math.random() * responses.length)], sender: "assistant", username: "Sarah Chen", avatar: "SC", timestamp: new Date() }]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } };
  const handleAcceptFriendRequest = (requestId: string) => { setFriendRequests(friendRequests.filter((r) => r.id !== requestId)); };
  const handleDeclineFriendRequest = (requestId: string) => { setFriendRequests(friendRequests.filter((r) => r.id !== requestId)); };

  const handleSendDM = () => {
    if (!dmInput.trim() || !selectedDM) return;
    setDmMessages([...dmMessages, { id: String(dmMessages.length + 1), content: dmInput, sender: "user", username: "You", avatar: "U", timestamp: new Date() }]);
    setDmInput("");
    setTimeout(() => {
      const responses = ["That's awesome! 🎉", "Thanks for sharing!", "Totally agree with you!"];
      setDmMessages((prev) => [...prev, { id: String(prev.length + 1), content: responses[Math.floor(Math.random() * responses.length)], sender: "assistant", username: selectedDM.username, avatar: selectedDM.avatar, timestamp: new Date() }]);
    }, 500);
  };

  const handleDMKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendDM(); } };

  const handleAddAttachment = (type: "image" | "video" | "document" | "audio") => {
    setAttachments([...attachments, { id: String(attachments.length + 1), name: `file_${Date.now()}.${type === "image" ? "jpg" : type === "video" ? "mp4" : type === "audio" ? "mp3" : "pdf"}`, type, url: "#", size: Math.floor(Math.random() * 5000) + 100 }]);
  };
  const handleRemoveAttachment = (id: string) => { setAttachments(attachments.filter((a) => a.id !== id)); };

  const handleSendGift = (giftType: string) => {
    if (!selectedDM) return;
    setDmMessages([...dmMessages, { id: String(dmMessages.length + 1), content: `🎁 Sent a ${giftType}!`, sender: "user", username: "You", avatar: "U", timestamp: new Date() }]);
    setGiftsReceived((prev) => ({ ...prev, [selectedDM.userId]: (prev[selectedDM.userId] || 0) + 1 }));
    setShowGiftMenu(false);
  };

  const toggleGroup = (groupId: string) => { setGroups(groups.map((g) => g.id === groupId ? { ...g, expanded: !g.expanded } : g)); };

  const currentChannel = groups.flatMap((g) => g.channels).find((c) => c.id === selectedChannel) || groups[0].channels[0];

  if (activeTab === "home") return <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}><Home /></CloudHopLayout>;
  if (activeTab === "gamehub") return <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}><GameHub /></CloudHopLayout>;
  if (activeTab === "music") return <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}><Music /></CloudHopLayout>;
  if (activeTab === "spaces") return <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}><SpacesWithChat /></CloudHopLayout>;
  if (activeTab === "twitch") return <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}><Twitch /></CloudHopLayout>;
  if (activeTab === "hopmeetings") return <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}><HopMeetings /></CloudHopLayout>;
  if (activeTab === "settings") return <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}><Settings /></CloudHopLayout>;
  if (activeTab === "profile") return <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}><Profile /></CloudHopLayout>;

  // DM Conversation View
  if (selectedDM && activeTab === "hophub") {
    return (
      <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="flex h-full gap-4 p-4 overflow-hidden bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10">
          {/* DM Sidebar */}
          <div className="w-64 glass-panel rounded-xl overflow-hidden flex flex-col border-cyan-400/30">
            <div className="px-4 py-4 border-b border-cyan-400/20 flex items-center justify-between">
              <h2 className="font-bold text-foreground text-lg">Messages</h2>
              <button onClick={() => setSelectedDM(null)} className="p-1 hover:bg-white/10 rounded text-muted-foreground hover:text-foreground"><ChevronRight className="w-4 h-4 rotate-180" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 p-2">
              {directMessages.map((dm) => (
                <button key={dm.id} onClick={() => setSelectedDM(dm)} className={cn("w-full px-3 py-3 rounded-lg text-left transition-all flex items-start gap-3", selectedDM.id === dm.id ? "bg-cyan-500/20 border border-cyan-400/50" : "hover:bg-white/5")}>
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">{dm.avatar}</div>
                    <div className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background", dm.status === "online" ? "bg-green-500" : dm.status === "away" ? "bg-yellow-500" : "bg-gray-500")} />
                  </div>
                  <div className="flex-1 min-w-0"><p className="font-semibold text-foreground text-sm">{dm.username}</p><p className="text-xs text-muted-foreground truncate">{dm.lastMessage}</p></div>
                  {dm.unread > 0 && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full flex-shrink-0">{dm.unread}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* DM Conversation */}
          <div className="flex-1 glass-panel rounded-xl overflow-hidden flex flex-col border-cyan-400/30">
            <div className="px-6 py-4 border-b border-cyan-400/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">{selectedDM.avatar}</div>
                  <div className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background", selectedDM.status === "online" ? "bg-green-500" : selectedDM.status === "away" ? "bg-yellow-500" : "bg-gray-500")} />
                </div>
                <div><h2 className="text-lg font-bold text-foreground">{selectedDM.username}</h2><p className="text-xs text-muted-foreground">{selectedDM.status}</p></div>
              </div>
              <div className="flex items-center gap-2">
                {giftsReceived[selectedDM.userId] > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30"><Gift className="w-4 h-4 text-cyan-400" /><span className="text-xs font-semibold text-cyan-300">{giftsReceived[selectedDM.userId]}</span></div>
                )}
                <div className="relative">
                  <button onClick={() => setShowGiftMenu(!showGiftMenu)} className="p-2 hover:bg-cyan-400/10 rounded-lg transition-all text-muted-foreground hover:text-cyan-400"><Gift className="w-5 h-5" /></button>
                  {showGiftMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-card border border-cyan-400/50 rounded-lg p-2 flex flex-col gap-1 z-50">
                      <button onClick={() => handleSendGift("birthday gift")} className="px-3 py-1.5 text-sm text-left hover:bg-cyan-500/20 rounded transition-all">🎂 Birthday</button>
                      <button onClick={() => handleSendGift("heart")} className="px-3 py-1.5 text-sm text-left hover:bg-cyan-500/20 rounded transition-all">❤️ Love</button>
                      <button onClick={() => handleSendGift("star")} className="px-3 py-1.5 text-sm text-left hover:bg-cyan-500/20 rounded transition-all">⭐ Star</button>
                      <button onClick={() => handleSendGift("trophy")} className="px-3 py-1.5 text-sm text-left hover:bg-cyan-500/20 rounded transition-all">🏆 Trophy</button>
                    </div>
                  )}
                </div>
                <button onClick={() => { setSelectedUser(null); setShowUserProfile(true); }} className="p-2 hover:bg-cyan-400/10 rounded-lg transition-all text-muted-foreground hover:text-cyan-400"><Users className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {dmMessages.map((message) => (
                <div key={message.id} className={cn("flex gap-3", message.sender === "user" ? "flex-row-reverse" : "")}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">{message.avatar}</div>
                  <div className={cn("flex-1", message.sender === "user" ? "flex-row-reverse" : "")}>
                    <div className={cn("max-w-xs rounded-lg px-4 py-2.5 text-sm leading-relaxed", message.sender === "user" ? "bg-gradient-to-br from-cyan-500/80 to-cyan-600/80 text-white shadow-lg shadow-cyan-500/30 rounded-br-none" : "glass-panel border-magenta-400/30 text-foreground rounded-bl-none")}>{message.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="border-t border-cyan-400/20 p-3 bg-cyan-500/5">
                <div className="flex flex-wrap gap-2">
                  {attachments.map((att) => (
                    <div key={att.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-sm">
                      {att.type === "image" && <ImageIcon className="w-4 h-4 text-cyan-400" />}
                      {att.type === "video" && <Play className="w-4 h-4 text-cyan-400" />}
                      {att.type === "document" && <FileText className="w-4 h-4 text-cyan-400" />}
                      {att.type === "audio" && <MusicIcon className="w-4 h-4 text-cyan-400" />}
                      <span className="text-xs text-cyan-300 truncate max-w-32">{att.name}</span>
                      <button onClick={() => handleRemoveAttachment(att.id)} className="ml-auto p-0.5 hover:bg-white/10 rounded text-muted-foreground hover:text-foreground"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DM Input */}
            <div className="border-t border-cyan-400/20 p-4 flex gap-2">
              <div className="group relative">
                <button className="p-2 hover:bg-cyan-400/10 rounded-lg transition-all text-muted-foreground hover:text-cyan-400"><Paperclip className="w-5 h-5" /></button>
                <div className="absolute bottom-full mb-2 left-0 bg-card border border-cyan-400/50 rounded-lg p-2 hidden group-hover:flex flex-col gap-1 z-50 whitespace-nowrap">
                  <button onClick={() => handleAddAttachment("image")} className="px-3 py-1.5 text-sm text-left hover:bg-cyan-500/20 rounded transition-all flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Image</button>
                  <button onClick={() => handleAddAttachment("video")} className="px-3 py-1.5 text-sm text-left hover:bg-cyan-500/20 rounded transition-all flex items-center gap-2"><Play className="w-4 h-4" /> Video</button>
                  <button onClick={() => handleAddAttachment("document")} className="px-3 py-1.5 text-sm text-left hover:bg-cyan-500/20 rounded transition-all flex items-center gap-2"><FileText className="w-4 h-4" /> Document</button>
                  <button onClick={() => handleAddAttachment("audio")} className="px-3 py-1.5 text-sm text-left hover:bg-cyan-500/20 rounded transition-all flex items-center gap-2"><MusicIcon className="w-4 h-4" /> Audio</button>
                </div>
              </div>
              <input type="text" value={dmInput} onChange={(e) => setDmInput(e.target.value)} onKeyDown={handleDMKeyDown} placeholder="Type a message..." className={cn("flex-1 rounded-lg px-4 py-2 bg-white/5 border border-cyan-400/30 text-foreground placeholder-muted-foreground outline-none", "focus:border-cyan-400/60 focus:bg-white/10 transition-all")} />
              <button onClick={handleSendDM} disabled={!dmInput.trim() && attachments.length === 0} className={cn("px-4 py-2 rounded-lg font-medium transition-all", (dmInput.trim() || attachments.length > 0) ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50")}><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </CloudHopLayout>
    );
  }

  // Default HopHub chat
  return (
    <CloudHopLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="flex h-full gap-4 p-4 overflow-hidden bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10">
        {/* Sidebar */}
        <div className={cn("glass-panel rounded-xl overflow-hidden flex flex-col transition-all duration-300", sidebarOpen ? "w-64" : "w-0")}>
          <div className="px-4 py-4 border-b border-cyan-400/20 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-foreground text-lg">Channels</h2>
              <button className="p-1.5 hover:bg-cyan-400/10 rounded-lg transition-all text-cyan-400 hover:text-cyan-300"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search channels..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-3 py-2 bg-white/5 border border-cyan-400/30 rounded-lg text-sm text-foreground placeholder-muted-foreground outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-all" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {groups.map((group) => (
              <div key={group.id}>
                <button onClick={() => toggleGroup(group.id)} className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all flex items-center justify-between group">
                  <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground">{group.name}</span>
                  <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform", group.expanded ? "rotate-90" : "")} />
                </button>
                {group.expanded && (
                  <div className="space-y-1 px-2">
                    {group.channels.map((channel) => (
                      <button key={channel.id} onClick={() => setSelectedChannel(channel.id)} className={cn("w-full px-3 py-2 rounded-lg text-left transition-all flex items-center gap-2 text-sm group", selectedChannel === channel.id ? "bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 border border-cyan-400/50 text-cyan-300" : "text-muted-foreground hover:text-foreground hover:bg-white/5")}>
                        {channel.type === "public" ? <Hash className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        <span className="flex-1">{channel.name}</span>
                        {channel.unread > 0 && <span className="text-xs bg-cyan-500/50 px-2 py-1 rounded-full text-cyan-200">{channel.unread}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat */}
        <div className="glass-panel rounded-xl overflow-hidden flex flex-col flex-1">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-400/20">
            <div>
              <div className="flex items-center gap-2"><Hash className="w-5 h-5 text-cyan-400" /><h2 className="text-xl font-bold text-foreground">{currentChannel.name}</h2></div>
              <p className="text-xs text-muted-foreground mt-1">{currentChannel.members} members</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-cyan-400/10 rounded-lg transition-all text-muted-foreground hover:text-cyan-400"><Users className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex gap-3", message.sender === "user" ? "flex-row-reverse" : "")}>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0", message.sender === "user" ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white" : "bg-gradient-to-br from-magenta-500 to-purple-600 text-white")}>{message.avatar}</div>
                <div className={cn("flex-1", message.sender === "user" ? "flex-row-reverse" : "")}>
                  <div className={cn("flex items-baseline gap-2 mb-1", message.sender === "user" ? "flex-row-reverse justify-end" : "")}>
                    <span className="text-sm font-semibold text-foreground">{message.username}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <div className={cn("max-w-xs rounded-lg px-4 py-2.5 text-sm leading-relaxed", message.sender === "user" ? "bg-gradient-to-br from-cyan-500/80 to-cyan-600/80 text-white shadow-lg shadow-cyan-500/30 rounded-br-none" : "glass-panel border-magenta-400/30 text-foreground rounded-bl-none")}>{message.content}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-cyan-400/20 p-6 flex gap-3">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message #general..." className={cn("flex-1 rounded-lg px-4 py-3 bg-white/5 border border-cyan-400/30 text-foreground placeholder-muted-foreground outline-none", "focus:border-cyan-400/60 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-400/20 transition-all")} />
            <button onClick={handleSendMessage} disabled={!inputValue.trim()} className={cn("px-4 py-3 rounded-lg font-medium transition-all active:scale-95 flex items-center gap-2", inputValue.trim() ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:opacity-90 shadow-lg shadow-cyan-500/30" : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50")}><Send className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 glass-panel rounded-xl overflow-hidden flex flex-col border-magenta-400/30">
          <div className="flex border-b border-magenta-400/20">
            <button className="flex-1 px-4 py-3 font-semibold text-sm border-b-2 border-magenta-400 text-magenta-300 bg-magenta-500/10"><MessageCircle className="w-4 h-4 inline mr-2" />Messages</button>
            <button className="flex-1 px-4 py-3 font-semibold text-sm border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-all"><UserPlus className="w-4 h-4 inline mr-2" />Requests</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {directMessages.length > 0 ? (
              <div className="space-y-2 p-3">
                {directMessages.slice(0, 5).map((dm) => (
                  <button key={dm.id} onClick={() => setSelectedDM(dm)} className="w-full px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-left border border-transparent hover:border-magenta-400/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="relative flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-magenta-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">{dm.avatar}</div>
                        <div className={cn("absolute bottom-0 right-0 w-2 h-2 rounded-full border border-background", dm.status === "online" ? "bg-green-500" : dm.status === "away" ? "bg-yellow-500" : "bg-gray-500")} />
                      </div>
                      <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-foreground truncate">{dm.username}</p></div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate ml-10">{dm.lastMessage}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center"><MessageCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-30" /><p className="text-xs text-muted-foreground">No messages yet</p></div>
            )}
          </div>
        </div>
      </div>
    </CloudHopLayout>
  );
}
