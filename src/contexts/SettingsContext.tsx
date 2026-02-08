import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { supabase } from '../core/supabase/client';

// Development flag for logging
const DEBUG = import.meta.env.DEV;

export interface UserSettings {
  // Appearance
  colorMode?: 'Deep Space (Dark)' | 'Light Mode' | 'System Default';
  theme?: 'CloudHop Blue' | 'Neon Green' | 'Cyber Pink';
  emojiSkinTone?: string;

  // System
  startOnBoot?: boolean;
  minimizeToTray?: boolean;
  dualMonitors?: boolean;
  autoFullScreen?: boolean;

  // Camera
  cameraSource?: string;
  originalRatio?: boolean;
  hdVideo?: boolean;
  mirrorVideo?: boolean;
  touchUpAppearance?: number; // 0-100
  lowLightAdjustment?: 'Auto' | 'Manual';
  alwaysShowNames?: boolean;
  stopVideoOnJoin?: boolean;
  showPreviewOnJoin?: boolean;
  hideNonVideo?: boolean;

  // Audio
  speakerDevice?: string;
  speakerVolume?: number;
  micDevice?: string;
  micVolume?: number;
  autoMicVolume?: boolean;
  suppressNoise?: 'Auto' | 'Low' | 'Medium' | 'High';
  originalSound?: boolean;
  echoCancellation?: boolean;

  // Share Screen
  shareWindowSize?: 'Maintain current size' | 'Enter fullscreen' | 'Maximize window';
  scaleToFit?: boolean;
  sideBySide?: boolean;
  silenceNotifications?: boolean;
  shareApplications?: 'Share individual windows' | 'Share all windows from app';

  // Recording
  recordingPath?: string;
  chooseLocationOnEnd?: boolean;
  separateAudio?: boolean;
  optimizeForEditor?: boolean;
  addTimestamp?: boolean;
  recordVideoDuringShare?: boolean;

  // Accessibility
  captionFontSize?: number;
  alwaysShowCaptions?: boolean;

  // Notifications & Sounds
  playSoundMessage?: boolean;
  playSoundJoin?: boolean;
  showNotificationBanner?: boolean;
  bounceDockIcon?: boolean;

  // Meetings
  copyInviteLinkOnStart?: boolean;
  confirmLeave?: boolean;
  showMeetingTimer?: boolean;
  alwaysShowControls?: boolean;

  // Team Chat
  linkPreview?: boolean;
  fileTransfer?: boolean;
  animatedGifs?: boolean;
  codeSnippet?: boolean;

  // Privacy & Others
  [key: string]: unknown;
}

export interface UserProfile {
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  username?: string;
  email?: string; // Email from auth system
}

interface SettingsContextType {
  settings: UserSettings;
  profile: UserProfile;
  updateSetting: (key: keyof UserSettings, value: any) => Promise<void>;
  updateSettings: (newValues: Partial<UserSettings>) => Promise<void>;
  updateProfile: (newValues: Partial<UserProfile>) => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode; userId?: string }> = ({
  children,
  userId,
}) => {
  const [settings, setSettings] = useState<UserSettings>({});
  const [profile, setProfile] = useState<UserProfile>({});
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchSettings = async () => {
      if (DEBUG) console.log('Fetching settings for userId:', userId);

      // Get email from Supabase auth once and store it
      const { data: authData } = await supabase.auth.getUser();
      const email = authData.user?.email || null;
      setUserEmail(email);

      // Get user data from our custom users table
      const { data, error } = await supabase
        .from('users')
        .select('settings, display_name, avatar_url, bio, phone, username')
        .eq('id', userId)
        .single();

      if (error) {
        if (DEBUG) console.error('Error fetching settings:', error);
        setLoading(false);
        return;
      }

      if (data) {
        if (DEBUG) console.log('Fetched user data:', data);
        if (data.settings) {
          if (DEBUG) console.log('Settings loaded:', data.settings);
          setSettings(data.settings);
        }

        const profileData = {
          display_name: data.display_name,
          avatar_url: data.avatar_url,
          bio: data.bio,
          phone: data.phone,
          username: data.username,
          email, // Use cached email
        };

        setProfile(profileData);
        if (DEBUG) console.log('Profile loaded:', profileData);
      }
      setLoading(false);
    };

    void fetchSettings();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`user_settings:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${userId}`,
        },
        payload => {
          const newUser = payload.new as any;
          if (newUser.settings) setSettings(newUser.settings);

          // Use cached email instead of calling auth API on every update
          setProfile(prev => ({
            ...prev,
            display_name: newUser.display_name,
            avatar_url: newUser.avatar_url,
            bio: newUser.bio,
            phone: newUser.phone,
            username: newUser.username,
            email: userEmail || prev.email,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, userEmail]);

  const updateSetting = async (key: keyof UserSettings, value: any) => {
    if (!userId) {
      if (DEBUG) console.error('No userId provided to updateSetting');
      return;
    }

    if (DEBUG) console.log('Updating setting:', key, '=', value);
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings); // Optimistic update

    const { error, data } = await supabase
      .from('users')
      .update({ settings: newSettings })
      .eq('id', userId)
      .select();

    if (error) {
      if (DEBUG) console.error('Error updating settings:', error);
      // Revert optimistic update on error
      setSettings(settings);
      // In production, use a toast notification instead of alert
      if (DEBUG) alert('Failed to update settings: ' + error.message);
      throw error; // Let the calling component handle the error
    } else {
      if (DEBUG) console.log('Settings updated successfully:', data);
    }
  };

  const updateSettings = async (newValues: Partial<UserSettings>) => {
    if (!userId) {
      if (DEBUG) console.error('No userId provided to updateSettings');
      return;
    }

    if (DEBUG) console.log('Updating multiple settings:', newValues);
    const newSettings = { ...settings, ...newValues };
    setSettings(newSettings);

    const { error, data } = await supabase
      .from('users')
      .update({ settings: newSettings })
      .eq('id', userId)
      .select();

    if (error) {
      if (DEBUG) console.error('Error updating settings:', error);
      // Revert optimistic update on error
      setSettings(settings);
      if (DEBUG) alert('Failed to update settings: ' + error.message);
      throw error; // Let the calling component handle the error
    } else {
      if (DEBUG) console.log('Multiple settings updated successfully:', data);
    }
  };

  const updateProfile = async (newValues: Partial<UserProfile>) => {
    if (!userId) {
      if (DEBUG) console.error('No userId provided to updateProfile');
      return;
    }

    if (DEBUG) console.log('Updating profile with:', newValues);
    const newProfile = { ...profile, ...newValues };
    setProfile(newProfile); // Optimistic update

    const { error, data } = await supabase
      .from('users')
      .update(newValues)
      .eq('id', userId)
      .select();

    if (error) {
      if (DEBUG) console.error('Error updating profile:', error);
      // Revert optimistic update on error
      setProfile(profile);
      if (DEBUG) alert('Failed to update profile: ' + error.message);
      throw error; // Let the calling component handle the error
    } else {
      if (DEBUG) console.log('Profile updated successfully:', data);
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      settings,
      profile,
      updateSetting,
      updateSettings,
      updateProfile,
      loading,
    }),
    [settings, profile, loading]
  );

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
