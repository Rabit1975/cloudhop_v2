# Migration 20260104000000: Fix Chat Participants Recursion

## Summary
This migration fixes the "infinite recursion detected in policy for relation 'chat_participants'" error that occurs when creating new chats in HopHub.

## Changes Made

### 1. Added Unique Constraint
- Ensures `chat_participants` has a unique constraint on `(chat_id, user_id)`
- Required for the `ON CONFLICT DO NOTHING` clause to work properly
- Uses conditional logic to avoid errors if constraint already exists

### 2. Created `can_join_chat()` Function
**Purpose**: Check if a user can join a chat without triggering RLS recursion

**Key Features**:
- `SECURITY DEFINER` - bypasses RLS when querying the `chats` table
- Returns `true` if:
  - User is the creator of the chat, OR
  - Chat is public (not private)
- Returns `false` if chat doesn't exist

**Security**: Granted to `authenticated` users only

### 3. Created `auto_add_chat_creator()` Trigger
**Purpose**: Automatically add the chat creator as a participant when a chat is created

**Key Features**:
- `SECURITY DEFINER` - bypasses RLS when inserting into `chat_participants`
- Runs `AFTER INSERT` on `chats` table
- Uses `ON CONFLICT DO NOTHING` to handle race conditions
- Eliminates need for manual participant insertion

### 4. Updated "Join chat" Policy
**Before** (caused recursion):
```sql
WITH CHECK (
  auth.uid() = user_id 
  OR 
  exists (select 1 from public.chats where id = chat_id and created_by = auth.uid())
)
```

**After** (no recursion):
```sql
WITH CHECK (
  (SELECT auth.uid()) = user_id 
  AND can_join_chat(chat_id, (SELECT auth.uid()))
)
```

### 5. Optimized Existing Policies
- Re-implemented "View participants", "View chats" policies with optimized `auth.uid()` calls
- Added "Update own participation" policy
- Added "Leave chat" policy

## How It Solves The Problem

### Root Cause
The circular dependency was:
1. User inserts into `chats` → triggers "Create chats" policy
2. User needs to insert into `chat_participants` → triggers "Join chat" policy
3. "Join chat" policy queries `chats` table → triggers "Create chats" policy again
4. **Infinite loop**

### Solution
1. **Trigger eliminates manual insertion**: Creator is automatically added as participant by `auto_add_chat_creator()` trigger using `SECURITY DEFINER`
2. **Function breaks recursion**: `can_join_chat()` uses `SECURITY DEFINER` to query `chats` without triggering RLS policies
3. **No more circular dependency**: Policies never trigger each other

## Testing Checklist
- [ ] Create a new public chat/channel → should succeed
- [ ] Create a new private chat/channel → should succeed
- [ ] Creator should automatically be added as participant
- [ ] Join an existing public chat → should succeed
- [ ] Attempt to join a private chat (not creator) → should fail
- [ ] View chat list → should show only accessible chats
- [ ] Leave a chat → should succeed
- [ ] Update own participation → should succeed

## Rollback
If issues occur, the migration can be rolled back by:
1. Dropping the trigger: `DROP TRIGGER trigger_auto_add_chat_creator ON public.chats;`
2. Dropping the functions: `DROP FUNCTION auto_add_chat_creator(); DROP FUNCTION can_join_chat(uuid, uuid);`
3. Restoring previous policies from migration `20260101000000_fix_all_issues.sql`

## Migration Order
This migration should run **after** `20260103000000_performance_optimization.sql` to ensure all dependencies exist.

## Migration 20260105000000: Final Fix for Chat Participants Recursion

### Summary
This migration provides a definitive fix for the "infinite recursion detected" error by ensuring ALL cross-table checks between `chats` and `chat_participants` are performed through `SECURITY DEFINER` functions.

### Changes Made
1. **Unified Security Functions**: Created `can_access_chat`, `is_chat_creator`, and `get_user_chat_ids` as `SECURITY DEFINER` functions.
2. **Policy Cleanup**: Dynamically drops all existing policies on both tables to ensure no legacy conflicting policies remain.
3. **Non-Recursive Policies**: Re-implemented all policies for both tables using only these helper functions or direct column checks.
4. **Automatic Participant Trigger**: Re-confirmed the trigger that adds the chat creator as the first participant.

### Why this works
By using `SECURITY DEFINER` functions for all cross-table lookups, we bypass RLS for those specific sub-queries, breaking the chain of policy evaluations that lead to recursion.

### Diagnostic Tools
A standalone script `supabase/DIAGNOSE_AND_FIX_RLS.sql` has been provided for manual inspection and verification in the Supabase SQL Editor.
