-- apply_rls_and_validate.sql
-- Idempotent CREATE POLICY + ENABLE RLS statements

-- ========== auth.users policies ==========
-- users_select_own
-- Note: Using conditional creation via checking pg_policy before running CREATE POLICY.
-- The syntax below uses a DO block for cleaner execution in Postgres.

DO $$
BEGIN
  -- 1) users_select_own
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'users_select_own' AND polrelid = 'auth.users'::regclass) THEN
    CREATE POLICY users_select_own ON auth.users FOR SELECT TO authenticated USING ((SELECT auth.uid())::uuid = id);
  END IF;

  -- 2) users_insert_own
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'users_insert_own' AND polrelid = 'auth.users'::regclass) THEN
    CREATE POLICY users_insert_own ON auth.users FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid())::uuid = id);
  END IF;

  -- 3) users_update_own
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'users_update_own' AND polrelid = 'auth.users'::regclass) THEN
    CREATE POLICY users_update_own ON auth.users FOR UPDATE TO authenticated USING ((SELECT auth.uid())::uuid = id) WITH CHECK ((SELECT auth.uid())::uuid = id);
  END IF;

  -- 4) users_delete_own
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'users_delete_own' AND polrelid = 'auth.users'::regclass) THEN
    CREATE POLICY users_delete_own ON auth.users FOR DELETE TO authenticated USING ((SELECT auth.uid())::uuid = id);
  END IF;
END $$;

-- Enable RLS on auth.users
ALTER TABLE IF EXISTS auth.users ENABLE ROW LEVEL SECURITY;

-- ========== auth.sessions policy ==========
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'sessions_user' AND polrelid = 'auth.sessions'::regclass) THEN
    CREATE POLICY sessions_user ON auth.sessions FOR ALL TO authenticated USING (user_id = (SELECT auth.uid())::uuid) WITH CHECK (user_id = (SELECT auth.uid())::uuid);
  END IF;
END $$;

ALTER TABLE IF EXISTS auth.sessions ENABLE ROW LEVEL SECURITY;

-- ========== auth.refresh_tokens ==========
-- Create select policy if table exists and policy missing
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON c.relnamespace = n.oid WHERE n.nspname='auth' AND c.relname='refresh_tokens') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'refresh_tokens_session_owner' AND polrelid = 'auth.refresh_tokens'::regclass) THEN
      EXECUTE 'CREATE POLICY refresh_tokens_session_owner ON auth.refresh_tokens FOR SELECT TO authenticated USING (session_id IN (SELECT id FROM auth.sessions WHERE user_id = (SELECT auth.uid())::uuid))';
    END IF;
  END IF;
END $$;
