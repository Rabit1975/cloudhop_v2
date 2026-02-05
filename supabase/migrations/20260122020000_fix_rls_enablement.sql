-- Fix RLS Enablement for Hub Tables
-- Ensures RLS is properly enabled on hub_groups and hub_channels

-- First, ensure RLS is enabled on hub_groups
DO $$
BEGIN
    -- Check if table exists and enable RLS
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'hub_groups'
    ) THEN
        ALTER TABLE public.hub_groups ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS enabled on hub_groups';
    ELSE
        RAISE NOTICE 'hub_groups table does not exist';
    END IF;
END $$;

-- Enable RLS on hub_channels if it exists
DO $$
BEGIN
    -- Check if table exists and enable RLS
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'hub_channels'
    ) THEN
        ALTER TABLE public.hub_channels ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'RLS enabled on hub_channels';
    ELSE
        RAISE NOTICE 'hub_channels table does not exist';
    END IF;
END $$;

-- Create basic RLS policies for hub_channels if they don't exist
DO $$
BEGIN
    -- Check if hub_channels table exists
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'hub_channels'
    ) THEN
        -- Create indexes for hub_channels
        CREATE INDEX IF NOT EXISTS idx_hub_channels_group_id ON public.hub_channels(group_id);
        CREATE INDEX IF NOT EXISTS idx_hub_channels_created_by ON public.hub_channels(created_by);
        CREATE INDEX IF NOT EXISTS idx_hub_channels_is_active ON public.hub_channels(is_active);
        
        -- Drop any existing policies to avoid conflicts
        DROP POLICY IF EXISTS "Channels insert policy" ON public.hub_channels;
        DROP POLICY IF EXISTS "Channels select policy" ON public.hub_channels;
        DROP POLICY IF EXISTS "Channels update policy" ON public.hub_channels;
        DROP POLICY IF EXISTS "Channels delete policy" ON public.hub_channels;
        
        -- INSERT Policy: Users can create channels in groups they own or are members of
        CREATE POLICY "Users can create channels"
          ON public.hub_channels
          FOR INSERT
          TO authenticated
          WITH CHECK (
            created_by = auth.uid()
            AND EXISTS (
              SELECT 1 FROM public.hub_groups 
              WHERE id = group_id 
              AND (
                owner_user_id = auth.uid()
                OR EXISTS (
                  SELECT 1 FROM public.hub_group_members 
                  WHERE hub_group_id = group_id 
                  AND user_id = auth.uid()
                  AND is_active = true
                )
              )
            )
          );
        
        -- SELECT Policy: Users can view channels in groups they own or are members of
        CREATE POLICY "Users can view accessible channels"
          ON public.hub_channels
          FOR SELECT
          TO authenticated
          USING (
            EXISTS (
              SELECT 1 FROM public.hub_groups 
              WHERE id = group_id 
              AND (
                owner_user_id = auth.uid()
                OR EXISTS (
                  SELECT 1 FROM public.hub_group_members 
                  WHERE hub_group_id = group_id 
                  AND user_id = auth.uid()
                  AND is_active = true
                )
              )
            )
          );
        
        -- UPDATE Policy: Channel creators and group owners can update channels
        CREATE POLICY "Users can update channels"
          ON public.hub_channels
          FOR UPDATE
          TO authenticated
          USING (
            created_by = auth.uid()
            OR EXISTS (
              SELECT 1 FROM public.hub_groups 
              WHERE id = group_id 
              AND owner_user_id = auth.uid()
            )
          )
          WITH CHECK (
            created_by = auth.uid()
            OR EXISTS (
              SELECT 1 FROM public.hub_groups 
              WHERE id = group_id 
              AND owner_user_id = auth.uid()
            )
          );
        
        -- DELETE Policy: Channel creators and group owners can delete channels
        CREATE POLICY "Users can delete channels"
          ON public.hub_channels
          FOR DELETE
          TO authenticated
          USING (
            created_by = auth.uid()
            OR EXISTS (
              SELECT 1 FROM public.hub_groups 
              WHERE id = group_id 
              AND owner_user_id = auth.uid()
            )
          );
        
        RAISE NOTICE 'RLS policies created for hub_channels';
    END IF;
END $$;

-- Verify RLS is enabled on both tables
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    forcerlspolicy
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('hub_groups', 'hub_channels')
ORDER BY tablename;

-- Show policies for both tables
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('hub_groups', 'hub_channels')
ORDER BY tablename, policyname;
