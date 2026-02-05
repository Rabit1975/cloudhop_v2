-- Fix Chat Participants Recursion Issue
-- This migration addresses the infinite recursion detected in policy for relation "chat_participants"
-- by creating a SECURITY DEFINER function that bypasses RLS when checking if a user can join a chat.

-- Ensure unique constraint exists on chat_participants to prevent duplicates
-- This is needed for the ON CONFLICT DO NOTHING clause in the trigger
DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'chat_participants_chat_id_user_id_key'
  ) THEN
    ALTER TABLE public.chat_participants 
    ADD CONSTRAINT chat_participants_chat_id_user_id_key 
    UNIQUE (chat_id, user_id);
  END IF;
END $do$;

-- Create a helper function that checks if a user can join a chat without triggering RLS recursion
CREATE OR REPLACE FUNCTION can_join_chat(chat_uuid uuid, user_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $func$
DECLARE
  chat_creator_id uuid;
  chat_is_private boolean;
BEGIN
  -- Get the creator and privacy setting of the chat without triggering RLS
  -- SECURITY DEFINER allows us to bypass RLS policies
  SELECT created_by, COALESCE(is_private, false) INTO chat_creator_id, chat_is_private
  FROM public.chats
  WHERE id = chat_uuid;
  
  -- Return false if chat doesn't exist
  IF chat_creator_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- User can join if:
  -- 1. They are the creator of the chat, OR
  -- 2. The chat is public (not private)
  RETURN (chat_creator_id = user_uuid) OR (chat_is_private = false);
END;
$func$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION can_join_chat(uuid, uuid) TO authenticated;

-- Create a trigger function to automatically add the creator as a participant when a chat is created
CREATE OR REPLACE FUNCTION auto_add_chat_creator()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $trigger$
BEGIN
  -- Insert the creator as a participant in the new chat
  -- SECURITY DEFINER allows this to bypass RLS policies
  INSERT INTO public.chat_participants (chat_id, user_id)
  VALUES (NEW.id, NEW.created_by)
  ON CONFLICT DO NOTHING;
  
  RETURN NEW;
END;
$trigger$;

-- Create the trigger to run after a chat is inserted
DROP TRIGGER IF EXISTS trigger_auto_add_chat_creator ON public.chats;
CREATE TRIGGER trigger_auto_add_chat_creator
  AFTER INSERT ON public.chats
  FOR EACH ROW
  EXECUTE FUNCTION auto_add_chat_creator();

-- Update the "Join chat" policy to use the new function instead of directly querying chats
DROP POLICY IF EXISTS "Join chat" ON public.chat_participants;
CREATE POLICY "Join chat"
  ON public.chat_participants FOR INSERT
  WITH CHECK (
    -- Users can insert themselves if they can join the chat
    (SELECT auth.uid()) = user_id 
    AND can_join_chat(chat_id, (SELECT auth.uid()))
  );

-- Ensure the "View participants" policy is optimized with subselect for auth.uid()
DROP POLICY IF EXISTS "View participants" ON public.chat_participants;
CREATE POLICY "View participants"
  ON public.chat_participants FOR SELECT
  USING (
    chat_id IN (SELECT get_user_chat_ids((SELECT auth.uid())))
  );

-- Ensure the "View chats" policy is optimized
DROP POLICY IF EXISTS "View chats" ON public.chats;
CREATE POLICY "View chats"
  ON public.chats FOR SELECT
  USING (
    id IN (SELECT get_user_chat_ids((SELECT auth.uid())))
    OR 
    is_private = false
  );

-- Add an update policy for chat_participants if users need to update their status
DROP POLICY IF EXISTS "Update own participation" ON public.chat_participants;
CREATE POLICY "Update own participation"
  ON public.chat_participants FOR UPDATE
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Add a delete policy for chat_participants if users need to leave chats
DROP POLICY IF EXISTS "Leave chat" ON public.chat_participants;
CREATE POLICY "Leave chat"
  ON public.chat_participants FOR DELETE
  USING ((SELECT auth.uid()) = user_id);

-- Comment explaining the fix
COMMENT ON FUNCTION can_join_chat(uuid, uuid) IS 
  'SECURITY DEFINER function to check if a user can join a chat without triggering RLS recursion. ' ||
  'Used by the "Join chat" policy on chat_participants to break circular dependency with chats table RLS.';
