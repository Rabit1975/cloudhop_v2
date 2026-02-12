export type HopmeetsMeetingStatus = 'scheduled' | 'live' | 'ended' | 'canceled';

export type HopmeetsParticipantRole = 'host' | 'co_host' | 'presenter' | 'attendee';

export type HopmeetsMeetingParticipant = {
  userId: string;
  role: HopmeetsParticipantRole;
  joinedAt?: string;
  leftAt?: string;
};

export type HopmeetsMeeting = {
  id: string;
  topic: string;
  description?: string;
  startTime: string;
  endTime: string;
  hostId: string;
  participants: HopmeetsMeetingParticipant[];
  status: HopmeetsMeetingStatus;
  accessCode?: string;
  joinUrl: string;
  createdAt: string;
  updatedAt?: string;
};

export type HopmeetsCalendarIntegration = {
  id: string;
  userId: string;
  provider: string;
  email: string;
  connectedAt: string;
  refreshToken?: string;
};

export type HopmeetsCreateMeetingOptions = {
  topic: string;
  description?: string;
  startTime: string;
  endTime: string;
  participantUserIds?: string[];
  accessCode?: string;
};

export type HopmeetsUpdateMeetingOptions = {
  meetingId: string;
  topic?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  participantUserIds?: string[];
  accessCode?: string;
  status?: HopmeetsMeetingStatus;
};

export type HopmeetsDateRangeOptions = {
  start: string;
  end: string;
};

export type HopmeetsListMeetingsOptions = {
  offset?: number;
  limit?: number;
  status?: HopmeetsMeetingStatus;
  participantUserId?: string;
  dateRange?: HopmeetsDateRangeOptions;
};

export type HopmeetsAddCalendarIntegrationOptions = {
  provider: string;
  authCode: string;
  redirectUri: string;
};