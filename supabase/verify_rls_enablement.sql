-- RLS Enablement Verification Script
-- Run this to verify RLS is properly enabled on hub tables

-- 1. Check RLS status on all hub tables
SELECT 
    t.schemaname,
    t.tablename,
    t.rowsecurity,
    t.forcerlspolicy,
    CASE 
        WHEN t.rowsecurity = true THEN '✅ RLS Enabled'
        ELSE '❌ RLS DISABLED - SECURITY RISK'
    END as rls_status
FROM pg_tables t
WHERE t.schemaname = 'public' 
  AND t.tablename LIKE 'hub_%'
ORDER BY t.tablename;

-- 2. List all policies on hub tables
SELECT 
    p.schemaname,
    p.tablename,
    p.policyname,
    p.permissive,
    p.roles,
    p.cmd,
    CASE 
        WHEN p.qual IS NOT NULL OR p.with_check IS NOT NULL THEN '✅ Has Conditions'
        ELSE '⚠️  No Conditions'
    END as policy_status
FROM pg_policies p
WHERE p.schemaname = 'public' 
  AND p.tablename LIKE 'hub_%'
ORDER BY p.tablename, p.cmd, p.policyname;

-- 3. Check if tables exist and their basic structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name LIKE 'hub_%'
ORDER BY table_name, ordinal_position;

-- 4. Test RLS with a safe read-only operation
-- This should show what the current user can access
DO $$
DECLARE
    groups_count INTEGER;
    channels_count INTEGER;
BEGIN
    -- Test hub_groups access
    BEGIN
        SELECT COUNT(*) INTO groups_count FROM public.hub_groups;
        RAISE NOTICE 'hub_groups: User can see % rows', groups_count;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'hub_groups: Access error - %', SQLERRM;
    END;
    
    -- Test hub_channels access
    BEGIN
        SELECT COUNT(*) INTO channels_count FROM public.hub_channels;
        RAISE NOTICE 'hub_channels: User can see % rows', channels_count;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'hub_channels: Access error - %', SQLERRM;
    END;
END $$;

-- 5. Check for any public tables (security risk)
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    CASE 
        WHEN rowsecurity = false THEN '🚨 PUBLIC TABLE - SECURITY RISK'
        ELSE '✅ Secured with RLS'
    END as security_status
FROM pg_tables
WHERE schemaname = 'public' 
  AND rowsecurity = false
  AND tablename NOT IN (
    'schema_migrations', 'supabase_migrations', -- migration tables
    'spatial_ref_sys' -- PostGIS system table
  )
ORDER BY tablename;

-- 6. Summary of actions needed
DO $$
DECLARE
    disabled_tables TEXT;
BEGIN
    -- Find tables with RLS disabled
    SELECT string_agg(tablename, ', ') INTO disabled_tables
    FROM pg_tables
    WHERE schemaname = 'public' 
      AND tablename LIKE 'hub_%'
      AND rowsecurity = false;
    
    IF disabled_tables IS NOT NULL THEN
        RAISE NOTICE '';
        RAISE NOTICE '🚨 ACTION REQUIRED:';
        RAISE NOTICE 'Tables without RLS: %', disabled_tables;
        RAISE NOTICE 'Run: ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;';
        RAISE NOTICE '';
    ELSE
        RAISE NOTICE '';
        RAISE NOTICE '✅ All hub tables have RLS enabled';
        RAISE NOTICE '';
    END IF;
END $$;

-- 7. Quick fix commands (uncomment and run if needed)
/*
-- Enable RLS on specific tables if disabled:
ALTER TABLE public.hub_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_channels ENABLE ROW LEVEL SECURITY;

-- Or enable RLS on all hub_ tables:
DO $$
DECLARE
    table_rec RECORD;
BEGIN
    FOR table_rec IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
          AND tablename LIKE 'hub_%'
          AND rowsecurity = false
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_rec.tablename);
        RAISE NOTICE 'RLS enabled on %', table_rec.tablename;
    END LOOP;
END $$;
*/
