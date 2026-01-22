-- ======================================================================================
-- DIAGNOSTIC & FIX SCRIPT FOR CHAT_PARTICIPANTS RLS RECURSION
-- ======================================================================================
-- This script helps identify and resolve "infinite recursion detected" errors 
-- in RLS policies for chats and chat_participants tables.
-- --------------------------------------------------------------------------------------

-- ---------------------------------------------------------
-- 1. DIAGNOSTICS SECTION (READ-ONLY)
-- ---------------------------------------------------------
-- This section inspects the current state of your database.

-- Check RLS status for relevant tables
SELECT 
    n.nspname AS schema_name,
    c.relname AS table_name, 
    c.relrowsecurity AS rls_enabled, 
    c.relforcerowsecurity AS force_rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' 
AND c.relname IN ('chats', 'chat_participants');

-- List all policies on chats and chat_participants with their definitions
SELECT
    tablename,
    policyname,
    cmd as operation,
    roles,
    qual as using_expression,
    with_check as check_expression
FROM
    pg_policies
WHERE
    schemaname = 'public'
    AND tablename IN ('chats', 'chat_participants')
ORDER BY tablename, policyname;

-- List security definer functions that might be involved
SELECT
    p.proname AS function_name,
    p.prosecdef AS is_security_definer,
    pg_get_userbyid(p.proowner) AS owner,
    pg_get_functiondef(p.oid) AS definition
FROM
    pg_proc p
JOIN
    pg_namespace n ON p.pronamespace = n.oid
WHERE
    n.nspname = 'public'
    AND (
        p.proname ILIKE '%chat%' 
        OR p.proname ILIKE '%participant%'
    )
ORDER BY p.proname;

-- ---------------------------------------------------------
-- 2. ANALYSIS SECTION (IDENTIFYING RECURSION)
-- ---------------------------------------------------------
-- Identifying policies that reference the other table directly.
-- Direct table references (e.g., "chat_id IN (SELECT id FROM chats)") 
-- are the most common cause of recursion when both tables have RLS.

WITH policy_refs AS (
    SELECT
        tablename,
        policyname,
        (qual ILIKE '%chat_participants%' OR with_check ILIKE '%chat_participants%') as refs_participants,
        (qual ILIKE '%chats%' OR with_check ILIKE '%chats%') as refs_chats
    FROM
        pg_policies
    WHERE
        schemaname = 'public'
        AND tablename IN ('chats', 'chat_participants')
)
SELECT 
    tablename, 
    policyname,
    CASE 
        WHEN tablename = 'chats' AND refs_participants THEN 'CRITICAL: chats policy references chat_participants'
        WHEN tablename = 'chat_participants' AND refs_chats THEN 'CRITICAL: chat_participants policy references chats'
        ELSE 'OK'
    END as status
FROM policy_refs
WHERE (tablename = 'chats' AND refs_participants) OR (tablename = 'chat_participants' AND refs_chats);

-- ---------------------------------------------------------
-- 3. SUMMARY
-- ---------------------------------------------------------
-- FINDINGS:
-- If the query above returned any "CRITICAL" rows, you have a circular dependency.
--
-- EXAMPLE OF RECURSION:
-- 1. Policy on 'chat_participants' queries 'chats' table.
-- 2. Query on 'chats' triggers RLS on 'chats'.
-- 3. Policy on 'chats' queries 'chat_participants' (perhaps via a function).
-- 4. Infinite loop detected!
--
-- RECOMMENDED FIX:
-- Replace direct table queries in RLS policies with SECURITY DEFINER functions.
-- SECURITY DEFINER functions run with the privileges of the creator (usually postgres),
-- bypassing RLS and breaking the recursion loop.

-- ---------------------------------------------------------
-- 4. FIX SECTION (RUN TO RESOLVE RECURSION)
-- ---------------------------------------------------------
-- The following statements will:
-- 1. Drop existing problematic policies
-- 2. Create optimized SECURITY DEFINER helper functions
-- 3. Apply clean, non-recursive policies
-- 4. Ensure the auto-add creator trigger is properly configured

-- START OF FIX
BEGIN;

-- A. Drop all existing policies on chats and chat_participants
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN (
        SELECT policyname, tablename 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename IN ('chats', 'chat_participants')
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- B. Create or update SECURITY DEFINER helper functions
-- These functions are key to breaking the RLS recursion.

-- 1. Helper to get all chat IDs a user is a member of
CREATE OR REPLACE FUNCTION public.get_user_chat_ids(p_user_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT chat_id FROM public.chat_participants WHERE user_id = p_user_id;
$$;

-- 2. Helper to check if a chat is accessible by a user
CREATE OR REPLACE FUNCTION public.can_access_chat(p_chat_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.chats
    WHERE id = p_chat_id
    AND (
      COALESCE(is_private, false) = false 
      OR created_by = p_user_id 
      OR id IN (SELECT chat_id FROM public.chat_participants WHERE user_id = p_user_id)
    )
  );
$$;

-- 3. Helper to check if a user is the creator of a chat
CREATE OR REPLACE FUNCTION public.is_chat_creator(p_chat_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.chats
    WHERE id = p_chat_id AND created_by = p_user_id
  );
$$;

-- C. Apply new policies for 'public.chats'
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_chats" ON public.chats
  FOR SELECT TO authenticated
  USING (
    COALESCE(is_private, false) = false 
    OR id IN (SELECT public.get_user_chat_ids(auth.uid()))
  );

CREATE POLICY "insert_chats" ON public.chats
  FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "update_chats" ON public.chats
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "delete_chats" ON public.chats
  FOR DELETE TO authenticated
  USING (created_by = auth.uid());

-- D. Apply new policies for 'public.chat_participants'
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_participants" ON public.chat_participants
  FOR SELECT TO authenticated
  USING (
    public.can_access_chat(chat_id, auth.uid())
  );

CREATE POLICY "insert_participants" ON public.chat_participants
  FOR INSERT TO authenticated
  WITH CHECK (
    -- User can join themselves if the chat is accessible
    (user_id = auth.uid() AND public.can_access_chat(chat_id, auth.uid()))
    OR
    -- Chat creator can add anyone
    public.is_chat_creator(chat_id, auth.uid())
  );

CREATE POLICY "update_participants" ON public.chat_participants
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid() 
    OR public.is_chat_creator(chat_id, auth.uid())
  );

CREATE POLICY "delete_participants" ON public.chat_participants
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid() 
    OR public.is_chat_creator(chat_id, auth.uid())
  );

-- E. Ensure the auto-add creator trigger is in place
-- This makes chat creation atomic: when a chat is created, the creator is added as participant automatically.
CREATE OR REPLACE FUNCTION public.auto_add_chat_creator()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.chat_participants (chat_id, user_id)
  VALUES (NEW.id, NEW.created_by)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_auto_add_chat_creator ON public.chats;
CREATE TRIGGER trigger_auto_add_chat_creator
  AFTER INSERT ON public.chats
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_add_chat_creator();

-- F. Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.get_user_chat_ids(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_chat(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_chat_creator(uuid, uuid) TO authenticated;

COMMIT;
-- END OF FIX

-- Verify new policies
SELECT tablename, policyname, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename IN ('chats', 'chat_participants');
