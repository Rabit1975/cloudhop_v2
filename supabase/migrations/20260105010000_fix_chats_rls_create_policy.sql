-- Migration: Fix "Create chats" RLS Policy
-- Description: This migration fixes the issue where users can no longer insert into the chats table.
-- The issue was caused by the policy being too restrictive or having a conflicting name.
--
-- Problem:
-- - Users were getting: "new row violates row-level security policy for table 'chats'" (403 Forbidden)
-- - The "Create chats" policy (named "insert_chats" in previous migration) was blocking all inserts
--
-- Solution:
-- - Drop all existing INSERT policies on the chats table
-- - Create a clean "Create chats" policy that allows authenticated users to insert chats
-- - Ensure the policy checks that created_by matches auth.uid()

BEGIN;

-- 1. Drop any existing INSERT policies on chats table
-- This ensures we have a clean slate without conflicts
DROP POLICY IF EXISTS "Create chats" ON public.chats;
DROP POLICY IF EXISTS "insert_chats" ON public.chats;
DROP POLICY IF EXISTS "Users can insert" ON public.chats;
DROP POLICY IF EXISTS "Users can create" ON public.chats;

-- 2. Create the correct "Create chats" policy
-- This policy allows authenticated users to insert new chats
-- The WITH CHECK clause ensures that created_by is set to the authenticated user's ID
CREATE POLICY "Create chats"
  ON public.chats
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- 3. Add a comment explaining the policy
COMMENT ON POLICY "Create chats" ON public.chats IS
  'Allows authenticated users to create new chats. '
  'The created_by field must be set to the authenticated user''s ID (auth.uid()). '
  'This ensures users can only create chats where they are listed as the creator.';

-- 4. Verify the policy was created (for debugging, not executed)
-- SELECT policyname, cmd, roles, qual, with_check
-- FROM pg_policies
-- WHERE schemaname = 'public' AND tablename = 'chats' AND cmd = 'INSERT';

COMMIT;
