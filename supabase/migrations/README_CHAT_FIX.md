# Chat Participants Recursion Fix

## Problem
When creating a new channel/chat in HopHub, users were getting the error:
```
Failed to create chat: infinite recursion detected in policy for relation "chat_participants"
```

## Root Cause
The RLS policies on `chats` and `chat_participants` tables had a circular dependency:

1. The "Create chats" policy checked if the user is the creator
2. When inserting into `chat_participants`, the "Join chat" policy tried to verify the chat exists and was created by the user
3. This queried the `chats` table, which triggered RLS evaluation again, creating an infinite recursion loop

## Solution (Migration 20260104000000_fix_chat_participants_recursion.sql)

### 1. Created `can_join_chat()` Function
A `SECURITY DEFINER` function that checks if a user can join a chat **without** triggering RLS:
- Bypasses RLS policies when checking the chats table
- Returns `true` if the user is the creator OR the chat is public
- Returns `false` if the chat doesn't exist

### 2. Created `auto_add_chat_creator()` Trigger
A trigger that automatically adds the chat creator as a participant when a chat is created:
- Runs after INSERT on the `chats` table
- Uses `SECURITY DEFINER` to bypass RLS during the insertion
- Inserts the creator into `chat_participants` automatically
- Uses `ON CONFLICT DO NOTHING` to handle race conditions

### 3. Updated "Join chat" Policy
Replaced the recursive query with a call to `can_join_chat()`:
```sql
WITH CHECK (
  (SELECT auth.uid()) = user_id 
  AND can_join_chat(chat_id, (SELECT auth.uid()))
)
```

### 4. Optimized Other Policies
- Wrapped `auth.uid()` calls in subselects for better performance
- Added UPDATE and DELETE policies for chat_participants
- Ensured all policies use the optimized pattern

## How It Works

When a user creates a chat:
1. User inserts into `chats` table → passes "Create chats" policy (no recursion)
2. Trigger `auto_add_chat_creator()` fires automatically
3. Trigger inserts creator into `chat_participants` using `SECURITY DEFINER` (bypasses RLS entirely)
4. No policy evaluation loop occurs because the trigger bypasses RLS

When a user joins an existing chat:
1. User inserts into `chat_participants`
2. "Join chat" policy calls `can_join_chat()` function
3. Function queries `chats` table using `SECURITY DEFINER` (bypasses RLS)
4. No recursion because the function doesn't trigger RLS policies

## Benefits
- ✅ Breaks the circular dependency between chats and chat_participants
- ✅ Automatically adds creators as participants (better UX)
- ✅ Maintains security (users can only join public chats or chats they created)
- ✅ Better performance (subselect optimization for auth.uid())
- ✅ Supports future features (UPDATE/DELETE policies for participants)
