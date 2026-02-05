import { useState, useEffect } from 'react';
import { View } from '../types';

export const useUrlRouting = () => {
  const [currentView, setCurrentView] = useState<View>(View.SPECTRUM);

  useEffect(() => {
    // Handle initial URL
    const path = window.location.pathname;
    const view = mapPathToView(path);
    setCurrentView(view);

    // Handle browser navigation
    const handlePopState = () => {
      const newPath = window.location.pathname;
      const newView = mapPathToView(newPath);
      setCurrentView(newView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (view: View) => {
    const path = mapViewToPath(view);
    window.history.pushState({}, '', path);
    setCurrentView(view);
  };

  return { currentView, navigate };
};

const mapPathToView = (path: string): View => {
  switch (path) {
    case '/':
      return View.SPECTRUM;
    case '/dashboard':
      return View.DASHBOARD;
    case '/chat':
      return View.CHAT;
    case '/meetings':
      return View.MEETINGS;
    case '/spaces':
      return View.CORE;
    case '/arcade':
      return View.ARCADE;
    case '/profile':
      return View.PROFILE;
    case '/settings':
      return View.SETTINGS;
    case '/ai-tools':
      return View.AI_TOOLS;
    case '/auth':
      return View.AUTH;
    default:
      return View.SPECTRUM;
  }
};

const mapViewToPath = (view: View): string => {
  switch (view) {
    case View.SPECTRUM:
      return '/';
    case View.DASHBOARD:
      return '/dashboard';
    case View.CHAT:
      return '/chat';
    case View.MEETINGS:
      return '/meetings';
    case View.CORE:
      return '/spaces';
    case View.ARCADE:
      return '/arcade';
    case View.PROFILE:
      return '/profile';
    case View.SETTINGS:
      return '/settings';
    case View.AI_TOOLS:
      return '/ai-tools';
    case View.AUTH:
      return '/auth';
    default:
      return '/';
  }
};
