// Re-export all types from individual files
export type { HopSpaceType, HopSpaceMood } from './types';
export type { SpaceType, SpaceSettings, SpaceFeatures, SpaceMember } from './space';

// Re-export interfaces properly
export type { HopSpace, PlanetState } from './types';

// Chat and message related types
export type { CallHistory } from './call';
export type { Message, ReactionSummary } from './message';

export interface ChatProps {
  userId?: string;
}

export interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onTyping: () => void;
}


