-- Reset chat_participants RLS Policies
-- This migration completely resets RLS on chat_participants to fix infinite recursion errors
-- caused by multiple conflicting policies that were checking each other recursively.

-- DROP ALL EXISTING POLICIES ON chat_participants
-- We need to be thorough and drop ALL policies that might exist
DROP POLICY IF EXISTS "Join chat" ON public.chat_participants;
DROP POLICY IF EXISTS "Users can view" ON public.chat_participants;
DROP POLICY IF EXISTS "Users can insert" ON public.chat_participants;
DROP POLICY IF EXISTS "Users can update" ON public.chat_participants;
DROP POLICY IF EXISTS "View participants" ON public.chat_participants;
DROP POLICY IF EXISTS "Users can ..." ON public.chat_participants;
DROP POLICY IF EXISTS "Update own participation" ON public.chat_participants;
DROP POLICY IF EXISTS "Leave chat" ON public.chat_participants;

-- Ensure the can_join_chat function exists (SECURITY DEFINER, STABLE)
-- This function breaks the RLS recursion by operating with elevated privileges
CREATE OR REPLACE FUNCTION public.can_join_chat(p_chat_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT
    (p_user_id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.chats c
      WHERE c.id = p_chat_id AND c.created_by = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.chats c
      WHERE c.id = p_chat_id AND c.is_group = true AND c.is_private = false
    );
$$;

-- Revoke execute from anon and authenticated - the function is SECURITY DEFINER so it
-- runs with elevated privileges and doesn't need execute grants for policies
REVOKE EXECUTE ON FUNCTION public.can_join_chat(uuid, uuid) FROM anon, authenticated;

-- CREATE NEW CLEAN POLICIES USING THE FUNCTION

-- SELECT Policy: Users can view chat participants they're authorized to see
CREATE POLICY "View chat participants"
  ON public.chat_participants
  FOR SELECT
  TO authenticated
  USING (
    chat_id IN (SELECT id FROM public.chats WHERE created_by = auth.uid())
    OR user_id = auth.uid()
    OR chat_id IN (SELECT id FROM public.chats WHERE is_private = false AND is_group = true)
  );

-- INSERT Policy: Users can only insert themselves, or creators can add participants
CREATE POLICY "Insert chat participant"
  ON public.chat_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (public.can_join_chat(chat_id, user_id));

-- UPDATE Policy: Users can update their own rows, or chat creators can update any
CREATE POLICY "Update chat participant"
  ON public.chat_participants
  FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid()
    OR chat_id IN (SELECT id FROM public.chats WHERE created_by = auth.uid())
  );

-- Comment explaining the fix
COMMENT ON FUNCTION public.can_join_chat(uuid, uuid) IS
  'SECURITY DEFINER function to check if a user can join a chat without triggering RLS recursion. ' ||
  'Used by the "Insert chat participant" policy on chat_participants. ' ||
  'Returns true if: 1) user_id matches the authenticated user, ' ||
  '2) the authenticated user created the chat, ' ||
  '3) the chat is a public group chat.';

COMMENT ON POLICY "View chat participants" ON public.chat_participants IS
  'Allows users to view participants in chats they created, chats they are members of, ' ||
  'and public group chats.';

COMMENT ON POLICY "Insert chat participant" ON public.chat_participants IS
  'Allows users to insert themselves as participants using can_join_chat() function. ' ||
  'The SECURITY DEFINER function prevents RLS recursion by bypassing RLS when checking chat details.';

COMMENT ON POLICY "Update chat participant" ON public.chat_participants IS
  'Allows users to update their own participation record or chat creators to update any participant.';

-- Verification query (for manual testing, not executed):
-- SELECT polname, polcmd, permissive, roles, qual, with_check
-- FROM pg_policies
-- WHERE tablename = 'chat_participants';
