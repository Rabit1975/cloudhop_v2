-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  storage_gb INT NOT NULL,
  ai_actions_monthly INT,
  max_meeting_minutes INT,
  price_monthly INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert plan data
INSERT INTO plans (id, name, storage_gb, ai_actions_monthly, max_meeting_minutes, price_monthly) VALUES
  ('free', 'Free', 1, 5, 45, 0),
  ('plus', 'Plus', 25, 300, NULL, 599),
  ('pro', 'Pro', 100, NULL, NULL, 1499),
  ('teams', 'Teams', NULL, NULL, NULL, 899)
ON CONFLICT DO NOTHING;

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier VARCHAR(20) DEFAULT 'free' REFERENCES plans(id),
  storage_used_mb INT DEFAULT 0,
  ai_actions_used INT DEFAULT 0,
  ai_actions_reset_date DATE DEFAULT CURRENT_DATE,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  tier_updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create usage logs table
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL, -- 'storage_used', 'ai_action', 'meeting_created', 'storage_deleted'
  amount INT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at);
CREATE INDEX idx_user_subscriptions_stripe_customer ON user_subscriptions(stripe_customer_id);

-- Enable RLS (Row Level Security)
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own subscription" ON user_subscriptions
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own usage logs" ON usage_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Create function to reset daily AI counter
CREATE OR REPLACE FUNCTION reset_daily_ai_counter()
RETURNS VOID AS $$
BEGIN
  UPDATE user_subscriptions
  SET ai_actions_used = 0, ai_actions_reset_date = CURRENT_DATE
  WHERE tier = 'free' AND ai_actions_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;
