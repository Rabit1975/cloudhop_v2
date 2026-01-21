BEGIN;

-- 1. Helper functions (SECURITY DEFINER to break recursion)
CREATE OR REPLACE FUNCTION public.get_user_chat_ids(p_user_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT chat_id FROM public.chat_participants WHERE user_id = p_user_id;
$$;

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

-- 2. Drop existing policies
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

-- 3. Apply new policies for 'public.chats'
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

-- 4. Apply new policies for 'public.chat_participants'
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_participants" ON public.chat_participants
  FOR SELECT TO authenticated
  USING (
    public.can_access_chat(chat_id, auth.uid())
  );

CREATE POLICY "insert_participants" ON public.chat_participants
  FOR INSERT TO authenticated
  WITH CHECK (
    (user_id = auth.uid() AND public.can_access_chat(chat_id, auth.uid()))
    OR
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

-- 5. Trigger for auto-adding creator
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

-- 6. Permissions
GRANT EXECUTE ON FUNCTION public.get_user_chat_ids(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_chat(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_chat_creator(uuid, uuid) TO authenticated;

-- 7. Alias for backward compatibility
CREATE OR REPLACE FUNCTION public.can_join_chat(p_chat_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT public.can_access_chat(p_chat_id, p_user_id);
$$;
GRANT EXECUTE ON FUNCTION public.can_join_chat(uuid, uuid) TO authenticated;

COMMIT;