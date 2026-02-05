-- Fix Call History Foreign Keys
-- This migration explicitly defines the foreign key relationships between call_history and users
-- to resolve the "Could not find a relationship" error in the PostgREST API.

BEGIN;

DO $$ 
BEGIN
    -- Add foreign key for caller_id if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'call_history_caller_id_fkey'
    ) THEN
        ALTER TABLE public.call_history
        ADD CONSTRAINT call_history_caller_id_fkey
        FOREIGN KEY (caller_id)
        REFERENCES public.users(id)
        ON DELETE CASCADE;
    END IF;

    -- Add foreign key for receiver_id if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'call_history_receiver_id_fkey'
    ) THEN
        ALTER TABLE public.call_history
        ADD CONSTRAINT call_history_receiver_id_fkey
        FOREIGN KEY (receiver_id)
        REFERENCES public.users(id)
        ON DELETE CASCADE;
    END IF;
END $$;

NOTIFY pgrst, 'reload config';

COMMIT;
