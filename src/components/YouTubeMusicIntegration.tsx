import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useYouTubeMusic, type YouTubeMusicTrack, type YouTubeMusicPlaylist } from '@/hooks/useYouTubeMusic';
import { YouTubeOAuthLogin } from './YouTubeOAuthLogin';

export const YouTubeMusicIntegration: React.FC = () => {
  const {
    api,
    isAuthenticated,
    user,
    isLoading,
    error,
    searchMusic,
    getUserPlaylists,
    getPlaylistItems,
    getLikedVideos,
    logout
  } = useYouTubeMusic();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<YouTubeMusicTrack[]>([]);
  const [playlists, setPlaylists] = useState<YouTubeMusicPlaylist[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'playlists' | 'liked'>('search');
  const [isSearching, setIsSearching] = useState(false);

  // Load user data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = async () => {
    try {
      const [userPlaylists, likedVideos] = await Promise.all([
        getUserPlaylists(),
        getLikedVideos()
      ]);
      setPlaylists(userPlaylists);
    } catch (err) {
      console.error('Failed to load user data:', err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchMusic(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlaylistClick = async (playlist: YouTubeMusicPlaylist) => {
    try {
      const items = await getPlaylistItems(playlist.id);
      setSearchResults(items);
      setActiveTab('search');
    } catch (err) {
      console.error('Failed to load playlist:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <YouTubeOAuthLogin />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* User Info */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>YouTube Music</span>
            <div className="flex items-center gap-2">
              {user && (
                <div className="flex items-center gap-2">
                  <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full" />
                  <span className="text-sm">{user.name}</span>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'search' ? 'default' : 'outline'}
          onClick={() => setActiveTab('search')}
        >
          Search
        </Button>
        <Button
          variant={activeTab === 'playlists' ? 'default' : 'outline'}
          onClick={() => setActiveTab('playlists')}
        >
          Playlists ({playlists.length})
        </Button>
        <Button
          variant={activeTab === 'liked' ? 'default' : 'outline'}
          onClick={() => setActiveTab('liked')}
        >
          Liked Videos
        </Button>
      </div>

      {/* Search Tab */}
      {activeTab === 'search' && (
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Search Music</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search for songs, artists, or albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-black/30 border-cyan-400/30 text-white placeholder-gray-400"
              />
              <Button onClick={handleSearch} disabled={isSearching} className="glow-cyan">
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 p-3 rounded">
                {error}
              </div>
            )}

            {/* Search Results */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchResults.map((track) => (
                <div key={track.videoId} className="flex items-center gap-3 p-3 rounded-lg border border-cyan-400/30 glass-panel">
                  <img
                    src={track.thumbnail}
                    alt={track.title}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{track.title}</p>
                    <p className="text-sm text-gray-300 truncate">{track.artist}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.open(track.url, '_blank')}
                    className="glow-cyan"
                  >
                    Play
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Playlists Tab */}
      {activeTab === 'playlists' && (
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Your Playlists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-cyan-400/30 glass-panel hover:bg-cyan-400/10 cursor-pointer"
                  onClick={() => handlePlaylistClick(playlist)}
                >
                  <img
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-white">{playlist.title}</p>
                    <p className="text-sm text-gray-300">
                      {playlist.trackCount} tracks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liked Videos Tab */}
      {activeTab === 'liked' && (
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Liked Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => getLikedVideos().then(setSearchResults)} className="glow-cyan">
              Load Liked Videos
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default YouTubeMusicIntegration;
