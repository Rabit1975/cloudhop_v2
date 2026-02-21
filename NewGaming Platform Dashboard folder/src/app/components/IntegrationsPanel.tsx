import { Twitch, CheckCircle2, Settings } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  connected: boolean;
  username?: string;
  color: string;
}

const integrations: Integration[] = [
  {
    id: "steam",
    name: "Steam",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c.93 0 1.83-.13 2.68-.37L8.5 18.4l-.11-.02a3.5 3.5 0 0 1 0-6.98l7.52-3.2A10 10 0 0 0 12 2m0 1.5a8.5 8.5 0 0 1 8.5 8.5 8.5 8.5 0 0 1-8.5 8.5 8.5 8.5 0 0 1-8.5-8.5 8.5 8.5 0 0 1 8.5-8.5m5.5 5a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 20 11a2.5 2.5 0 0 0-2.5-2.5m0 1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S16 11.33 16 10.5s.67-1.5 1.5-1.5M8.5 12.5a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"/>
      </svg>
    ),
    connected: true,
    username: "JohnD_Gaming",
    color: "from-blue-600 to-blue-400",
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: Twitch,
    connected: true,
    username: "JohnDPlays",
    color: "from-purple-600 to-purple-400",
  },
  {
    id: "unity",
    name: "Unity Play",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.82 7 12 10.82 5.18 7 12 4.18zM5 8.82l6 3.35v6.65l-6-3.35V8.82zm8 10v-6.65l6-3.35v6.83l-6 3.35z"/>
      </svg>
    ),
    connected: true,
    username: "Connected",
    color: "from-slate-600 to-slate-400",
  },
];

export function IntegrationsPanel() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Connected Services</h2>
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-slate-400" />
        </button>
      </div>
      
      <div className="space-y-3">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${integration.color} rounded-lg flex items-center justify-center`}>
                <integration.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold flex items-center gap-2">
                  {integration.name}
                  {integration.connected && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </div>
                {integration.connected && integration.username && (
                  <div className="text-sm text-slate-400">{integration.username}</div>
                )}
              </div>
            </div>
            {integration.connected ? (
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm">
                Manage
              </button>
            ) : (
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
