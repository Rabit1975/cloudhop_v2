import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { CloudHopLogo } from '../constants';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onAuthSuccess();
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center">
        {/* CloudHop Logo */}
        <div className="mb-6">
          <CloudHopLogo size={64} variant="neon" className="mx-auto" />
        </div>

        <div className="w-full max-w-xs p-4 bg-[#0E1430] rounded-xl border border-white/5 shadow-xl">
          <h2 className="text-lg font-bold text-center mb-4 text-white">
            {isSignUp ? 'Join CloudHop' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                className="w-full bg-[#050819] border border-white/10 rounded-lg p-2 text-white text-sm focus:border-[#53C8FF] outline-none"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#050819] border border-white/10 rounded-lg p-2 text-white text-sm focus:border-[#53C8FF] outline-none"
                placeholder="Password"
                required
              />
            </div>

            {error && (
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#53C8FF] text-[#0A0F1F] rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
              }}
              className="text-xs text-white/40 hover:text-[#53C8FF] transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
