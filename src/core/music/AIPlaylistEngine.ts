import { Playlist } from './types'

interface PlaylistContext {
  mood?: string
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'
  spaceType?: string
  activity?: string
  userPreferences?: {
    genres?: string[]
    artists?: string[]
    recentListening?: string[]
  }
}

export async function generatePlaylist(context: PlaylistContext): Promise<Playlist> {
  // Use rabbit.ai to generate context-aware playlist
  const rabbitAI = (window as any).rabbitAI

  if (!rabbitAI) {
    console.warn('rabbit.ai not available, using default playlist')
    return getDefaultPlaylist(context)
  }

  try {
    const prompt = buildPlaylistPrompt(context)
    const response = await rabbitAI.chat([
      {
        role: 'user',
        content: prompt
      }
    ])

    const playlist = JSON.parse(response)
    return {
      id: playlist.playlistId,
      title: playlist.title,
      description: playlist.description,
      tracks: playlist.tracks || []
    }
  } catch (error) {
    console.error('AI playlist generation failed:', error)
    return getDefaultPlaylist(context)
  }
}

function buildPlaylistPrompt(context: PlaylistContext): string {
  return `Generate a YouTube Music playlist for the following context:

Mood: ${context.mood || 'neutral'}
Time of Day: ${context.timeOfDay || 'anytime'}
Space Type: ${context.spaceType || 'general'}
Activity: ${context.activity || 'listening'}
User Preferences: ${JSON.stringify(context.userPreferences || {})}

Return a JSON object with this structure:
{
  "playlistId": "YouTube playlist ID",
  "title": "Playlist title",
  "description": "Playlist description",
  "tracks": [
    {
      "id": "YouTube video ID",
      "title": "Track title",
      "artist": "Artist name",
      "duration": duration_in_seconds,
      "thumbnail": "thumbnail URL"
    }
  ]
}

The playlist should:
1. Match the mood and activity
2. Be appropriate for the time of day
3. Fit the space environment
4. Consider user preferences
5. Include 10-15 tracks
6. Have good flow and transitions`
}

function getDefaultPlaylist(context: PlaylistContext): Playlist {
  // Fallback playlists based on context
  const defaultPlaylists: Record<string, Playlist> = {
    focus: {
      id: 'PLxxxxxx',
      title: 'Focus Flow',
      description: 'Ambient music for deep work',
      tracks: []
    },
    chill: {
      id: 'PLyyyyyy',
      title: 'Chill Vibes',
      description: 'Lo-fi beats to relax',
      tracks: []
    },
    energetic: {
      id: 'PLzzzzzz',
      title: 'Energy Boost',
      description: 'Upbeat tracks for productivity',
      tracks: []
    },
    ambient: {
      id: 'PLaaaaaa',
      title: 'Ambient Soundscapes',
      description: 'Atmospheric music for background',
      tracks: []
    }
  }

  const mood = context.mood || 'ambient'
  return defaultPlaylists[mood] || defaultPlaylists.ambient
}

export async function suggestPlaylistForSpace(spaceType: string): Promise<Playlist> {
  return generatePlaylist({
    spaceType,
    activity: 'exploring',
    mood: spaceType === 'lounge' ? 'chill' : 'ambient'
  })
}

export async function suggestPlaylistForActivity(
  activity: string,
  timeOfDay?: string
): Promise<Playlist> {
  return generatePlaylist({
    activity,
    timeOfDay: timeOfDay as any,
    mood: activity === 'coding' ? 'focus' : 'chill'
  })
}
