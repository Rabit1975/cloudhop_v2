export class YouTubeOAuthService {
  private apiKey: string
  private clientId: string
  private accessToken: string | null = null

  constructor(apiKey: string, clientId: string) {
    this.apiKey = apiKey
    this.clientId = clientId
  }

  // Initialize OAuth flow
  async authenticate(): Promise<void> {
    const redirectUri = `${window.location.origin}/youtube-callback`
    const scope = 'https://www.googleapis.com/auth/youtube.readonly'
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', this.clientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'token')
    authUrl.searchParams.set('scope', scope)
    authUrl.searchParams.set('include_granted_scopes', 'true')
    
    // Open popup for authentication
    const popup = window.open(
      authUrl.toString(),
      'youtube-auth',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    )
    
    return new Promise((resolve, reject) => {
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          reject(new Error('Authentication cancelled'))
        }
      }, 1000)
      
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return
        
        if (event.data.type === 'youtube-auth-success') {
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
          this.accessToken = event.data.accessToken
          popup?.close()
          resolve()
        } else if (event.data.type === 'youtube-auth-error') {
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
          popup?.close()
          reject(new Error(event.data.error))
        }
      }
      
      window.addEventListener('message', messageHandler)
    })
  }

  // Get user's playlists
  async getPlaylists(): Promise<any[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated')
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch playlists: ${response.statusText}`)
    }

    const data = await response.json()
    return data.items || []
  }

  // Get user's liked videos
  async getLikedVideos(): Promise<any[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated')
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&myRating=like&maxResults=50`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch liked videos: ${response.statusText}`)
    }

    const data = await response.json()
    return data.items || []
  }

  // Search YouTube (public API)
  async search(query: string): Promise<any[]> {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=25&key=${this.apiKey}`
    )

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.items || []
  }

  isAuthenticated(): boolean {
    return this.accessToken !== null
  }

  getAccessToken(): string | null {
    return this.accessToken
  }
}
