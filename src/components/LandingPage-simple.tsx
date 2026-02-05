import React from 'react';
import highresolutionmasterlogo1 from '../assets/highresolutionmasterlogo1.svg';
import highresolutionmastermainlogo from '../assets/highresolutionmastermainlogo.svg';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPageSimple: React.FC<LandingPageProps> = ({ onStart }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        backgroundColor: '#050819',
        height: '100vh',
        width: '100%',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '80px',
          backgroundColor: 'rgba(5, 8, 25, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          zIndex: 50,
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src={highresolutionmasterlogo1}
            alt="CloudHop"
            width="40"
            height="40"
            style={{
              objectFit: 'contain',
            }}
          />
          <span
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CloudHop
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <button
            onClick={() => scrollToSection('features')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Pricing
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Download
          </button>
        </div>

        <button
          onClick={onStart}
          style={{
            background: '#53C8FF',
            color: '#000',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = '#4AB8FF';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = '#53C8FF';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          position: 'relative',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '1200px',
            width: '100%',
          }}
        >
          {/* Main Logo */}
          <div
            style={{
              marginBottom: '40px',
            }}
          >
            <img
              src={highresolutionmastermainlogo}
              alt="CloudHop"
              width="120"
              height="120"
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 40px rgba(83, 200, 255, 0.4))',
              }}
            />
          </div>

          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px',
              lineHeight: '1.1',
              background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hop in, Cloud on.
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '48px',
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto 48px',
            }}
          >
            CloudHop is the next generation platform that brings together meetings, messaging, AI
            tools, gaming, and much more, all in one beautiful, simple cloud.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={onStart}
              style={{
                background: '#53C8FF',
                color: '#000',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#4AB8FF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(83, 200, 255, 0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#53C8FF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Start Free Trial
            </button>

            <button
              onClick={() => scrollToSection('features')}
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid #53C8FF',
                padding: '14px 30px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'rgba(83, 200, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        style={{
          minHeight: '100vh',
          padding: '120px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
            }}
          >
            Everything You Need in One Place
          </h2>

          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '64px',
              maxWidth: '600px',
              margin: '0 auto 64px',
            }}
          >
            From video meetings to gaming sessions, CloudHop integrates all your digital activities
            seamlessly.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            <div
              style={{
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'left',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '28px',
                  color: '#000',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#53C8FF',
                  marginBottom: '12px',
                }}
              >
                Video Meetings
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                }}
              >
                High-quality video calls with screen sharing, recording, and collaborative tools for
                professional meetings.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'left',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '28px',
                  color: '#000',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#53C8FF',
                  marginBottom: '12px',
                }}
              >
                Instant Messaging
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                }}
              >
                Real-time chat with channels, groups, and advanced messaging features for seamless
                communication.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'left',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '28px',
                  color: '#000',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M6 12h4" />
                  <path d="M14 12h4" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#53C8FF',
                  marginBottom: '12px',
                }}
              >
                Gaming Hub
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                }}
              >
                Integrated gaming platform with your favorite titles and social features for
                entertainment.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'left',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '28px',
                  color: '#000',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M20.46 20.46l-4.24-4.24M1.54 20.46l4.24-4.24" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#53C8FF',
                  marginBottom: '12px',
                }}
              >
                AI Tools
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                }}
              >
                Advanced AI-powered tools and assistants to enhance your productivity and workflow.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'left',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '28px',
                  color: '#000',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#53C8FF',
                  marginBottom: '12px',
                }}
              >
                Music Streaming
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                }}
              >
                Integrated music streaming service with playlists and social listening features.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'left',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '28px',
                  color: '#000',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#53C8FF',
                  marginBottom: '12px',
                }}
              >
                Cloud Storage
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                }}
              >
                Secure cloud storage with file sharing and collaboration features for your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        style={{
          minHeight: '100vh',
          padding: '120px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
            }}
          >
            Choose Your Plan
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              marginTop: '64px',
            }}
          >
            <div
              style={{
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px',
                }}
              >
                Free
              </h3>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#53C8FF',
                  marginBottom: '32px',
                }}
              >
                $0
                <span
                  style={{
                    fontSize: '18px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 'normal',
                  }}
                >
                  /month
                </span>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  marginBottom: '32px',
                  textAlign: 'left',
                }}
              >
                <li style={{ marginBottom: '12px' }}>✓ Basic video calls</li>
                <li style={{ marginBottom: '12px' }}>✓ 1GB cloud storage</li>
                <li style={{ marginBottom: '12px' }}>✓ Standard messaging</li>
              </ul>
              <button
                onClick={onStart}
                style={{
                  background: 'transparent',
                  color: '#53C8FF',
                  border: '2px solid #53C8FF',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(83, 200, 255, 0.1)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Get Started
              </button>
            </div>

            <div
              style={{
                background: 'rgba(83, 200, 255, 0.1)',
                border: '2px solid #53C8FF',
                borderRadius: '16px',
                padding: '32px',
                backdropFilter: 'blur(10px)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#53C8FF',
                  color: '#000',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                POPULAR
              </div>
              <h3
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px',
                }}
              >
                Pro
              </h3>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#53C8FF',
                  marginBottom: '32px',
                }}
              >
                $19
                <span
                  style={{
                    fontSize: '18px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 'normal',
                  }}
                >
                  /month
                </span>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  marginBottom: '32px',
                  textAlign: 'left',
                }}
              >
                <li style={{ marginBottom: '12px' }}>✓ HD video calls</li>
                <li style={{ marginBottom: '12px' }}>✓ 100GB cloud storage</li>
                <li style={{ marginBottom: '12px' }}>✓ Advanced messaging</li>
                <li style={{ marginBottom: '12px' }}>✓ Gaming access</li>
              </ul>
              <button
                onClick={onStart}
                style={{
                  background: '#53C8FF',
                  color: '#000',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = '#4AB8FF';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = '#53C8FF';
                }}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageSimple;
