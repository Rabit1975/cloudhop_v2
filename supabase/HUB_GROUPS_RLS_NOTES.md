# Hub Groups RLS Implementation Notes

## Overview
Implemented comprehensive Row Level Security (RLS) policies for the `hub_groups` table to ensure secure group management within CloudHop's HopHub system.

## Migration File
**File:** `supabase/migrations/20260122010000_hub_groups_rls_policies.sql`

## What This Migration Does

### 1. Performance Indexes
Created optimized indexes for common query patterns:
- `idx_hub_groups_owner_user_id` - Fast lookups by owner
- `idx_hub_groups_tenant_id` - Multi-tenant support
- `idx_hub_groups_created_at` - Time-based queries
- `idx_hub_groups_is_active` - Active group filtering

### 2. RLS Policies
**Four comprehensive policies covering all CRUD operations:**

#### INSERT Policy: "Users can create groups"
- **Who:** Authenticated users
- **Condition:** `owner_user_id = auth.uid()`
- **Purpose:** Users can only create groups where they are the owner

#### SELECT Policy: "Users can view accessible groups"
- **Who:** Authenticated users
- **Condition:** User owns the group OR is an active member
- **Purpose:** Users can see groups they own or are members of
- **Uses:** Subquery against `hub_group_members` table

#### UPDATE Policy: "Owners can update groups"
- **Who:** Authenticated users
- **Condition:** `owner_user_id = auth.uid()`
- **Purpose:** Only group owners can modify group settings

#### DELETE Policy: "Owners can delete groups"
- **Who:** Authenticated users
- **Condition:** `owner_user_id = auth.uid()`
- **Purpose:** Only group owners can delete their groups

## Security Features

### 1. Owner-Based Access Control
- All operations require `owner_user_id = auth.uid()`
- Prevents privilege escalation or unauthorized access
- Ensures clear ownership boundaries

### 2. Member-Based Visibility
- SELECT policy includes membership checking
- Uses `EXISTS` subquery for efficient member validation
- Supports both owners and active members

### 3. Multi-Tenant Support
- Optional `tenant_id` field for multi-tenant deployments
- Indexed for performance in tenant-scoped queries
- Policies don't restrict by tenant (flexible for different models)

## Client Code Requirements

### Required Fields for INSERT
When creating groups, client code MUST include:
```typescript
const { data } = await supabase.from('hub_groups').insert({
  name: 'Group Name',
  description: 'Group description',
  owner_user_id: user.id,  // REQUIRED - passes RLS policy
  tenant_id: optionalTenantId,
  is_active: true
}).select().single();
```

### Common Query Patterns
```typescript
// Get groups I own or am member of
const { data } = await supabase.from('hub_groups').select(`
  *,
  hub_group_members!inner(
    user_id,
    role,
    is_active
  )
`);

// Get only groups I own
const { data } = await supabase.from('hub_groups')
  .select('*')
  .eq('owner_user_id', user.id);
```

## Verification

### Run the Verification Script
```bash
# In Supabase SQL Editor, run:
supabase/verify_hub_groups_rls.sql
```

### Expected Results
1. **RLS Enabled:** `rowsecurity = true`
2. **4 Policies:** insert, select, update, delete
3. **4 Indexes:** All created successfully
4. **Insert Test:** Succeeds for authenticated users
5. **Unauthorized Test:** Fails with RLS error
6. **Select Test:** Only shows accessible groups

## Performance Considerations

### Index Usage
- `owner_user_id` queries use index
- `tenant_id` queries use index
- `EXISTS` subquery optimized by `hub_group_members` indexes

### Query Optimization
- SELECT policy uses efficient `EXISTS` rather than JOIN
- Policies are written to use stable `auth.uid()` calls
- Indexes support common filter patterns

## Related Tables

### hub_group_members
This table must exist for the SELECT policy to work:
```sql
CREATE TABLE public.hub_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hub_group_id UUID REFERENCES public.hub_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Best Practices Applied

### 1. Principle of Least Privilege
- Users can only access groups they own or are members of
- No blanket permissions or public access

### 2. Stable Policy Conditions
- Uses `auth.uid()` directly (stable, cacheable)
- Avoids complex joins in policy conditions
- Policies are deterministic and efficient

### 3. Comprehensive Coverage
- All CRUD operations have policies
- No gaps in security coverage
- Clear error messages for unauthorized attempts

## Testing Checklist

After applying this migration, verify:
- [ ] Users can create groups (they become owner)
- [ ] Users can view groups they own
- [ ] Users can view groups they're members of
- [ ] Users cannot view groups they don't belong to
- [ ] Only owners can update group settings
- [ ] Only owners can delete groups
- [ ] RLS policies don't impact performance
- [ ] Indexes are being used in query plans

## Migration Dependencies

This migration assumes:
- `hub_groups` table exists with proper schema
- `hub_group_members` table exists for membership tracking
- Authentication system is properly configured

## Troubleshooting

### Common Issues
1. **"new row violates row-level security policy"**
   - Ensure `owner_user_id` is set to `auth.uid()` in INSERT
   - Check user is authenticated

2. **"no rows returned" from SELECT**
   - Verify user is owner or active member
   - Check `hub_group_members` table for membership

3. **Performance issues**
   - Verify indexes are created
   - Check query plans with EXPLAIN ANALYZE

### Debug Commands
```sql
-- Check current user
SELECT auth.uid();

-- Check group ownership
SELECT * FROM hub_groups WHERE owner_user_id = auth.uid();

-- Check group membership
SELECT * FROM hub_group_members WHERE user_id = auth.uid();
```

## Files Changed

1. **Created:** `supabase/migrations/20260122010000_hub_groups_rls_policies.sql`
2. **Created:** `supabase/verify_hub_groups_rls.sql`
3. **Created:** `supabase/HUB_GROUPS_RLS_NOTES.md`

## Next Steps

1. Apply the migration: `supabase db push`
2. Run verification script to test policies
3. Update client code to include required fields
4. Add comprehensive tests for group operations
5. Monitor performance with the new indexes
