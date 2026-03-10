# CloudHop Subscription Backend API Setup Guide

## Prerequisites
- Node.js 20+
- npm or yarn
- Supabase account with project created
- Stripe account (free tier is fine for testing)

---

## Step 1: Install Backend Dependencies

```bash
npm install express cors dotenv axios @supabase/supabase-js stripe
npm install -D @types/express @types/node typescript ts-node
```

---

## Step 2: Create Backend Server Structure

```bash
mkdir -p src/server
mkdir -p src/server/routes
mkdir -p src/server/middleware
mkdir -p src/server/utils
mkdir -p src/server/webhooks
```

---

## Step 3: Create Server Configuration

**Create `src/server/config.ts`:**

```typescript
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const config = {
  PORT: process.env.PORT || 3001,
  SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.VITE_STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Validate required config
const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'STRIPE_SECRET_KEY'];
for (const key of required) {
  if (!config[key as keyof typeof config]) {
    console.warn(`⚠️  Missing ${key} in .env.local`);
  }
}
```

---

## Step 4: Create Supabase Client

**Create `src/server/utils/supabase.ts`:**

```typescript
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

const supabaseUrl = config.SUPABASE_URL!;
const supabaseKey = config.SUPABASE_SERVICE_KEY || config.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Get user subscription
export async function getUserSubscription(userId: string) {
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Get user usage
export async function getUserUsage(userId: string) {
  const subscription = await getUserSubscription(userId);
  
  const { data: plans } = await supabase
    .from('plans')
    .select('*')
    .eq('id', subscription.tier)
    .single();

  return {
    tier: subscription.tier,
    storage: {
      used: subscription.storage_used_mb,
      limit: plans?.storage_gb ? plans.storage_gb * 1024 : null,
      percentage: plans?.storage_gb 
        ? (subscription.storage_used_mb / (plans.storage_gb * 1024)) * 100 
        : 0,
    },
    ai_actions: {
      used: subscription.ai_actions_used,
      limit: {
        daily: subscription.tier === 'free' ? 5 : undefined,
        monthly: plans?.ai_actions_monthly || undefined,
      },
    },
    meeting_minutes: {
      limit: plans?.max_meeting_minutes || null,
    },
    hop_spaces: {
      limit: subscription.tier === 'free' ? 1 : subscription.tier === 'plus' ? 5 : null,
    },
  };
}

// Log usage
export async function logUsage(
  userId: string,
  action: string,
  amount: number,
  metadata?: any
) {
  const { error } = await supabase
    .from('usage_logs')
    .insert({
      user_id: userId,
      action_type: action,
      amount,
      metadata,
    });

  if (error) throw error;
}

// Update subscription tier
export async function updateSubscriptionTier(userId: string, tier: string) {
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      tier,
      tier_updated_at: new Date(),
      ai_actions_used: 0,
    })
    .eq('id', userId);

  if (error) throw error;
}

// Add to storage used
export async function addStorageUsed(userId: string, amount: number) {
  const subscription = await getUserSubscription(userId);
  
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      storage_used_mb: subscription.storage_used_mb + amount,
    })
    .eq('id', userId);

  if (error) throw error;
}

// Increment AI actions
export async function incrementAIActions(userId: string) {
  const subscription = await getUserSubscription(userId);
  
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      ai_actions_used: subscription.ai_actions_used + 1,
    })
    .eq('id', userId);

  if (error) throw error;
}
```

---

## Step 5: Create Authentication Middleware

**Create `src/server/middleware/auth.ts`:**

```typescript
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../utils/supabase';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = {
      id: user.id,
      email: user.email || '',
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
```

---

## Step 6: Create Subscription Routes

**Create `src/server/routes/subscription.ts`:**

```typescript
import { Router } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { 
  getUserSubscription, 
  getUserUsage, 
  logUsage,
  addStorageUsed,
  incrementAIActions,
} from '../utils/supabase';

const router = Router();

// Get user subscription
router.get('/subscription', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const subscription = await getUserSubscription(req.user!.id);
    res.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

// Get user usage
router.get('/usage', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const usage = await getUserUsage(req.user!.id);
    res.json(usage);
  } catch (error) {
    console.error('Error fetching usage:', error);
    res.status(500).json({ error: 'Failed to fetch usage' });
  }
});

// Check limit before action
router.post('/check-limit', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { action, amount = 1 } = req.body;
    const usage = await getUserUsage(req.user!.id);

    let allowed = true;
    let reason = '';

    if (action === 'storage') {
      if (usage.storage.limit && usage.storage.used + amount > usage.storage.limit) {
        allowed = false;
        reason = `Storage limit would be exceeded. You have ${usage.storage.limit}MB, using ${usage.storage.used + amount}MB.`;
      }
    } else if (action === 'ai_action') {
      if (usage.ai_actions.limit.monthly && usage.ai_actions.used + amount > usage.ai_actions.limit.monthly) {
        allowed = false;
        reason = `AI action limit exceeded this month. Used ${usage.ai_actions.used}/${usage.ai_actions.limit.monthly}.`;
      }
    } else if (action === 'meeting') {
      if (usage.meeting_minutes.limit && amount > usage.meeting_minutes.limit) {
        allowed = false;
        reason = `Meeting duration limited to ${usage.meeting_minutes.limit} minutes on your tier.`;
      }
    }

    res.json({ allowed, reason, usage });
  } catch (error) {
    console.error('Error checking limit:', error);
    res.status(500).json({ error: 'Failed to check limit' });
  }
});

// Log usage
router.post('/log-usage', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { action, amount, metadata } = req.body;

    // Log the usage
    await logUsage(req.user!.id, action, amount, metadata);

    // Update specific counters
    if (action === 'storage_used') {
      await addStorageUsed(req.user!.id, amount);
    } else if (action === 'ai_action') {
      await incrementAIActions(req.user!.id);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error logging usage:', error);
    res.status(500).json({ error: 'Failed to log usage' });
  }
});

// Get usage history
router.get('/usage-history', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;

    const { data: history, error } = await supabase
      .from('usage_logs')
      .select('*')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get plans
router.get('/plans', async (req, res) => {
  try {
    const { data: plans, error } = await supabase
      .from('plans')
      .select('*')
      .order('id');

    if (error) throw error;

    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

export default router;
```

