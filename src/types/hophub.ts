// HopHub Advanced Chat System Types
// Based on Telegram-like features and cloudhop-platform entities

export type MessageType = 'TEXT' | 'MEDIA' | 'SYSTEM' | 'VOICE' | 'VIDEO' | 'FILE' | 'STICKER' | 'EMOJI' | 'LOCATION' | 'POLL';

export type ConversationType = 'DM' | 'GROUP' | 'CHANNEL' | 'SECRET' | 'BROADCAST';

export type MessagePriority = 'NORMAL' | 'URGENT' | 'SILENT' | 'SCHEDULED';

export type MessageStatus = 'SENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | 'EDITED' | 'DELETED';

export type UserRole = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER' | 'RESTRICTED' | 'LEFT';

export type PrivacyLevel = 'PUBLIC' | 'PRIVATE' | 'INVITE_ONLY' | 'SECRET';

export type FileUploadStatus = 'PENDING' | 'UPLOADING' | 'COMPLETED' | 'FAILED';

export interface MediaAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'sticker' | 'gif';
  url: string;
  thumbnailUrl?: string;
  filename?: string;
  size?: number;
  duration?: number; // for audio/video
  width?: number; // for images/videos
  height?: number; // for images/videos
  mimeType?: string;
  uploadStatus?: FileUploadStatus;
  uploadProgress?: number;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  userIds: string[];
  isFromCurrentUser: boolean;
}

export interface MessageReply {
  id: string;
  originalMessageId: string;
  originalMessageText: string;
  originalMessageSender: string;
}

export interface MessageForward {
  id: string;
  originalConversationId: string;
  originalConversationName: string;
  originalMessageId: string;
  originalSenderId: string;
  originalSenderName: string;
}

export interface MessageEdit {
  editedAt: string;
  originalText: string;
  editCount: number;
}

export interface MessageSchedule {
  scheduledAt: string;
  isScheduled: boolean;
  timezone?: string;
}

export interface MessageSelfDestruct {
  selfDestructAt: string;
  selfDestructAfter: number; // seconds
  isSelfDestructing: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  type: MessageType;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  
  // Advanced features
  mediaAttachments: MediaAttachment[];
  reactions: MessageReaction[];
  replyTo?: MessageReply;
  forwardedFrom?: MessageForward;
  editHistory?: MessageEdit;
  scheduleInfo?: MessageSchedule;
  selfDestructInfo?: MessageSelfDestruct;
  
  // Status and metadata
  status: MessageStatus;
  priority: MessagePriority;
  isPinned: boolean;
  isStarred: boolean;
  readBy: string[];
  deliveredTo: string[];
  
  // Privacy and security
  isEncrypted: boolean;
  isSecretMessage: boolean;
  canForward: boolean;
  canSave: boolean;
  canScreenshot: boolean;
  
  // Additional metadata
  metadata?: Record<string, unknown>;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  pollData?: {
    question: string;
    options: Array<{
      id: string;
      text: string;
      votes: number;
      voters: string[];
    }>;
    isAnonymous: boolean;
    multipleChoice: boolean;
    endsAt?: string;
  };
}

export interface ConversationMember {
  userId: string;
  role: UserRole;
  joinedAt: string;
  lastReadMessageId?: string;
  isOnline: boolean;
  lastSeenAt?: string;
  permissions: {
    canSendMessages: boolean;
    canSendMedia: boolean;
    canSendStickers: boolean;
    canSendPolls: boolean;
    canChangeInfo: boolean;
    canAddMembers: boolean;
    canPinMessages: boolean;
    canManageTopics: boolean;
  };
  restrictedUntil?: string; // for restricted users
  customTitle?: string;
}

export interface ConversationStats {
  memberCount: number;
  messageCount: number;
  mediaCount: number;
  fileCount: number;
  totalFileSize: number;
  activeMembers24h: number;
  averageMessagesPerDay: number;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name?: string;
  description?: string;
  imageUrl?: string;
  color?: string;
  emoji?: string;
  
  // Members and permissions
  members: ConversationMember[];
  admins: string[]; // admin user IDs
  bots: string[]; // bot user IDs
  
  // Privacy and access
  privacyLevel: PrivacyLevel;
  inviteLink?: string;
  requiresApproval: boolean;
  isJoinRequestSent?: boolean;
  
  // Content and activity
  lastMessage?: Message;
  unreadCount: number;
  unreadMentions: number;
  pinnedMessages: Message[];
  
  // Timing and lifecycle
  createdAt: string;
  updatedAt?: string;
  lastActivityAt?: string;
  archivedAt?: string;
  
  // Features and settings
  features: {
    enableTopics: boolean;
    enableReactions: boolean;
    enableForwarding: boolean;
    enableScreenshots: boolean;
    enableVoiceMessages: boolean;
    enableVideoMessages: boolean;
    enableFileSharing: boolean;
    enableStickers: boolean;
    enableGifs: boolean;
    enablePolls: boolean;
    enableLocation: boolean;
    enableBots: boolean;
    enableScheduledMessages: boolean;
    enableSilentMessages: boolean;
    enableSelfDestructingMessages: boolean;
    maxFileSize: number; // in bytes
    maxMessageRetention: number; // in days
  };
  
