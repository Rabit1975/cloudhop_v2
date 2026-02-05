BEGIN;

-- 1. Ensure the constraints exist and are named correctly for PostgREST to detect them
-- We use ALTER TABLE to add the constraints if they are missing.
-- Note: If they already exist with different names, we might need to drop them first, 
-- but IF NOT EXISTS is safer for a migration.

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

-- 2. Notify PostgREST to reload the schema cache
-- This is crucial for the API to recognize the new relationships immediately.
NOTIFY pgrst, 'reload config';

COMMIT;
