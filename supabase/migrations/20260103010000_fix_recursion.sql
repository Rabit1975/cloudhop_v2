-- Fix Infinite Recursion in Chat Policies

-- The previous policy implementation caused infinite recursion because:
-- 1. "View chats" policy selected `get_user_chat_ids`
-- 2. `get_user_chat_ids` selected from `chat_participants`
-- 3. `chat_participants` "View participants" policy checked `chat_id` in `get_user_chat_ids`
-- 4. This created a loop: chats -> participants -> chats -> participants...

-- FIX: We will redefine `get_user_chat_ids` to be simpler and NOT depend on RLS.
-- By setting the function to `SECURITY DEFINER` and NOT using any RLS-protected tables inside it (or ensuring the user has direct access), we break the loop.
-- However, the real fix is to avoid circular dependency in the policies themselves.

-- 1. Drop the problematic function and policies first
DROP POLICY IF EXISTS "View participants" ON public.chat_participants;
DROP POLICY IF EXISTS "View chats" ON public.chats;
DROP FUNCTION IF EXISTS get_user_chat_ids(uuid);

-- 2. Create a clean, optimized function to get chat IDs for a user
-- This function runs as the owner (SECURITY DEFINER), bypassing RLS on `chat_participants` to avoid recursion.
CREATE OR REPLACE FUNCTION get_my_chat_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT chat_id FROM public.chat_participants WHERE user_id = auth.uid();
$$;

-- 3. Re-create "View participants" policy
-- Users can see participants of a chat IF:
-- a) They are a participant of that chat themselves
-- b) OR the chat is public (we need to join with chats table, but carefully)
CREATE POLICY "View participants"
  ON public.chat_participants FOR SELECT
  USING (
    -- User is a participant in this chat
    chat_id IN (SELECT get_my_chat_ids())
    OR 
    -- Chat is public (requires joining chats, but `chats` policy shouldn't check participants to avoid loop)
    EXISTS (SELECT 1 FROM public.chats WHERE id = chat_id AND is_private = false)
  );

-- 4. Re-create "View chats" policy
-- Users can see a chat IF:
-- a) They are in the `chat_participants` table for that chat (using our safe function)
-- b) OR the chat is not private
CREATE POLICY "View chats"
  ON public.chats FOR SELECT
  USING (
    id IN (SELECT get_my_chat_ids())
    OR 
    is_private = false
  );

-- 5. Fix "Join chat" policy just in case
DROP POLICY IF EXISTS "Join chat" ON public.chat_participants;
CREATE POLICY "Join chat"
  ON public.chat_participants FOR INSERT
  WITH CHECK (
    auth.uid() = user_id 
    OR 
    -- Allow chat creators to add people
    EXISTS (SELECT 1 FROM public.chats WHERE id = chat_id AND created_by = auth.uid())
  );
