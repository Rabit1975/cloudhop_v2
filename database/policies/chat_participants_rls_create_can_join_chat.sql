

DO $
BEGIN
  -- Drop "Join chat" policy if it exists
  IF EXISTS (
    SELECT 1 FROM pg_policies p
    JOIN pg_class c ON p.policyrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE p.polname = 'Join chat'
      AND n.nspname = 'public'
      AND c.relname = 'chat_participants'
  ) THEN
    EXECUTE 'DROP POLICY "Join chat" ON public.chat_participants';
  END IF;

  -- Drop any "Users can" INSERT policies that might conflict
  DELETE FROM pg_policies p
  USING pg_class c, pg_namespace n
  WHERE p.policyrelid = c.oid
    AND c.relnamespace = n.oid
    AND n.nspname = 'public'
    AND c.relname = 'chat_participants'
    AND p.polname LIKE 'Users can%'
    AND p.polcmd = 'INSERT';
END $;

-- 2. Create can_join_chat function (SECURITY DEFINER, STABLE)
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

-- 3. Grant execute to authenticated for the policy, revoke from anon for security
GRANT EXECUTE ON FUNCTION public.can_join_chat(uuid, uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_join_chat(uuid, uuid) FROM anon;

-- 4. Create corrected "Join chat" policy using the function
CREATE POLICY "Join chat"
  ON public.chat_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (public.can_join_chat(chat_id, user_id));