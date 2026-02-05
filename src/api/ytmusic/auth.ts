// YouTube Music Authentication Handler
// This handles YouTube Music cookie authentication

interface AuthRequest {
  cookie: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  isAuthenticated: boolean;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cookie }: AuthRequest = req.body;

    if (!cookie) {
      return res.status(400).json({
        success: false,
        message: 'Cookie is required',
        isAuthenticated: false,
      });
    }

    // Validate cookie format (basic check)
    if (!cookie.includes('__Secure-3PAPISID') && !cookie.includes('SAPISID')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cookie format. Please ensure you have the complete YouTube Music cookie.',
        isAuthenticated: false,
      });
    }

    // Test the cookie by making a request to YouTube Music
    const testResponse = await fetch(
      'https://music.youtube.com/youtubei/v1/browse?prettyPrint=false',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
          'X-Goog-Authuser': '0',
          'X-YouTube-Client-Name': '67',
          'X-YouTube-Client-Version': '1.20260128.03.00',
        },
        body: JSON.stringify({
          context: {
            client: {
              clientName: 'WEB_REMIX',
              clientVersion: '1.20260128.03.00',
              hl: 'en',
              gl: 'US',
            },
          },
          browseId: 'FEmusic_library_landing',
        }),
      }
    );

    if (testResponse.ok) {
      const data = await testResponse.json();

      // Check if we got valid data back
      if (data.contents) {
        return res.status(200).json({
          success: true,
          message: 'Successfully authenticated with YouTube Music',
          isAuthenticated: true,
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Please check your cookie and try again.',
      isAuthenticated: false,
    });
  } catch (error) {
    console.error('YouTube Music auth error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication',
      isAuthenticated: false,
    });
  }
}
