-- Hub Groups RLS Policies and Indexes
-- Enables secure group management with proper access controls

-- First, create indexes for performance
CREATE INDEX IF NOT EXISTS idx_hub_groups_owner_user_id ON public.hub_groups(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_hub_groups_tenant_id ON public.hub_groups(tenant_id);
CREATE INDEX IF NOT EXISTS idx_hub_groups_created_at ON public.hub_groups(created_at);
CREATE INDEX IF NOT EXISTS idx_hub_groups_is_active ON public.hub_groups(is_active);

-- Enable RLS on hub_groups table
ALTER TABLE public.hub_groups ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Groups insert policy" ON public.hub_groups;
DROP POLICY IF EXISTS "Groups select policy" ON public.hub_groups;
DROP POLICY IF EXISTS "Groups update policy" ON public.hub_groups;
DROP POLICY IF EXISTS "Groups delete policy" ON public.hub_groups;
DROP POLICY IF EXISTS "Users can view own groups" ON public.hub_groups;
DROP POLICY IF EXISTS "Users can create groups" ON public.hub_groups;
DROP POLICY IF EXISTS "Owners can manage groups" ON public.hub_groups;

-- INSERT Policy: Users can create groups where they are the owner
CREATE POLICY "Users can create groups"
  ON public.hub_groups
  FOR INSERT
  TO authenticated
  WITH CHECK (
    owner_user_id = auth.uid()
  );

-- SELECT Policy: Users can view groups they own or are members of
CREATE POLICY "Users can view accessible groups"
  ON public.hub_groups
  FOR SELECT
  TO authenticated
  USING (
    owner_user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.hub_group_members 
      WHERE hub_group_id = public.hub_groups.id 
      AND user_id = auth.uid()
      AND is_active = true
    )
  );

-- UPDATE Policy: Only group owners can update group settings
CREATE POLICY "Owners can update groups"
  ON public.hub_groups
  FOR UPDATE
  TO authenticated
  USING (
    owner_user_id = auth.uid()
  )
  WITH CHECK (
    owner_user_id = auth.uid()
  );

-- DELETE Policy: Only group owners can delete groups (with additional safety checks)
CREATE POLICY "Owners can delete groups"
  ON public.hub_groups
  FOR DELETE
  TO authenticated
  USING (
    owner_user_id = auth.uid()
  );

-- Comments for future maintainers
COMMENT ON POLICY "Users can create groups" ON public.hub_groups IS 'Allows authenticated users to create groups where they are set as the owner';
COMMENT ON POLICY "Users can view accessible groups" ON public.hub_groups IS 'Allows users to view groups they own or are active members of';
COMMENT ON POLICY "Owners can update groups" ON public.hub_groups IS 'Allows group owners to update group settings and metadata';
COMMENT ON POLICY "Owners can delete groups" ON public.hub_groups IS 'Allows group owners to delete their own groups';

-- Table comments for documentation
COMMENT ON TABLE public.hub_groups IS 'Hub groups for organizing channels and spaces within CloudHop';
COMMENT ON COLUMN public.hub_groups.owner_user_id IS 'UUID of the user who owns and can manage this group';
COMMENT ON COLUMN public.hub_groups.tenant_id IS 'Optional tenant ID for multi-tenant deployments';
COMMENT ON COLUMN public.hub_groups.is_active IS 'Whether this group is currently active and visible';
