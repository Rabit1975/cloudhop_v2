import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipForward, SkipBack, Volume2, Search, Music, List } from 'lucide-react';

interface YouTubeVideo {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
}

interface YouTubePlaylist {
  id: string;
  name: string;
  videos: YouTubeVideo[];
}

export function YouTubeMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<YouTubeVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([]);
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockVideos: YouTubeVideo[] = [
    {
      id: '1',
      title: 'Cosmic Journey',
      artist: 'Space Ambient',
      thumbnail: 'https://i.ytimg.com/vi/default/mqdefault.jpg',
      duration: '3:45'
    },
    {
      id: '2', 
      title: 'Nebula Dreams',
      artist: 'Chillwave Collective',
      thumbnail: 'https://i.ytimg.com/vi/default/mqdefault.jpg',
      duration: '4:12'
    },
    {
      id: '3',
      title: 'Galaxy Explorer',
      artist: 'Space Music',
      thumbnail: 'https://i.ytimg.com/vi/default/mqdefault.jpg',
      duration: '5:30'
    }
  ];

  const mockPlaylists: YouTubePlaylist[] = [
    {
      id: '1',
      name: 'CloudHop Favorites',
      videos: mockVideos
    },
    {
      id: '2',
      name: 'Gaming Sessions',
      videos: mockVideos.slice(0, 2)
    }
  ];

  useEffect(() => {
    setPlaylists(mockPlaylists);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      // In a real implementation, this would use YouTube Data API v3
      // For now, filter mock videos
      const filtered = mockVideos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoSelect = (video: YouTubeVideo) => {
    setCurrentVideo(video);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            YouTube Music
          </h1>
          <p className="text-white/60">
            Your personal music library with YouTube API v3 integration
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 bg-black/20 backdrop-blur-sm border-white/10">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search YouTube videos, artists, playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/40"
              />
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Playing */}
          <div className="lg:col-span-2">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Music className="w-5 h-5 text-red-500" />
                  Now Playing
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {currentVideo ? (
                  <div className="space-y-4">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                      <img 
                        src={currentVideo.thumbnail} 
                        alt={currentVideo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button
                          onClick={handlePlayPause}
                          className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{currentVideo.title}</h3>
                      <p className="text-white/60 mb-4">{currentVideo.artist}</p>
                      
                      {/* Progress Bar */}
                      <div className="bg-white/20 rounded-full h-2 mb-4">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/10">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/10">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/10">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Music className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Video Playing</h3>
                    <p className="text-white/60">Select a video to start listening</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Playlists & Search Results */}
          <div className="space-y-6">
            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-cyan-400" />
                    Search Results ({searchResults.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {searchResults.map(video => (
                      <div 
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{video.title}</h4>
                          <p className="text-white/60 text-xs">{video.artist}</p>
                        </div>
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                          {video.duration}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Playlists */}
            {playlists.map(playlist => (
              <Card key={playlist.id} className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <List className="w-5 h-5 text-purple-400" />
                    {playlist.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {playlist.videos.map(video => (
                      <div 
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                        className="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm truncate">{video.title}</h4>
                          <p className="text-white/60 text-xs truncate">{video.artist}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
