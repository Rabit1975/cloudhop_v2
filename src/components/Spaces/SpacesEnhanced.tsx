import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Users, 
  Star, 
  Globe, 
  Zap,
  Palette,
  Music,
  MessageSquare,
  Calendar,
  Settings,
  Eye
} from 'lucide-react';

// Mock spaces data
const spaces = [
  {
    id: '1',
    name: 'Creative Studio',
    description: 'A collaborative space for artists and designers to create together',
    type: 'fluid_art',
    mood: 'creative',
    members: 156,
    rating: 4.8,
    isPublic: true,
    tags: ['art', 'design', 'collaborative'],
    thumbnail: '/api/placeholder/400/300',
    lastActivity: '2 hours ago',
    creator: 'Alice Chen'
  },
  {
    id: '2',
    name: 'Music Production Hub',
    description: 'Professional music production space with real-time collaboration',
    type: 'music',
    mood: 'energetic',
    members: 89,
    rating: 4.6,
    isPublic: true,
    tags: ['music', 'production', 'collaboration'],
    thumbnail: '/api/placeholder/400/300',
    lastActivity: '5 minutes ago',
    creator: 'Bob Johnson'
  },
  {
    id: '3',
    name: 'Brainstorm Arena',
    description: 'Interactive space for brainstorming and idea generation',
    type: 'ideas',
    mood: 'dreamy',
    members: 234,
    rating: 4.9,
    isPublic: true,
    tags: ['ideas', 'brainstorming', 'innovation'],
    thumbnail: '/api/placeholder/400/300',
    lastActivity: '1 hour ago',
    creator: 'Carol Davis'
  },
  {
    id: '4',
    name: 'Zen Garden',
    description: 'A peaceful space for meditation and relaxation',
    type: 'wellness',
    mood: 'calm',
    members: 67,
    rating: 4.7,
    isPublic: false,
    tags: ['meditation', 'wellness', 'relaxation'],
    thumbnail: '/api/placeholder/400/300',
    lastActivity: '3 hours ago',
    creator: 'David Kim'
  },
  {
    id: '5',
    name: 'Gaming Lounge',
    description: 'Social space for gamers to hang out and play together',
    type: 'social',
    mood: 'chaotic',
    members: 412,
    rating: 4.5,
    isPublic: true,
    tags: ['gaming', 'social', 'entertainment'],
    thumbnail: '/api/placeholder/400/300',
    lastActivity: '30 minutes ago',
    creator: 'Eve Wilson'
  }
];

const spaceTypes = ['All', 'fluid_art', 'music', 'ideas', 'wellness', 'social'];
const moods = ['All', 'calm', 'energetic', 'creative', 'dreamy', 'chaotic'];

export function SpacesEnhanced() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedMood, setSelectedMood] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'explore' | 'my-spaces' | 'create'>('explore');

  const filteredSpaces = spaces.filter(space => {
    const matchesType = selectedType === 'All' || space.type === selectedType;
    const matchesMood = selectedMood === 'All' || space.mood === selectedMood;
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesMood && matchesSearch;
  });

  const getSpaceIcon = (type: string) => {
    switch (type) {
      case 'fluid_art': return <Palette className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'ideas': return <Zap className="w-5 h-5" />;
      case 'wellness': return <Eye className="w-5 h-5" />;
      case 'social': return <Users className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'calm': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'energetic': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'creative': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'dreamy': return 'bg-pink-500/20 text-pink-400 border-pink-500/50';
      case 'chaotic': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const SpaceCard = ({ space }: { space: typeof spaces[0] }) => (
    <Card className="group bg-black/20 backdrop-blur-sm border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
              {getSpaceIcon(space.type)}
              {space.name}
            </CardTitle>
            <CardDescription className="text-white/60 text-sm mt-2">
              {space.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white/80 text-sm">{space.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="flex items-center gap-2">
          <Badge className={getMoodColor(space.mood)}>
            {space.mood}
          </Badge>
          <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
            {space.type}
          </Badge>
          {space.isPublic ? (
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              Public
            </Badge>
          ) : (
            <Badge variant="outline" className="border-red-500/50 text-red-400">
              Private
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {space.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs bg-white/10 text-white/60">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-white/60">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{space.members} members</span>
          </div>
          <span>Last activity: {space.lastActivity}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-semibold"
          >
            Enter Space
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white/80 hover:bg-white/10"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Spaces
          </h1>
          <p className="text-white/60 text-lg">
            Discover and create immersive collaborative spaces
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="mb-6">
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="explore" className="text-white/80 data-[state=active]:text-cyan-400">
              Explore
            </TabsTrigger>
            <TabsTrigger value="my-spaces" className="text-white/80 data-[state=active]:text-cyan-400">
              My Spaces
            </TabsTrigger>
            <TabsTrigger value="create" className="text-white/80 data-[state=active]:text-cyan-400">
              Create
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Search spaces..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/20 border-white/10 text-white placeholder-white/40"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-black/20 border border-white/10 text-white px-3 py-2 rounded-lg"
                >
                  {spaceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="bg-black/20 border border-white/10 text-white px-3 py-2 rounded-lg"
                >
                  {moods.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Spaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpaces.map(space => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-spaces" className="space-y-6">
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Your Spaces</h3>
              <p className="text-white/60 mb-4">
                Spaces you create or join will appear here
              </p>
              <Button 
                onClick={() => setActiveTab('create')}
                className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Space
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white">Create New Space</CardTitle>
                <CardDescription className="text-white/60">
                  Design your perfect collaborative environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 text-sm">Space Name</label>
                    <Input 
                      placeholder="My Awesome Space"
                      className="bg-white/10 border-white/20 text-white placeholder-white/40"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm">Space Type</label>
                    <select className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg">
                      <option>fluid_art</option>
                      <option>music</option>
                      <option>ideas</option>
                      <option>wellness</option>
                      <option>social</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-white/80 text-sm">Description</label>
                  <textarea 
                    placeholder="Describe your space..."
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 p-3 rounded-lg h-24 resize-none"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-white/80">
                    <input type="checkbox" className="rounded" />
                    Public Space
                  </label>
                  <label className="flex items-center gap-2 text-white/80">
                    <input type="checkbox" className="rounded" />
                    Allow Guests
                  </label>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Space
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{spaces.length}</div>
              <div className="text-white/60 text-sm">Active Spaces</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">2.8K</div>
              <div className="text-white/60 text-sm">Total Members</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">15.2K</div>
              <div className="text-white/60 text-sm">Messages Today</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">89</div>
              <div className="text-white/60 text-sm">Events This Week</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
