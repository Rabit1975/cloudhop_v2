import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function YouTubeCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle OAuth callback
    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    
    const accessToken = params.get('access_token')
    const error = params.get('error')
    
    if (error) {
      window.opener?.postMessage({
        type: 'youtube-auth-error',
        error: error
      }, window.location.origin)
    } else if (accessToken) {
      window.opener?.postMessage({
        type: 'youtube-auth-success',
        accessToken: accessToken
      }, window.location.origin)
    }
    
    window.close()
  }, [navigate])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Authentication Complete</h2>
      <p>You can close this window.</p>
    </div>
  )
}
