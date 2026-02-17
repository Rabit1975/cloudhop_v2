import React, { useState } from 'react';

interface AuthProps {
  onAuthSuccess: () => void;
}

const AuthEnhanced: React.FC<AuthProps> = ({ onAuthSuccess }) => {
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
      // Mock authentication for now
      if (email && password) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        onAuthSuccess();
      } else {
        setError('Please enter email and password');
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: '#050819',
      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(83, 200, 255, 0.1) 0%, transparent 50%)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '480px'
      }}>
        {/* CloudHop Logo */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '32px',
            color: '#000',
            boxShadow: '0 8px 40px rgba(83, 200, 255, 0.3)',
            margin: '0 auto'
          }}>
            CH
          </div>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '32px',
          background: 'rgba(14, 20, 48, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(12px)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '24px',
            color: 'white',
            background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {isSignUp ? 'Join CloudHop' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                style={{
                  width: '100%',
                  background: '#050819',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                placeholder="Email address"
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#53C8FF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(83, 200, 255, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: '#050819',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                placeholder="Password"
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#53C8FF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(83, 200, 255, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px',
                background: 'rgba(255, 107, 107, 0.1)',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                borderRadius: '8px',
                color: '#FF6B6B',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? 'rgba(83, 200, 255, 0.5)' : 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(83, 200, 255, 0.3)'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(83, 200, 255, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(83, 200, 255, 0.3)';
                }
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #000',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Processing...
                </span>
              ) : (
                isSignUp ? 'Sign Up' : 'Sign In'
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#53C8FF';
                e.currentTarget.style.backgroundColor = 'rgba(83, 200, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
          from { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default AuthEnhanced;
