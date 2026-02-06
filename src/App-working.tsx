import React, { useState, useEffect } from 'react';
import { View } from './types';
import LayoutEnhanced from './components/Layout-enhanced';
import HopHubWrapper from './components/HopHub-layout';
import DashboardContent from './components/Dashboard-content';
import HopHubContent from './components/HopHub-content';
import SettingsContent from './components/Settings-content';
import MusicContent from './components/Music-content';
import TwitchContent from './components/Twitch-content';
import GameHubContent from './components/GameHub-content';
import AuthEnhanced from './components/Auth-enhanced';
import LandingPageSimple from './components/LandingPage-simple';
import { HopHubSimple } from './components/HopHub-simple';
import HopHubModule from './modules/hophub/HopHubModule';
import Meetings from './components/Meetings';

// Mock Supabase for now - we'll add real auth later
const mockSupabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
};

function App() {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [session] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    mockSupabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentView(View.DASHBOARD);
      } else {
        // Always set to DASHBOARD for non-authenticated users too
        setCurrentView(View.DASHBOARD);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = mockSupabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentView(View.DASHBOARD);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigate = (view: View) => {
    setCurrentView(view);
  };

  const handleLogout = async () => {
    setUser(null);
    setSession(null);
    setCurrentView(View.SPECTRUM);
  };

  const handleStart = () => {
    navigate(View.AUTH);
  };

  // Show LandingPage as full screen without Layout
  if (currentView === View.SPECTRUM) {
    return <LandingPageSimple onStart={handleStart} />;
  }

  // Show Auth as full screen without Layout
  if (currentView === View.AUTH) {
    return (
      <AuthEnhanced
        onAuthSuccess={() => {
          navigate(View.DASHBOARD);
        }}
      />
    );
  }

  const content = (() => {
    switch (currentView) {
      case View.DASHBOARD:
        return <DashboardContent onNavigate={navigate} />;
      case View.CHAT:
        return (
          <HopHubWrapper
            currentView={currentView}
            onNavigate={navigate}
            onLogout={() => {
              setUser(null);
              navigate(View.DASHBOARD);
            }}
          >
            <HopHubContent />
          </HopHubWrapper>
        );
      case View.MEETINGS:
        return <Meetings user={user} onNavigate={navigate} />;
      case View.SETTINGS:
        return <SettingsContent />;
      case View.ARCADE:
        return <GameHubContent />;
      case View.MUSIC:
        return <MusicContent />;
      case View.TWITCH:
        return <TwitchContent />;
      case View.PROFILE:
        return (
          <div style={{ padding: '20px', color: 'white' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Digital ID</h1>
            <p>Profile management is coming soon!</p>
          </div>
        );
      default:
        return <DashboardContent onNavigate={navigate} />;
    }
  })();

  // Show Layout only for authenticated views (except CHAT which uses HopHubWrapper)
  if (currentView === View.CHAT) {
    return (
      <HopHubWrapper currentView={currentView} onNavigate={navigate} onLogout={handleLogout}>
        <HopHubContent />
      </HopHubWrapper>
    );
  }

  // Show LayoutEnhanced for other views
  return (
    <LayoutEnhanced currentView={currentView} onNavigate={navigate} onLogout={handleLogout}>
      {content}
    </LayoutEnhanced>
  );
}

export default App;
