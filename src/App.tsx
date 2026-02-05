import React, { useState, useEffect } from 'react';
import { View } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { HopHub } from './components/HopHub/HopHub';
import Meetings from './components/Meetings';
import GameHub from './components/GameHub';
import CloudHopMusicPlayer from './components/CloudHopMusicPlayer';
import GameService from './components/GameService';
import Twitch from './components/Twitch';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import { createClient } from '@supabase/supabase-js';
import { Database } from './core/supabase/types';

// Initialize Supabase
const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

function App() {
  const [currentView, setCurrentView] = useState<View>(View.SPECTRUM);
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
        setCurrentView(View.DASHBOARD);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigate = (view: View) => {
    setCurrentView(view);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setCurrentView(View.SPECTRUM);
  };

  const handleStart = () => {
    navigate(View.AUTH);
  };

  const content = (() => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard onNavigate={navigate} />;
      case View.CHAT:
        return <HopHub user={user} onNavigate={navigate} />;
      case View.MEETINGS:
        return <Meetings user={user} onNavigate={navigate} />;
      case View.MUSIC:
        return <CloudHopMusicPlayer />;
      case View.ARCADE:
        return <GameHub />;
      case View.GAME_SERVICE:
        return <GameService />;
      case View.TWITCH:
        return <Twitch />;
      case View.PROFILE:
        return <Profile user={user} />;
      case View.SETTINGS:
        return <Settings userId={session?.user.id} />;
      case View.AUTH:
        return (
          <Auth
            onAuthSuccess={() => {
              navigate(View.DASHBOARD);
            }}
          />
        );
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  })();

  if (!session && currentView !== View.SPECTRUM && currentView !== View.AUTH) {
    return (
      <Auth
        onAuthSuccess={() => {
          navigate(View.DASHBOARD);
        }}
      />
    );
  }

  if (currentView === View.SPECTRUM) {
    return <LandingPage onStart={handleStart} />;
  }

  if (currentView === View.AUTH) {
    return (
      <Auth
        onAuthSuccess={() => {
          navigate(View.DASHBOARD);
        }}
      />
    );
  }

  return (
    <Layout currentView={currentView} onNavigate={navigate} user={user} onLogout={handleLogout}>
      {content}
    </Layout>
  );
}

export default App;
