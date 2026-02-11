import { useState, ReactNode } from "react";
import { Menu, X, LogOut, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface CloudHopLayoutProps {
  children: ReactNode;
  activeTab: "hophub" | "music" | "gamehub" | "spaces";
  onTabChange: (tab: "hophub" | "music" | "gamehub" | "spaces") => void;
  hideSecondaryMenu?: boolean;
}

export default function CloudHopLayout({
  children,
  activeTab,
  onTabChange,
  hideSecondaryMenu = false,
}: CloudHopLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "hophub", label: "Hophub", icon: "💬" },
    { id: "music", label: "Music", icon: "🎵" },
    { id: "gamehub", label: "GameHub", icon: "🎮" },
    { id: "spaces", label: "Spaces", icon: "🌍" },
  ] as const;

  return (
    <div className="nebula-bg h-screen w-screen overflow-hidden flex flex-col relative">
      {/* Top Navigation */}
      <nav className="glass-panel flex items-center justify-between px-6 py-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              CH
            </div>
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              CloudHop
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 ml-8">
            {["Home", "Hophub", "HopMeetings", "Settings"].map((item) => (
              <button
                key={item}
                className={cn(
                  "px-4 py-2 rounded text-sm font-medium transition-all",
                  item === "Hophub"
                    ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search apps, files, people..."
              className="bg-transparent ml-2 text-sm text-white placeholder-gray-500 outline-none w-48"
            />
          </div>

          <button className="p-2 hover:bg-white/10 rounded-lg transition-all text-cyan-400">
            <Bell className="w-5 h-5" />
          </button>

          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold text-sm hover:opacity-90 transition-all active:scale-95">
            Logout
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-white/10 rounded-lg text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Secondary Menu */}
      {!hideSecondaryMenu && (
        <div className="glass-panel flex items-center gap-2 px-6 py-3 border-b border-white/10 overflow-x-auto relative z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                setMobileMenuOpen(false);
              }}
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2",
                activeTab === tab.id
                  ? "bg-cyan-500/30 border border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/20"
                  : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative z-10">{children}</div>
    </div>
  );
}
