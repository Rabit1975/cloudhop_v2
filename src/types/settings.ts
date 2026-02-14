// Comprehensive Settings type definitions for HopHub Advanced Features
export interface AppSettings {
  // Core settings
  theme: ThemeSettings
  notifications: NotificationSettings
  audio: AudioSettings
  video: VideoSettings
  privacy: PrivacySettings
  language: string
  
  // Advanced HopHub features
  chat: ChatSettings
  files: FileSettings
  security: SecuritySettings
  account: AccountSettings
  advanced: AdvancedSettings
}

// Theme and Appearance
export interface ThemeSettings {
  mode: 'light' | 'dark' | 'auto' | 'custom'
  accentColor: string
  fontSize: 'small' | 'medium' | 'large'
  fontFamily: string
  messageDensity: 'compact' | 'comfortable' | 'spacious'
  showAvatars: boolean
  showTimestamps: boolean
  showReadReceipts: boolean
  customTheme: {
    primaryColor: string
    backgroundColor: string
    surfaceColor: string
    textColor: string
    accentColor: string
  }
  animations: {
    enabled: boolean
    speed: 'slow' | 'normal' | 'fast'
    reducedMotion: boolean
  }
}

// Enhanced Notifications
export interface NotificationSettings {
  enabled: boolean
  sound: boolean
  desktop: boolean
  mobile: boolean
  email: boolean
  
  // Notification types
  mentions: boolean
  directMessages: boolean
  groupMessages: boolean
  channelMessages: boolean
  reactions: boolean
  replies: boolean
  forwardedMessages: boolean
  scheduledMessages: boolean
  
  // Notification behavior
  muteDuration: number // minutes
  doNotDisturb: {
    enabled: boolean
    startTime: string // HH:mm
    endTime: string   // HH:mm
    weekends: boolean
  }
  repeatAlerts: boolean
  showPreview: boolean
  showSender: boolean
  vibration: boolean
  led: boolean
  
  // Sound settings
  messageSound: string
  callSound: string
  notificationSound: string
  volume: number
}

// Enhanced Audio Settings
export interface AudioSettings {
  inputDeviceId: string
  outputDeviceId: string
  volume: number
  echoCancellation: boolean
  noiseSuppression: boolean
  autoGainControl: boolean
  
  // Voice messages
  voiceMessageQuality: 'low' | 'medium' | 'high'
  autoPlayVoiceMessages: boolean
  transcribeVoiceMessages: boolean
  
  // Call settings
  callVolume: number
  microphoneVolume: number
  pushToTalk: boolean
  pushToTalkKey: string
  muteOnJoin: boolean
  
  // Audio effects
  voiceChanger: {
    enabled: boolean
    pitch: number
    effect: 'none' | 'robot' | 'alien' | 'chipmunk'
  }
}

// Enhanced Video Settings
export interface VideoSettings {
  deviceId: string
  resolution: '360p' | '720p' | '1080p' | '4k'
  frameRate: 15 | 30 | 60
  backgroundBlur: boolean
  backgroundReplacement: boolean
  backgroundImage?: string
  
  // Video quality
  quality: 'low' | 'medium' | 'high' | 'auto'
  hardwareAcceleration: boolean
  pictureInPicture: boolean
  
  // Call settings
  autoStartVideo: boolean
  mirrorVideo: boolean
  gridLayout: boolean
  speakerView: boolean
  
  // Recording
  recordCalls: boolean
  recordingQuality: 'low' | 'medium' | 'high'
  autoSaveRecordings: boolean
}

// Comprehensive Privacy Settings
export interface PrivacySettings {
  // Presence
  onlineStatus: boolean
  lastSeen: 'everyone' | 'contacts' | 'nobody'
  profilePhoto: 'everyone' | 'contacts' | 'nobody'
  statusMessage: 'everyone' | 'contacts' | 'nobody'
  phoneNumber: 'everyone' | 'contacts' | 'nobody'
  
  // Activity
  readReceipts: boolean
  typingIndicator: boolean
  voiceCallStatus: boolean
  videoCallStatus: boolean
  
  // Groups and channels
  allowGroupInvites: boolean
  allowChannelInvites: boolean
  showGroupsInCommon: boolean
  showChannelsInCommon: boolean
  
  // Forwarding and saving
  allowForwarding: boolean
  allowSaving: boolean
  allowScreenshots: boolean
  autoDeleteMedia: boolean
  mediaRetentionDays: number
  
  // Secret chats
  defaultToSecret: boolean
  allowSecretChats: boolean
  selfDestructTimer: number // seconds
  
  // Data and analytics
  shareUsageData: boolean
  shareCrashReports: boolean
  personalizedAds: boolean
}

// Chat Settings
export interface ChatSettings {
  // Message behavior
  enterToSend: boolean
  shiftEnterForNewLine: boolean
  autoSaveDrafts: boolean
  sendByEnter: boolean
  
