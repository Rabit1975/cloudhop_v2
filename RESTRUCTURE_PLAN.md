# CloudHop v2 - Project Restructure Plan

## Current Issues:
- Files scattered across multiple locations
- Corrupted Layout_corrupted.tsx with JSX syntax errors
- SpectrumState.ts with TypeScript errors
- Missing proper folder structure
- Path alias conflicts

## New Structure:
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Button, Input, etc.
│   ├── layout/         # Layout components
│   └── music/          # Music-related components
├── pages/              # Route pages
├── modules/            # Feature modules
│   ├── hophub/
│   ├── spaces/
│   ├── profile/
│   ├── settings/
│   └── music/
├── core/               # Core business logic
│   ├── api/           # API clients
│   ├── auth/          # Authentication
│   ├── music/         # Music services
│   └── utils/         # Utilities
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
├── styles/             # Global styles
└── assets/             # Static assets
```

## Files to Fix:
1. Remove Layout_corrupted.tsx
2. Fix SpectrumState.ts TypeScript errors
3. Fix SpectrumRuntime.tsx syntax
4. Reorganize all scattered components
5. Fix import paths throughout

## Priority:
1. Fix TypeScript errors first
2. Remove corrupted files
3. Reorganize structure
4. Fix all imports
5. Test build

This will be a complete restructure for a clean, working project.
