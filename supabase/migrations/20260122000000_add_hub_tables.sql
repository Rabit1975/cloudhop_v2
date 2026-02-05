-- Create hub_groups table
CREATE TABLE IF NOT EXISTS hub_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Communities',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create hub_channels table
CREATE TABLE IF NOT EXISTS hub_channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES hub_groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'voice', 'video')),
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Insert default groups
INSERT INTO hub_groups (name, description, icon) VALUES
('General', 'General discussion channels', 'Chat'),
('Gaming', 'Gaming related channels', 'Arcade')
ON CONFLICT DO NOTHING;

-- Insert default channels for General group
INSERT INTO hub_channels (group_id, name, description, type) VALUES
((SELECT id FROM hub_groups WHERE name = 'General' LIMIT 1), 'general', 'General chat channel', 'text'),
((SELECT id FROM hub_groups WHERE name = 'General' LIMIT 1), 'random', 'Random discussions', 'text')
ON CONFLICT DO NOTHING;

-- Insert default channels for Gaming group
INSERT INTO hub_channels (group_id, name, description, type) VALUES
((SELECT id FROM hub_groups WHERE name = 'Gaming' LIMIT 1), 'gaming', 'Gaming discussions', 'text'),
((SELECT id FROM hub_groups WHERE name = 'Gaming' LIMIT 1), 'lfg', 'Looking for group', 'text')
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE hub_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE hub_channels ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for hub_groups
CREATE POLICY "Anyone can view hub_groups" ON hub_groups FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create hub_groups" ON hub_groups FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own hub_groups" ON hub_groups FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "Users can delete own hub_groups" ON hub_groups FOR DELETE USING (created_by = auth.uid());

-- Create RLS policies for hub_channels
CREATE POLICY "Anyone can view hub_channels" ON hub_channels FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create hub_channels" ON hub_channels FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own hub_channels" ON hub_channels FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "Users can delete own hub_channels" ON hub_channels FOR DELETE USING (created_by = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hub_groups_created_at ON hub_groups(created_at);
CREATE INDEX IF NOT EXISTS idx_hub_channels_group_id ON hub_channels(group_id);
CREATE INDEX IF NOT EXISTS idx_hub_channels_created_at ON hub_channels(created_at);
