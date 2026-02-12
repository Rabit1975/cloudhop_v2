export type ListFriendRequestsOptions = {
  offset?: number;
  limit?: number;
};

export type SendFriendRequestOptions = {
  toUserId: string;
};

export type AcceptFriendRequestOptions = {
  requestId: string;
};

export type RejectFriendRequestOptions = {
  requestId: string;
};

export type CancelFriendRequestOptions = {
  requestId: string;
};