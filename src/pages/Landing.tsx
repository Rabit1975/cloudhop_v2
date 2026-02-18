import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Zap,
  Shield,
  Globe,
  Video,
  MessageSquare,
  Gamepad2,
  Music,
  Brain,
  Cloud,
  Users,
  ChevronDown,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoSplash from '../assets/logo-splash.png';
import logo3d from '../assets/logo-3d-rabbit.png';
import nebulaBg from '../assets/nebula3.jpg';

const FEATURES = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'HopHub Chat',
    desc: 'Real-time messaging with channels, DMs, file sharing, and gifts',
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'HopMeetings',
    desc: 'HD video calls with whiteboard, polls, breakout rooms, and reactions',
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: 'GameHub',
    desc: '500+ HTML5 games — arcade, puzzles, strategy, and multiplayer',
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: 'Music',
    desc: 'Integrated YouTube Music player with playlists and video support',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Hop Spaces',
    desc: 'Creative personal spaces with AI-powered RabbitAI companion',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Tools',
    desc: 'Summarizer, translator, sentiment analysis, and smart automation',
  },
];

interface Plan {
  name: string;
  price: string;
  period: string;
  badge?: string;
  color: string;
  borderColor: string;
  features: string[];
  bestFor: string;
  cta: string;
}

const PLANS: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    color: 'from-gray-500/20 to-gray-600/20',
    borderColor: 'border-gray-400/30 hover:border-gray-400/60',
    cta: 'Get Started Free',
    bestFor: 'Casual users, friends, small study groups',
    features: [
      'Unlimited messaging & 1:1 chats',
      'Up to 45-minute meetings',
      '1 Hop Space',
      '720p video & basic screen sharing',
      '5 AI actions/day (summarizer, translator, tone rewriter)',
      '1GB cloud storage',
      'Join unlimited communities',
      'Mobile + desktop apps',
      'Custom emoji & reactions',
    ],
  },
  {
    name: 'Plus',
    price: '$5.99',
    period: '/month',
    color: 'from-cyan-500/20 to-cyan-600/20',
    borderColor: 'border-cyan-400/30 hover:border-cyan-400/60',
    cta: 'Upgrade to Plus',
    bestFor: 'Students, creators, small teams, gaming groups',
    features: [
      'Everything in Free, plus:',
      'Unlimited meeting length',
      'Up to 1080p HD video',
      '5 Hop Spaces',
      'Unlimited translations',
      '300 AI actions/month',
      'Advanced AI summaries (long-form)',
      'Unlimited message history',
      '25GB cloud storage',
      'Group permissions & roles',
      'Priority customer support',
    ],
  },
  {
    name: 'Pro',
    price: '$14.99',
    period: '/month',
    badge: 'Most Popular',
    color: 'from-magenta-500/20 to-purple-600/20',
    borderColor: 'border-magenta-400/30 hover:border-magenta-400/60',
    cta: 'Go Pro',
    bestFor: 'Freelancers, creators, influencers, active communities',
    features: [
      'Everything in Plus, plus:',
      'Unlimited Hop Spaces',
      'AI meeting notes & action-item extraction',
      'Sentiment analysis & message rewrite styles',
      'Real-time meeting translation',
      '4K video support (bandwidth-based)',
      'Multi-window & high frame-rate screen share',
      '100GB cloud storage',
      'Custom branding (logo + colors)',
      'Community analytics',
      'Channel automations (AI-powered)',
      'API & integrations access',
    ],
  },
  {
    name: 'Teams',
    price: '$8.99',
    period: '/user/month',
    color: 'from-cyan-500/20 to-magenta-500/20',
    borderColor: 'border-cyan-400/30 hover:border-cyan-400/60',
    cta: 'Start Team Trial',
    bestFor: 'Businesses, startups, organizations',
    features: [
      'Everything in Pro, plus:',
      'Admin dashboard',
      'Team spaces (shared)',
      'Meeting recording & transcripts',
      'Unlimited storage per team',
      'Compliance mode',
      'User provisioning',
      'Priority email + chat support',
      'Internal-only communities',
    ],
  },
];

const ENTERPRISE_FEATURES = [
  'SSO (SAML, Google Workspace, Azure AD)',
  'Dedicated success manager',
  '99.99% uptime SLA',
  'Compliance: HIPAA, SOC2, GDPR',
  'Custom AI model integrations',
  'Data retention policies',
  'Custom API limits',
  'On-prem or hybrid hosting',
  'Training & onboarding programs',
];

