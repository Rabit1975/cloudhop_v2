# Quick Start Checklist - Subscription System

## ✅ What's Already Created

- [x] Database schema (supabase-migration.sql)
- [x] API service client (src/services/subscriptionAPI.ts)
- [x] Tier configurations (src/config/tiers.ts)
- [x] React hook (src/hooks/useSubscription.ts)
- [x] Usage dashboard (src/components/UsageDashboard.tsx)
- [x] Backend setup guide (BACKEND_SETUP.md)

---

## 🚀 What You Need To Do Locally

### Phase 1: Database Setup (5 mins)
- [ ] Go to Supabase dashboard
- [ ] Open SQL editor
- [ ] Copy-paste content from `supabase-migration.sql`
- [ ] Execute
- [ ] Verify tables exist

### Phase 2: Install Dependencies (2 mins)
```bash
npm install express cors dotenv @supabase/supabase-js stripe ts-node
npm install -D @types/express @types/node typescript concurrently
```
- [ ] Run npm install
- [ ] No errors

### Phase 3: Create Backend Files (30 mins)
Follow BACKEND_SETUP.md and create:
- [ ] src/server/config.ts
- [ ] src/server/utils/supabase.ts
- [ ] src/server/middleware/auth.ts
- [ ] src/server/routes/subscription.ts
- [ ] src/server/routes/payments.ts
- [ ] src/server/index.ts

### Phase 4: Environment Variables (5 mins)
- [ ] Copy Supabase credentials to .env.local
- [ ] Add STRIPE_SECRET_KEY
- [ ] Add STRIPE_WEBHOOK_SECRET
- [ ] Update API_BASE_URL to http://localhost:3001/api

### Phase 5: Test Backend (5 mins)
```bash
npm run dev:server
# Should see: ✅ Server running at http://localhost:3001
```
- [ ] Server starts without errors
- [ ] Visit http://localhost:3001/health
- [ ] Returns `{"status":"ok","time":"..."}`

### Phase 6: Update Frontend Components (20 mins)
- [ ] Import `useSubscription` hook in pages that need it
- [ ] Add tier checks to GameHub, HopMeetings, etc.
- [ ] Hide/disable features based on tier
- [ ] Add upgrade buttons when limits hit

### Phase 7: Test Full Flow (15 mins)
- [ ] Run `npm run dev:all`
- [ ] Sign up / login
- [ ] Check usage dashboard loads
- [ ] Test storage/AI limit checks
- [ ] Test upgrade flow (Stripe test mode)

### Phase 8: Deploy (5 mins)
```bash
git add .
git commit -m "Add subscription backend system"
git push origin production
```
- [ ] Pushed to GitHub
- [ ] Vercel auto-deployed
- [ ] Updated Supabase webhooks

---

## 📋 File Locations Reference

```
src/
├── server/                    # NEW - Backend server
│   ├── config.ts             # Configuration
│   ├── index.ts              # Main server entry
│   ├── middleware/
│   │   └── auth.ts           # Authentication middleware
│   ├── routes/
│   │   ├── subscription.ts    # Subscription endpoints
│   │   └── payments.ts        # Stripe endpoints
│   ├── utils/
│   │   └── supabase.ts        # Supabase client & helpers
│   └── webhooks/
│       └── stripe.ts          # Stripe webhook (optional)
├── config/
│   └── tiers.ts              # Tier definitions ✅ Created
├── services/
│   └── subscriptionAPI.ts    # API client ✅ Created
├── hooks/
│   └── useSubscription.ts    # React hook ✅ Created
└── components/
    └── UsageDashboard.tsx    # Usage component ✅ Created
```

---

## 🔑 Key Files to Reference

| File | Purpose |
|------|---------|
| supabase-migration.sql | Database setup |
| BACKEND_SETUP.md | Step-by-step backend guide |
| src/config/tiers.ts | Tier limits & features |
| src/hooks/useSubscription.ts | How to use subscription data |
| src/components/UsageDashboard.tsx | Example usage component |

---

## 💡 Tips

1. **Start with Phase 1-3** - Get database & backend running first
2. **Test with Stripe test keys** - Don't use live keys yet
3. **Add logging** - console.log(subscription) to debug
4. **Test free tier first** - Most restrictive, easiest to debug
5. **Use Stripe test card: 4242 4242 4242 4242** - Never fails in test mode
6. **Check .env.local** - Most errors are missing environment variables

---

## ❓ Common Questions

**Q: Where do I set tier for new users?**
A: Create a trigger in Supabase to auto-create user_subscriptions entry when auth.users is created

**Q: How do I test Stripe locally?**
A: Use Stripe CLI to forward webhooks: `stripe listen --forward-to localhost:3001/api/payments/webhook`

**Q: How do I reset a user's tier?**
A: In Supabase: `UPDATE user_subscriptions SET tier = 'free' WHERE id = 'user_id'`

**Q: Do I need to modify existing pages?**
A: Yes - import `useSubscription` hook and add tier checks where needed

---

## 📊 Testing Checklist

After setup, test these:
- [ ] Free user sees 1GB storage limit
- [ ] Free user sees 5 AI actions/day
- [ ] Free user sees 45-min meeting limit
- [ ] Plus user sees 25GB storage
- [ ] Pro user sees unlimited everything
- [ ] Upgrade button works
- [ ] Stripe test payment works
- [ ] Tier updates after payment
- [ ] Limits reset daily (free) / monthly (paid)

---

## 🆘 Need Help?

Check these files in order:
1. BACKEND_SETUP.md - Step-by-step instructions
2. src/hooks/useSubscription.ts - See how data flows
3. src/components/UsageDashboard.tsx - See example usage
4. supabase-migration.sql - Database structure

Good luck! 🚀
