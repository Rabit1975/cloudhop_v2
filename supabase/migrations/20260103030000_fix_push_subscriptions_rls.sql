-- Fix Push Subscriptions RLS
-- This migration ensures that authenticated users can insert/update their own push subscriptions.

-- 1. Enable RLS on the table if not already enabled
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policy if it conflicts or is incorrect (optional but safer for clean slate)
DROP POLICY IF EXISTS "Users can manage their own subscriptions" ON public.push_subscriptions;

-- 3. Create a comprehensive policy for INSERT, UPDATE, SELECT, DELETE
CREATE POLICY "Users can manage their own subscriptions"
ON public.push_subscriptions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
