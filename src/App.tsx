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
    // Reset section to default when switching tabs
    if (tab === "hophub") {
      setActiveSection("home");
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
    switch (activeSection) {
      case "home":
        return <Home />;
      case "hophub":
        return <Chat />;
      case "meetings":
        return <HopMeetings />;
      case "settings":
        return <Settings />;
      default:
        return <Home />;
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
