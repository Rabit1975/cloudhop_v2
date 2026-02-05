-- Verification Script for Hub Groups RLS Policies
-- Run this in Supabase SQL Editor to verify policies are working correctly

-- 1. Check if RLS is enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    forcerlspolicy
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'hub_groups';

-- 2. List all policies on hub_groups table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'hub_groups'
ORDER BY policyname;

-- 3. Check indexes exist
SELECT 
    indexname,
    tablename,
    indexdef
FROM pg_indexes 
WHERE tablename = 'hub_groups' AND schemaname = 'public'
ORDER BY indexname;

-- 4. Test group creation (with rollback)
BEGIN;
-- This should succeed for an authenticated user
INSERT INTO public.hub_groups (
    name,
    description,
    owner_user_id,
    tenant_id,
    is_active,
    created_at,
    updated_at
) VALUES (
    'Test Group',
    'A test group for RLS verification',
    auth.uid(),
    NULL,
    true,
    NOW(),
    NOW()
) RETURNING id;
ROLLBACK;

-- 5. Test unauthorized operations (should fail)
BEGIN;
-- This should fail - trying to insert with wrong owner_user_id
DO $$
BEGIN
    INSERT INTO public.hub_groups (
        name,
        description,
        owner_user_id,
        tenant_id,
        is_active,
        created_at,
        updated_at
    ) VALUES (
        'Unauthorized Group',
        'This should fail',
        '00000000-0000-0000-0000-000000000000' -- Wrong user ID
    );
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Expected error: %', SQLERRM;
END $$;
ROLLBACK;

-- 6. Check table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'hub_groups'
ORDER BY ordinal_position;

-- 7. Verify related tables exist (for the SELECT policy)
SELECT 
    schemaname,
    tablename
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('hub_group_members');

-- 8. Test SELECT access (should only show user's own groups or groups they're members of)
-- This will show what groups the current user can see
SELECT 
    id,
    name,
    owner_user_id,
    is_active,
    created_at
FROM public.hub_groups
LIMIT 10;

-- 9. Performance check - verify indexes are being used
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM public.hub_groups 
WHERE owner_user_id = auth.uid() 
LIMIT 1;

-- Summary of expected results:
-- 1. RLS should be enabled (rowsecurity = true)
-- 2. Should see 4 policies: insert, select, update, delete
-- 3. Should see 4 indexes: owner_user_id, tenant_id, created_at, is_active
-- 4. Group creation test should succeed
-- 5. Unauthorized insertion should fail with RLS error
-- 6. Table structure should include all expected columns
-- 7. hub_group_members table should exist for the SELECT policy
-- 8. SELECT should only return groups user owns or is member of
-- 9. EXPLAIN should show index usage for owner_user_id queries
