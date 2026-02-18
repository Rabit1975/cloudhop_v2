import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import logoSplash from '../assets/logo-splash.png';
import nebulaBg from '../assets/Nebula4.png';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Already logged in? Go straight to app
  if (localStorage.getItem('cloudhop_authenticated') === 'true') {
    navigate('/app');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('cloudhop_user', username);
      localStorage.setItem('cloudhop_authenticated', 'true');
      navigate('/app');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen text-foreground overflow-hidden relative">
      {/* Nebula background - fixed layer */}
      <div
        className="fixed inset-0 z-0"
        style={{ backgroundImage: `url(${nebulaBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="fixed inset-0 z-0 bg-black/30" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl p-8 border border-cyan-400/30 bg-black/60 backdrop-blur-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img
                  src={logoSplash}
                  alt="CloudHop"
                  className="w-12 h-12 rounded-xl object-contain"
                />
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400">
                  CloudHop
                </span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to access your creative workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-400/30 rounded-lg text-foreground placeholder-muted-foreground outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-cyan-400/30 rounded-lg text-foreground placeholder-muted-foreground outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !username.trim() || !password.trim()}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-5 h-5" />
                )}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/30">
              <p className="text-xs text-cyan-300 text-center">
                <strong>Demo Mode:</strong> Enter any username and password to access the application
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
