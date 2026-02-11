// Re-export all types from individual files
export type { HopSpaceType, HopSpaceMood } from './types';
export type { SpaceType, SpaceSettings, SpaceFeatures, SpaceMember } from './space';
export interface HopSpace from './types';
export interface PlanetState from './types';

// Chat and message related types
export interface CallHistory from './call';
export interface Message from './message';
export interface ReactionSummary from './message';

export interface ChatProps {
  userId?: string;
}

export interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onTyping: () => void;
}
