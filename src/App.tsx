import React, { useState } from 'react';
import CloudHopLayout from './components/layout/CloudHopLayout';
import Chat from './modules/chat/Chat';
import Home from './components/Home/Home';
import HopMeetings from './components/HopMeetings/HopMeetings';
import Settings from './components/Settings/Settings';
import YouTubeMusicIntegration from './components/YouTubeMusicIntegration';
import GameHub from './components/GameHub/GameHub';
import SpacesWithChat from './components/HopHub/SpacesWithChat';
import { MusicEngineProvider } from './core/music/MusicEngineProvider';

type TabType = "hophub" | "music" | "gamehub" | "spaces";
type SectionType = "home" | "hophub" | "meetings" | "settings";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("hophub");
  const [activeSection, setActiveSection] = useState<SectionType>("home");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Update section based on tab
    if (tab === "hophub") {
      setActiveSection("hophub");
    } else if (tab === "music") {
      setActiveSection("home"); // Music integration shown in home context
    } else if (tab === "gamehub") {
      setActiveSection("home"); // GameHub shown in home context
    } else if (tab === "spaces") {
      setActiveSection("home"); // Spaces shown in home context
    }
  };

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
    // Switch to hophub tab if not already there
    if (activeTab !== "hophub") {
      setActiveTab("hophub");
    }
  };

  const renderContent = () => {
    // Handle main navigation sections (Home, HopHub, HopMeetings, Settings)
    // But also handle secondary tabs when they override the main content
    if (activeTab === "music") {
      return <YouTubeMusicIntegration />;
    } else if (activeTab === "gamehub") {
      return <GameHub />;
    } else if (activeTab === "spaces") {
      return <SpacesWithChat />;
    }
    
    // Default to section-based content
    switch (activeSection) {
      case "home":
        return <Home onNavigate={handleTabChange} onSectionChange={handleSectionChange} />;
      case "hophub":
        return <Chat />;
      case "meetings":
        return <HopMeetings />;
      case "settings":
        return <Settings />;
      default:
        return <Home onNavigate={handleTabChange} onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <MusicEngineProvider>
      <CloudHopLayout 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      >
        {renderContent()}
      </CloudHopLayout>
    </MusicEngineProvider>
  );
}

export default App;
