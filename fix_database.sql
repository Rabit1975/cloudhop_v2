-- ==============================================================================
-- RUN THIS SCRIPT IN YOUR SUPABASE DASHBOARD SQL EDITOR
-- Link: https://supabase.com/dashboard/project/_/sql/new
-- ==============================================================================

-- 1. FIX INFINITE RECURSION
-- The current policies cause a loop: Chats -> Participants -> Chats.
-- We fix this by using a "SECURITY DEFINER" function that bypasses RLS for the lookup.

DROP POLICY IF EXISTS "View participants" ON public.chat_participants;
DROP POLICY IF EXISTS "View chats" ON public.chats;
DROP POLICY IF EXISTS "Join chat" ON public.chat_participants;
DROP FUNCTION IF EXISTS get_user_chat_ids(uuid);

-- Secure function to get my chats without triggering RLS loops
CREATE OR REPLACE FUNCTION get_my_chat_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT chat_id FROM public.chat_participants WHERE user_id = auth.uid();
$$;

-- New Non-Recursive Policies
CREATE POLICY "View participants" ON public.chat_participants FOR SELECT
USING (
  chat_id IN (SELECT get_my_chat_ids())
  OR EXISTS (SELECT 1 FROM public.chats WHERE id = chat_id AND is_private = false)
);

CREATE POLICY "View chats" ON public.chats FOR SELECT
USING (
  id IN (SELECT get_my_chat_ids())
  OR is_private = false
);

CREATE POLICY "Join chat" ON public.chat_participants FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
  OR EXISTS (SELECT 1 FROM public.chats WHERE id = chat_id AND created_by = auth.uid())
);


-- 2. OPTIMIZE PERFORMANCE (Add Missing Indexes)
-- Removed CONCURRENTLY to avoid transaction errors in SQL Editor.

CREATE INDEX IF NOT EXISTS idx_call_history_caller_id ON public.call_history(caller_id);
CREATE INDEX IF NOT EXISTS idx_call_history_receiver_id ON public.call_history(receiver_id);
CREATE INDEX IF NOT EXISTS idx_call_history_chat_id_created_at ON public.call_history(chat_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_chats_created_by ON public.chats(created_by);
CREATE INDEX IF NOT EXISTS idx_message_reactions_user_id ON public.message_reactions(user_id);

-- Drop unused indexes to save space
DROP INDEX IF EXISTS chat_participants_chat_id_idx;
DROP INDEX IF EXISTS messages_chat_id_idx;
DROP INDEX IF EXISTS messages_sender_id_idx;


-- 3. OPTIMIZE RLS (Reduce CPU Load)
-- Simplifies checking "Is this my data?" to avoid re-calculating user ID for every row.

DROP POLICY IF EXISTS "Users can see their own call history" ON public.call_history;
CREATE POLICY "Users can see their own call history" ON public.call_history FOR SELECT
USING ((SELECT auth.uid()) = caller_id OR (SELECT auth.uid()) = receiver_id);

DROP POLICY IF EXISTS "Create chats" ON public.chats;
CREATE POLICY "Create chats" ON public.chats FOR INSERT
WITH CHECK ((SELECT auth.uid()) = created_by);
