import React, { useState } from 'react';
import { ytmusicService } from '../services/ytmusicService';

interface YouTubeMusicAuthProps {
  onAuthenticated: (cookie: string) => void;
  isAuthenticated: boolean;
}

export const YouTubeMusicAuth: React.FC<YouTubeMusicAuthProps> = ({
  onAuthenticated,
  isAuthenticated,
}) => {
  const [cookie, setCookie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleAuthenticate = async () => {
    if (!cookie.trim()) {
      setError('Please enter your YouTube Music cookie');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await ytmusicService.authenticate(cookie.trim());

      if (result.success) {
        onAuthenticated(cookie.trim());
        setCookie(''); // Clear the input for security
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Authentication failed. Please check your cookie and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick test with provided cookie
  const handleQuickTest = () => {
    const testCookie =
      '15.YT=SQ8ZinnDYxYeZW3Axo9TxXv4GZ5-TG2ERh4QAd0j2dhGGfkyesHv9roTNjeHXBH5y_Dznw051gOSLXauWnP7ZrHZ7Ey_wXw6n6LZCDxCejwHmmPI5nRxn5A5dY_Io46ePbKw2Li1UClc8gKQZs5YZfD-QT8WMmCsVlFX0WPWotVn_n8zMei4dEP-UfTSFGogBvaprEethYuzQPjhvykPc3mWKrQYDaZq-SnZ_vQqyRmcgBF6MuZ-zI84iC5XNEe-0Am5tUhTjDAHOB6542YFv9PCwVRQR-OF-_BtxPQdDN62LZS_gXnbHSzm1-Dv6gkM8eaNjRcnwSiShJnbRUjo8g';
    setCookie(testCookie);
    handleAuthenticate();
  };

  if (isAuthenticated) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <h4 className="text-green-400 font-medium">Connected to YouTube Music</h4>
            <p className="text-green-300/60 text-sm">
              You can now search and play real YouTube Music tracks
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/4 border border-white/8 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-2">Connect YouTube Music</h3>
        <p className="text-white/60 text-sm">
          Enter your YouTube Music cookie to enable real music search and playback
        </p>
      </div>

      {/* Cookie Input */}
      <div className="mb-4">
        <label className="block text-white/80 text-sm font-medium mb-2">YouTube Music Cookie</label>
        <textarea
          value={cookie}
          onChange={e => setCookie(e.target.value)}
          placeholder="Paste your YouTube Music cookie here..."
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-500 focus:bg-white/15 resize-none"
          rows={4}
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {/* Instructions Toggle */}
      <button
        onClick={() => setShowInstructions(!showInstructions)}
        className="text-red-400 hover:text-red-300 text-sm underline mb-4"
      >
        {showInstructions ? 'Hide' : 'Show'} instructions
      </button>

      {/* Instructions */}
      {showInstructions && (
        <div className="bg-white/5 rounded-lg p-4 mb-4 text-sm text-white/70">
          <h4 className="font-medium text-white mb-2">How to get your YouTube Music cookie:</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open music.youtube.com in your browser</li>
            <li>Sign in to your YouTube Music account</li>
            <li>Open Developer Tools (F12)</li>
            <li>Go to the Application/Storage tab</li>
            <li>Find Cookies → https://music.youtube.com</li>
            <li>Copy all cookie values as a single string</li>
            <li>Paste the complete cookie string above</li>
          </ol>
          <p className="mt-2 text-yellow-400">
            ⚠️ Keep your cookie private and never share it with others
          </p>
        </div>
      )}

      {/* Authenticate Button */}
      <div className="space-y-3">
        <button
          onClick={handleAuthenticate}
          disabled={isLoading || !cookie.trim()}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? 'Authenticating...' : 'Connect to YouTube Music'}
        </button>

        {/* Quick Test Button */}
        <button
          onClick={handleQuickTest}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          🚀 Quick Test with Provided Cookie
        </button>
      </div>
    </div>
  );
};