  // Statistics
  stats?: ConversationStats;
  
  // Additional metadata
  metadata?: Record<string, unknown>;
  linkedChannels?: string[]; // for discussion groups
  linkedGroup?: string; // for broadcast channels
}

export interface ChatFolder {
  id: string;
  name: string;
  emoji?: string;
  color?: string;
  conversationIds: string[];
  isDefault: boolean;
  isArchived: boolean;
  unreadCount: number;
  notificationSettings: {
    enabled: boolean;
    sound: boolean;
    preview: boolean;
  };
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  preview: boolean;
  vibration: boolean;
  led: boolean;
  repeat: boolean;
  schedule: {
    enabled: boolean;
    from: string; // HH:mm format
    to: string;   // HH:mm format
  };
  exceptions: Record<string, {
    enabled: boolean;
    sound: boolean;
    preview: boolean;
  }>;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  
  // Status and presence
  isOnline: boolean;
  lastSeenAt?: string;
  statusMessage?: string;
  mood?: string;
  
  // Privacy settings
  privacy: {
    showPhoneNumber: boolean;
    showLastSeen: 'everyone' | 'contacts' | 'nobody';
    showProfilePhoto: 'everyone' | 'contacts' | 'nobody';
    showStatus: 'everyone' | 'contacts' | 'nobody';
    allowGroupInvites: boolean;
    allowP2PCalls: boolean;
  };
  
  // Verification and badges
  isVerified: boolean;
  isPremium: boolean;
  badges: string[];
  
  // Limits and quotas
  limits: {
    maxFileSize: number;
    maxFolders: number;
    maxPinnedChats: number;
    maxScheduledMessages: number;
    maxAutoDelete: number;
    cloudStorageUsed: number;
    cloudStorageLimit: number;
  };
  
  // Preferences
  preferences: {
    language: string;
    theme: 'light' | 'dark' | 'auto' | 'custom';
    fontSize: 'small' | 'medium' | 'large';
    messageDensity: 'compact' | 'comfortable' | 'spacious';
    autoDownloadMedia: boolean;
    autoPlayGifs: boolean;
    showChatPreviews: boolean;
  };
  
  // Social connections
  mutualFriends: number;
  mutualGroups: number;
  isBlocked: boolean;
  isContact: boolean;
  isMuted: boolean;
  
  // Additional metadata
  metadata?: Record<string, unknown>;
}

export interface Bot {
  id: string;
  username: string;
  displayName: string;
  description: string;
  avatarUrl?: string;
  isVerified: boolean;
  isInline: boolean;
  canJoinGroups: boolean;
  canAddToGroups: boolean;
  canEditMessages: boolean;
  canDeleteMessages: boolean;
  canRestrictMembers: boolean;
  canPromoteMembers: boolean;
  canManageTopics: boolean;
  commands: Array<{
    command: string;
    description: string;
    parameters?: string[];
  }>;
  apiToken?: string;
  webhookUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface FileUpload {
  id: string;
  file: File;
  type: 'image' | 'video' | 'audio' | 'document';
  progress: number;
  status: FileUploadStatus;
  url?: string;
  thumbnailUrl?: string;
  error?: string;
  cancelToken?: AbortController;
}

export interface VoiceCall {
  id: string;
  conversationId: string;
  initiatorId: string;
  participants: string[];
  status: 'RINGING' | 'ACTIVE' | 'ENDED' | 'MISSED';
  startTime?: string;
  endTime?: string;
  duration?: number;
  isVideoCall: boolean;
  isGroupCall: boolean;
  isEncrypted: boolean;
  recordingEnabled: boolean;
  screenShareEnabled: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  venue?: {
    name: string;
    address: string;
    type: string;
  };
}

export interface Poll {
  id: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    votes: number;
    voters: string[];
  }>;
  isAnonymous: boolean;
  multipleChoice: boolean;
  quizMode: boolean;
  correctOptionId?: string;
  totalVoters: number;
  endsAt?: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Search types
export interface SearchFilters {
  type?: ConversationType[];
  dateRange?: {
    from: string;
    to: string;
  };
  hasMedia?: boolean;
  hasFiles?: boolean;
  hasLinks?: boolean;
  fromUser?: string;
  inConversation?: string;
}

export interface SearchResult {
  type: 'message' | 'conversation' | 'user' | 'file';
  id: string;
  conversationId?: string;
  title: string;
  description?: string;
  preview?: string;
  timestamp: string;
  relevance: number;
  metadata?: Record<string, unknown>;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

// Event types for real-time updates
export interface ChatEvent {
  type: 'message_sent' | 'message_edited' | 'message_deleted' | 'message_read' | 
        'user_typing' | 'user_online' | 'user_offline' | 'conversation_updated' | 
        'member_joined' | 'member_left' | 'member_role_changed' | 'call_started' | 
        'call_ended' | 'file_uploaded' | 'reaction_added' | 'reaction_removed';
  payload: Record<string, unknown>;
  timestamp: string;
  userId?: string;
  conversationId?: string;
}
