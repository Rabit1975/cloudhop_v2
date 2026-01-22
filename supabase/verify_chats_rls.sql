-- Verification Script for Chats Table RLS Policies
-- Run this in Supabase SQL Editor to verify the fix

-- 1. Check all policies on the chats table
SELECT
    policyname AS policy_name,
    cmd AS operation,
    roles AS applicable_to,
    qual AS using_expression,
    with_check AS check_expression
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'chats'
ORDER BY cmd, policyname;

-- Expected result:
-- policy_name      | operation | roles          | using_expression | check_expression
-- -----------------|-----------|----------------|------------------|------------------
-- select_chats     | SELECT    | authenticated  | [expression]     | NULL
-- Create chats     | INSERT    | authenticated  | NULL             | created_by = auth.uid()
-- update_chats     | UPDATE    | authenticated  | [expression]     | NULL
-- delete_chats     | DELETE    | authenticated  | [expression]     | NULL

-- 2. Test creating a chat (you'll need a real user ID)
-- Replace 'YOUR_USER_ID' with an actual user ID from your auth.users table
-- This should succeed after the fix:

-- BEGIN;
--   INSERT INTO public.chats (
--     title,
--     description,
--     created_by,
--     is_private,
--     is_group,
--     type,
--     category
--   ) VALUES (
--     'Test Chat',
--     'Testing chat creation after RLS fix',
--     'YOUR_USER_ID',
--     false,
--     true,
--     'group',
--     'general'
--   );
-- ROLLBACK; -- Use ROLLBACK to test without actually inserting

-- 3. Verify the auto_add_chat_creator trigger exists
SELECT
    trigger_name,
    event_manipulation AS event_type,
    event_object_table AS table_name,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'trigger_auto_add_chat_creator'
  AND event_object_schema = 'public'
  AND event_object_table = 'chats';

-- 4. Verify helper functions exist and are SECURITY DEFINER
SELECT
    p.proname AS function_name,
    p.prosecdef AS is_security_definer,
    pg_get_userbyid(p.proowner) AS owner,
    CASE
        WHEN p.proname IN ('get_user_chat_ids', 'can_access_chat', 'is_chat_creator', 'can_join_chat', 'auto_add_chat_creator')
        THEN 'CORRECT - Should be SECURITY DEFINER'
        ELSE 'Review needed'
    END AS status
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname IN (
    'get_user_chat_ids',
    'can_access_chat',
    'is_chat_creator',
    'can_join_chat',
    'auto_add_chat_creator'
  );

-- 5. Check table structure to ensure created_by column exists
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'chats'
  AND column_name = 'created_by';

-- Should show created_by as uuid type (nullable or with default)
