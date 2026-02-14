import React, { useState } from 'react';
import CloudHopLayout from './components/layout/CloudHopLayoutFixed';
import Chat from './modules/chat/Chat';
import Home from './components/Home/Home';
import HopMeetings from './components/HopMeetings/HopMeetings';
import Settings from './components/Settings/Settings';
import YouTubeMusicIntegration from './components/YouTubeMusicIntegration';
import GameHub from './components/GameHub/GameHub';
import SpacesWithChat from './components/HopHub/SpacesWithChat';
import UnifiedHub from './components/UnifiedHub/UnifiedHub';
import TwitchIntegration from './components/TwitchIntegration/TwitchIntegration';
import { MusicEngineProvider } from './core/music/MusicEngineProvider';
import HopHub from './modules/hophub/HopHub';
import { useAuth } from './kernel/auth/useAuth';
import { Login } from './components/Auth/Login';
import { GameHubEnhanced } from './components/GameHub/GameHubEnhanced';
import { SpacesEnhanced } from './components/Spaces/SpacesEnhanced';
import { UnifiedHubEnhanced } from './components/UnifiedHub/UnifiedHubEnhanced';

type TabType = "hophub" | "music" | "gamehub" | "spaces" | "unified";
type SectionType = "home" | "hophub" | "meetings" | "settings";

function App() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("hophub");
  const [activeSection, setActiveSection] = useState<SectionType>("home");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Update section based on tab
    if (tab === "hophub" || tab === "unified") {
      setActiveSection("hophub"); // These show in hophub section
    } else {
      setActiveSection("home"); // Everything else shown in home context
    }
  };

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
    // Switch to appropriate tab if not already there
    if (section === "hophub" && activeTab !== "hophub") {
      setActiveTab("hophub");
    }
  };

  const renderContent = () => {
    // Show login if not authenticated
    if (!isAuthenticated) {
      return <Login onLoginSuccess={() => {}} />;
    }

    // Handle main navigation sections - check section first
    if (activeSection === "home") {
      return <Home onNavigate={handleTabChange} onSectionChange={handleSectionChange} user={user} />;
    } else if (activeSection === "hophub") {
      return <HopHub user={user || { name: 'Guest' }} onNavigate={handleTabChange} onLogout={() => {}} />;
    } else if (activeSection === "meetings") {
      return <HopMeetings />;
    } else if (activeSection === "settings") {
      return <Settings />;
    } else if (activeTab === "music") {
      return <YouTubeMusicIntegration />;
    } else if (activeTab === "gamehub") {
      return <GameHubEnhanced />;
    } else if (activeTab === "spaces") {
      return <SpacesEnhanced />;
    } else if (activeTab === "unified") {
      return <UnifiedHubEnhanced />;
    } else {
      // Default to Home
      return <Home onNavigate={handleTabChange} onSectionChange={handleSectionChange} user={user} />;
    }
  };

  return (
    <MusicEngineProvider>
      <CloudHopLayout 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLogout={logout}
      >
        {renderContent()}
      </CloudHopLayout>
    </MusicEngineProvider>
  );
}

export default App;