const ADDONS = [
  {
    title: 'AI Credit Packs',
    items: [
      '1,000 AI actions → $4.99',
      '5,000 AI actions → $19.99',
      '25,000 AI actions → $79.99',
    ],
    note: 'For Pro, Teams & Enterprise',
  },
  {
    title: 'Cloud Storage',
    items: ['+100GB → $2/month', '+1TB → $9/month'],
    note: 'Any plan',
  },
  {
    title: 'Extra Hop Spaces',
    items: ['5 additional spaces → $3/month'],
    note: 'Plus users only',
  },
  {
    title: 'Meeting Recording Storage',
    items: ['$0.01/minute stored'],
    note: 'Teams & Enterprise',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [billingAnnual, setBillingAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <img
          src={nebulaBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background pointer-events-none" />

        <div className="relative z-10">
          {/* Nav */}
          <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <img
                src={logoSplash}
                alt="CloudHop"
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400">
                CloudHop
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
              <a
                href="#features"
                className="hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <a
                href="#addons"
                className="hover:text-foreground transition-colors"
              >
                Add-Ons
              </a>
            </div>
            <button
              onClick={() => navigate('/app')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-sm hover:opacity-90 transition-all"
            >
              Open App
            </button>
          </nav>

          {/* Hero content */}
          <div className="max-w-5xl mx-auto text-center px-6 pt-20 pb-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-sm font-semibold mb-8">
              <Zap className="w-4 h-4" /> The all-in-one creative platform
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400">
                Hop In,
              </span>
              <br />
              <span className="text-foreground">Cloud On</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Meetings, messaging, gaming, music, AI tools, and creative spaces
              — all in one cosmic platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/app')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#pricing"
                className="px-8 py-4 rounded-xl glass-panel border-cyan-400/30 hover:border-cyan-400/60 text-foreground font-bold text-lg transition-all"
              >
                View Pricing
              </a>
            </div>
            <img
              src={logo3d}
              alt="CloudHop Rabbit"
              className="mx-auto mt-16 w-40 h-40 object-contain drop-shadow-2xl animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg">
            One platform. Infinite possibilities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="glass-panel rounded-xl p-8 border-cyan-400/20 hover:border-cyan-400/50 transition-all group"
            >
              <div className="p-3 rounded-lg bg-cyan-500/20 w-fit mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-24">
        <img
          src={nebulaBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        <div className="absolute inset-0 bg-background/80 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-4">
              Simple, Flexible Pricing
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              From free forever to enterprise scale
            </p>
            <div className="inline-flex items-center gap-3 glass-panel rounded-full px-2 py-1.5 border-cyan-400/30">
              <button
                onClick={() => setBillingAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!billingAnnual ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50' : 'text-muted-foreground'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${billingAnnual ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50' : 'text-muted-foreground'}`}
              >
                Annual{' '}
                <span className="text-xs text-green-400 ml-1">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`glass-panel rounded-2xl p-6 border ${plan.borderColor} transition-all relative flex flex-col`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-magenta-500 to-magenta-400 text-white text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" /> {plan.badge}
                  </div>
                )}
                <div
                  className={`rounded-xl p-4 bg-gradient-to-br ${plan.color} mb-4`}
                >
                  <h3 className="text-lg font-bold text-foreground">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black text-foreground">
                      {billingAnnual && plan.name === 'Plus'
                        ? '$4.92'
                        : billingAnnual && plan.name === 'Pro'
                          ? '$12.42'
                          : plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Best for: {plan.bestFor}
                </p>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      {f.startsWith('Everything') ? (
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-sm hover:opacity-90 transition-all">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="glass-panel rounded-2xl p-8 border border-magenta-400/30 hover:border-magenta-400/60 transition-all">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-8 h-8 text-magenta-400" />
                  <h3 className="text-2xl font-black text-foreground">
                    Enterprise
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    Custom pricing
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-2xl">
                  Everything in Teams, plus enterprise-grade security,
                  compliance, and dedicated support for organizations that need
                  scale.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {ENTERPRISE_FEATURES.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-3.5 h-3.5 text-magenta-400 flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-magenta-500 to-magenta-400 text-white font-bold hover:opacity-90 transition-all whitespace-nowrap flex-shrink-0">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section id="addons" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-4">
            Add-Ons
          </h2>
          <p className="text-muted-foreground text-lg">
            Extend your plan with extra power
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADDONS.map((addon) => (
            <div
              key={addon.title}
              className="glass-panel rounded-xl p-6 border-cyan-400/20 hover:border-cyan-400/50 transition-all"
            >
              <h3 className="text-lg font-bold text-foreground mb-1">
                {addon.title}
              </h3>
              <p className="text-xs text-cyan-400 font-semibold mb-4">
                {addon.note}
              </p>
              <ul className="space-y-2">
                {addon.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Cloud className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <img
          src={nebulaBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background pointer-events-none" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-6">
            Ready to Hop In?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of creators, gamers, and teams on CloudHop.
          </p>
          <button
            onClick={() => navigate('/app')}
            className="px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-xl hover:opacity-90 transition-all shadow-xl shadow-cyan-500/30 flex items-center gap-3 mx-auto"
          >
            Get Started Free <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logoSplash}
              alt="CloudHop"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="font-bold text-foreground">CloudHop</span>
            <span className="text-xs text-muted-foreground">© 2026</span>
          </div>
          <p className="text-sm text-muted-foreground">Hop In, Cloud On ☁️</p>
        </div>
      </footer>
    </div>
  );
}