  // Media and files
  autoDownloadMedia: boolean
  autoDownloadImages: boolean
  autoDownloadVideos: boolean
  autoDownloadFiles: boolean
  autoPlayGifs: boolean
  showLargeMedia: boolean
  compressImages: boolean
  
  // Chat organization
  chatFolders: ChatFolder[]
  pinnedChats: string[]
  archivedChats: string[]
  hiddenChats: string[]
  
  // Search and filtering
  searchInAllChats: boolean
  includeArchivedInSearch: boolean
  searchFilters: {
    dateRange: boolean
    mediaType: boolean
    messageType: boolean
  }
  
  // Message display
  showMessageDates: boolean
  showMessageIds: boolean
  showEditHistory: boolean
  showForwardInfo: boolean
  showReplyInfo: boolean
  
  // Quick actions
  swipeToReply: boolean
  longPressMenu: boolean
  doubleTapToReact: boolean
  tapToUnread: boolean
}

// File Settings
export interface FileSettings {
  // Upload settings
  maxFileSize: number // bytes
  maxFileCount: number
  supportedTypes: string[]
  compressBeforeUpload: boolean
  generateThumbnails: boolean
  
  // Storage
  cloudStorageEnabled: boolean
  localStorageEnabled: boolean
  autoBackup: boolean
  backupFrequency: 'daily' | 'weekly' | 'monthly'
  
  // Download settings
  downloadPath: string
  autoDownload: boolean
  askBeforeDownload: boolean
  organizeByDate: boolean
  organizeByType: boolean
  
  // Media quality
  imageQuality: 'low' | 'medium' | 'high' | 'original'
  videoQuality: 'low' | 'medium' | 'high' | 'original'
  audioQuality: 'low' | 'medium' | 'high' | 'original'
  
  // Cache management
  enableCache: boolean
  maxCacheSize: number // MB
  autoClearCache: boolean
  cacheRetentionDays: number
}

// Security Settings
export interface SecuritySettings {
  // Authentication
  twoFactorAuth: boolean
  biometricAuth: boolean
  sessionTimeout: number // minutes
  autoLock: boolean
  requirePasswordForSensitive: boolean
  
  // Encryption
  endToEndEncryption: boolean
  secretChatEncryption: boolean
  fileEncryption: boolean
  voiceCallEncryption: boolean
  videoCallEncryption: boolean
  
  // Login and sessions
  activeSessions: ActiveSession[]
  allowMultipleSessions: boolean
  sessionNotifications: boolean
  revokeOldSessions: boolean
  
  // Password and recovery
  passwordStrength: 'weak' | 'medium' | 'strong'
  passwordChangeInterval: number // days
  recoveryEmail: string
  recoveryPhone: string
  
  // Advanced security
  loginAttempts: number
  lockoutDuration: number // minutes
  suspiciousActivityAlert: boolean
  dataIntegrityCheck: boolean
}

// Account Settings
export interface AccountSettings {
  // Profile
  username: string
  displayName: string
  firstName: string
  lastName: string
  bio: string
  avatarUrl: string
  coverImageUrl: string
  
  // Contact info
  email: string
  phone: string
  website: string
  location: string
  
  // Verification
  isVerified: boolean
  isPremium: boolean
  badges: string[]
  
  // Limits and quotas
  limits: {
    maxFileSize: number
    maxFolders: number
    maxPinnedChats: number
    maxScheduledMessages: number
    maxAutoDelete: number
    cloudStorageUsed: number
    cloudStorageLimit: number
    maxMembersPerGroup: number
    maxChannelsPerUser: number
  }
  
  // Preferences
  timezone: string
  language: string
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
  timeFormat: '12h' | '24h'
  weekStartsOn: 'sunday' | 'monday'
  
  // Status
  status: 'online' | 'away' | 'busy' | 'invisible'
  statusMessage: string
  mood: string
}

// Advanced Settings
export interface AdvancedSettings {
  // Developer options
  developerMode: boolean
  debugMode: boolean
  showConsoleLogs: boolean
  enableExperimentalFeatures: boolean
  
  // Performance
  hardwareAcceleration: boolean
  multiThreadedRendering: boolean
  memoryOptimization: boolean
  batteryOptimization: boolean
  
  // Network
  connectionType: 'auto' | 'wifi' | 'cellular' | 'offline'
  dataSaver: boolean
  lowDataMode: boolean
  proxySettings: {
    enabled: boolean
    host: string
    port: number
    username?: string
    password?: string
  }
}
// Supporting types
export interface ChatFolder {
  id: string
  name: string
  emoji?: string
  color?: string
  conversationIds: string[]
  isDefault: boolean
  isArchived: boolean
  unreadCount: number
  notificationSettings: {
    enabled: boolean
    sound: boolean
    preview: boolean
  }
}

export interface ActiveSession {
  id: string
  device: string
  platform: string
  ipAddress: string
  location: string
  lastActive: string
  isCurrent: boolean
}

export interface BotSettings {
  enabled: boolean
  development: boolean
  webhookUrl: string
  allowedEvents: string[]
  permissions: string[]
  rateLimit: number
}
