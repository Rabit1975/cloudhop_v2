import React from 'react';

const Billing: React.FC = () => {
  const currentPlan = {
    name: 'Free',
    price: '$0/month',
  };

  const availablePlans = [
    {
      name: 'Free',
      price: '$0/month',
      features: [
        'Unlimited messaging',
        'Unlimited 1:1 chats',
        'Up to 45-minute meetings',
        '1 Hop Space',
        '720p video',
      ],
    },
    {
      name: 'Plus',
      price: '$5.99/month',
      features: [
        'Everything in Free, plus',
        'Unlimited meeting length',
        'Up to 1080p HD video',
        '5 Hop Spaces',
      ],
    },
    {
      name: 'Pro',
      price: '$14.99/month',
      popular: true,
      features: ['Everything in Plus, plus', 'Unlimited Hop Spaces', 'Full AI assistant'],
    },
    {
      name: 'Teams',
      price: '$8.99/user/month (min 3 users)',
      features: [
        'Everything in Pro, plus',
        'Admin dashboard',
        'Team spaces (shared)',
        'Meeting recording transcripts',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Teams, plus',
        'SSO (SAML, Google, Azure AD)',
        'Dedicated success manager',
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Billing</h2>
        <p className="text-white/60">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="bg-[#0a0d1f] border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Current Plan</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold mb-1">{currentPlan.name}</div>
            <div className="text-white/60">{currentPlan.price}</div>
          </div>
          <button
            onClick={() => {
              // TODO: Implement upgrade functionality
              console.log('Upgrade clicked');
              alert('Upgrade functionality will be connected to payment processing');
            }}
            className="bg-[#53C8FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4AB8FF] transition-colors"
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availablePlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-[#0a0d1f] border rounded-xl p-6 relative ${
                plan.popular ? 'border-[#53C8FF] shadow-lg shadow-[#53C8FF]/20' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#53C8FF] text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                <div className="text-2xl font-semibold text-[#53C8FF] mb-4">{plan.price}</div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-[#53C8FF] shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  // TODO: Implement plan upgrade functionality
                  console.log(`Upgrade to ${plan.name} clicked`);
                  alert(`${plan.name} plan upgrade will be connected to payment processing`);
                }}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.name === 'Free' && currentPlan.name === 'Free'
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : plan.popular
                      ? 'bg-[#53C8FF] text-white hover:bg-[#4AB8FF]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                disabled={plan.name === 'Free' && currentPlan.name === 'Free'}
              >
                {plan.name === 'Free' && currentPlan.name === 'Free' ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;
