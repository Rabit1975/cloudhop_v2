import { UserPlus, MessageCircle, Users, Gamepad2, Twitch, Radio } from "lucide-react";

const friends = [
  {
    id: 1,
    name: "Sarah Mitchell",
    username: "Sarah_M",
    status: "online",
    currentGame: "Playing Cyber Nexus 2077",
    level: 38,
    avatar: "SM",
    streaming: true,
    platform: "steam",
  },
  {
    id: 2,
    name: "Alex Kim",
    username: "Alex_K",
    status: "online",
    currentGame: "Playing Fantasy Realm",
    level: 45,
    avatar: "AK",
    streaming: true,
    platform: "twitch",
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    username: "Mike_R",
    status: "away",
    currentGame: "Away",
    level: 32,
    avatar: "MR",
    streaming: false,
    platform: "steam",
  },
  {
    id: 4,
    name: "Emma Lewis",
    username: "Emma_L",
    status: "offline",
    currentGame: "Last seen 2 hours ago",
    level: 41,
    avatar: "EL",
    streaming: false,
    platform: "steam",
  },
  {
    id: 5,
    name: "Chris Taylor",
    username: "Chris_T",
    status: "online",
    currentGame: "Playing Battle Legends",
    level: 50,
    avatar: "CT",
    streaming: true,
    platform: "twitch",
  },
  {
    id: 6,
    name: "Jessica Park",
    username: "Jessica_P",
    status: "offline",
    currentGame: "Last seen yesterday",
    level: 29,
    avatar: "JP",
    streaming: false,
    platform: "steam",
  },
];

const friendRequests = [
  { id: 1, name: "David Chen", username: "David_C", mutualFriends: 3 },
  { id: 2, name: "Lisa Anderson", username: "Lisa_A", mutualFriends: 5 },
];

export function Friends() {
  const onlineFriends = friends.filter((f) => f.status === "online");
  const streamingFriends = friends.filter((f) => f.streaming);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Friends</h1>
          <p className="text-slate-400">
            {onlineFriends.length} of {friends.length} friends online · {streamingFriends.length} streaming
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Friend
        </button>
      </div>

      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Friend Requests ({friendRequests.length})
          </h2>
          <div className="space-y-3">
            {friendRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="font-bold">{request.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-slate-400">
                      {request.mutualFriends} mutual friends
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Streaming Now */}
      {streamingFriends.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-500" />
            Streaming Now ({streamingFriends.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {streamingFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer group"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">{friend.avatar}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-slate-800">
                    <Radio className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold flex items-center gap-2">
                    {friend.name}
                    {friend.platform === "twitch" && (
                      <Twitch className="w-4 h-4 text-purple-500" />
                    )}
                  </div>
                  <div className="text-sm text-slate-400 truncate">{friend.currentGame}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-xs text-red-400">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="font-semibold mb-4">All Friends</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">{friend.avatar}</span>
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-800 ${
                    friend.status === "online"
                      ? "bg-green-500"
                      : friend.status === "away"
                      ? "bg-yellow-500"
                      : "bg-slate-500"
                  }`}
                />
                {friend.streaming && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                    <Radio className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold flex items-center gap-2">
                  {friend.name}
                  {friend.platform === "twitch" && (
                    <Twitch className="w-4 h-4 text-purple-500" />
                  )}
                </div>
                <div className="text-sm text-slate-400 truncate">{friend.currentGame}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="px-2 py-0.5 bg-slate-700 rounded text-xs">
                    Level {friend.level}
                  </div>
                  {friend.platform === "steam" && (
                    <div className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c.93 0 1.83-.13 2.68-.37L8.5 18.4l-.11-.02a3.5 3.5 0 0 1 0-6.98l7.52-3.2A10 10 0 0 0 12 2m0 1.5a8.5 8.5 0 0 1 8.5 8.5 8.5 8.5 0 0 1-8.5 8.5 8.5 8.5 0 0 1-8.5-8.5 8.5 8.5 0 0 1 8.5-8.5m5.5 5a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 20 11a2.5 2.5 0 0 0-2.5-2.5m0 1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S16 11.33 16 10.5s.67-1.5 1.5-1.5M8.5 12.5a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"/>
                      </svg>
                      Steam
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {friend.status === "online" && (
                  <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                    <Gamepad2 className="w-5 h-5" />
                  </button>
                )}
                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}