---

## Step 7: Create Stripe Routes

**Create `src/server/routes/payments.ts`:**

```typescript
import { Router } from 'express';
import Stripe from 'stripe';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { getUserSubscription, updateSubscriptionTier } from '../utils/supabase';
import { config } from '../config';

const router = Router();
const stripe = new Stripe(config.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-20' });

const PRICE_TO_TIER: Record<string, string> = {
  // Set these after creating prices in Stripe
  'price_plus': 'plus',
  'price_pro': 'pro',
  'price_teams': 'teams',
};

// Create checkout session
router.post('/create-checkout', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { planId } = req.body;
    const subscription = await getUserSubscription(req.user!.id);

    const priceMap: Record<string, string> = {
      'plus': process.env.STRIPE_PRICE_PLUS!,
      'pro': process.env.STRIPE_PRICE_PRO!,
      'teams': process.env.STRIPE_PRICE_TEAMS!,
    };

    const priceId = priceMap[planId];
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: req.user!.email,
      billing_address_collection: 'auto',
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.VITE_APP_URL}/upgrade?success=true`,
      cancel_url: `${process.env.VITE_APP_URL}/upgrade?canceled=true`,
      metadata: {
        userId: req.user!.id,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout' });
  }
});

// Webhook handler (called by Stripe)
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;
      const priceId = subscription.items.data[0]?.price.id;

      if (userId && priceId && PRICE_TO_TIER[priceId]) {
        const tier = PRICE_TO_TIER[priceId];
        await updateSubscriptionTier(userId, tier);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook failed' });
  }
});

export default router;
```

---

## Step 8: Create Main Server File

**Create `src/server/index.ts`:**

```typescript
import express from 'express';
import cors from 'cors';
import { config } from './config';
import subscriptionRoutes from './routes/subscription';
import paymentRoutes from './routes/payments';

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.VITE_APP_URL!,
  ],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Start server
app.listen(config.PORT, () => {
  console.log(`✅ Server running at http://localhost:${config.PORT}`);
  console.log(`📊 Supabase: ${config.SUPABASE_URL}`);
  console.log(`💳 Stripe: ${config.STRIPE_SECRET_KEY ? 'Configured' : '❌ Missing'}`);
});
```

---

## Step 9: Update package.json

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "npm run dev:frontend",
    "dev:frontend": "vite",
    "dev:server": "ts-node --esm src/server/index.ts",
    "dev:all": "concurrently \"npm run dev:frontend\" \"npm run dev:server\"",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
```

Install concurrently:
```bash
npm install -D concurrently
```

---

## Step 10: Set Up Environment Variables

**Update `.env.local`:**

```
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PLUS=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_TEAMS=price_...

# URLs
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_URL=http://localhost:5173
PORT=3001
```

---

## Step 11: Run Everything

```bash
# Install dependencies first
npm install express cors dotenv @supabase/supabase-js stripe ts-node -D @types/express @types/node typescript concurrently

# Run frontend + backend together
npm run dev:all

# Or run separately:
# Terminal 1: npm run dev:frontend
# Terminal 2: npm run dev:server
```

---

## Step 12: Test It

1. Visit `http://localhost:5173`
2. Sign up / log in
3. Go to `/upgrade` to see usage dashboard
4. Test creating meetings, uploading files, etc.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module 'express'" | Run `npm install express cors dotenv` |
| "Supabase tables don't exist" | Run SQL migration in Supabase dashboard |
| "Stripe webhook failing" | Make sure `STRIPE_WEBHOOK_SECRET` is set correctly |
| "CORS errors" | Check origins in `.env.local` match your URLs |
| "User subscription not found" | Create it manually in Supabase: `INSERT INTO user_subscriptions (id, tier) VALUES ('user_id', 'free')` |

---

Done! You now have a complete backend setup. Follow these steps locally and push when ready.

