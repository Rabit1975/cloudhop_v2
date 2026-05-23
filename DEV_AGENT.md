# Dev Agent - Hybrid Workflow

## Overview

The Dev Agent is a **Hybrid approach** for CloudHop development:

- **You = Strategist** - Define what needs to be done
- **Dev Agent = Grunt Worker** - Handles repetitive tasks (build, test, commit, push)
- **Me = Main Dev** - Complex code changes and architecture decisions

This keeps you focused on strategy while the agent automates boring stuff.

---

## Quick Start

### Interactive Mode (Recommended)
```bash
npm run agent
```

You'll see a prompt:
```
╔════════════════════════════════════════╗
║     CloudHop Dev Agent (Hybrid)        ║
║   You = Strategy, Me = Grunt Work      ║
╚════════════════════════════════════════╝

agent> _
```

### Command Mode
```bash
npm run agent build
npm run agent test
npm run agent commit "Fix Music component"
npm run agent push production
```

---

## Available Commands

### Git Operations

```bash
agent> status              # Show git status
agent> add                 # Stage all changes
agent> add src/pages/*.tsx # Stage specific files
agent> commit "message"    # Commit staged changes
agent> push                # Push to production branch
agent> push main           # Push to specific branch
agent> log                 # Show last 5 commits
agent> log 10              # Show last 10 commits
```

### Build & Test

```bash
agent> build               # npm run build
agent> dev                 # npm run dev (starts dev server)
agent> test                # npm run test
agent> lint                # npm run lint
agent> lint:fix            # npm run lint:fix
```

### High-Level Workflows

```bash
agent> commit-push "Your message"    # Stage → Commit → Push
agent> build-push "Your message"     # Build → Stage → Commit → Push
```

### File Operations

```bash
agent> read src/pages/Music.tsx      # Read file contents
agent> ls src                        # List directory
agent> ls .                          # List current directory
```

### Other

```bash
agent> help                          # Show this menu
agent> exit                          # Exit the agent
```

---

## Workflow Examples

### Scenario 1: You Make Changes, Agent Commits

**You edit files in VS Code:**
```
src/pages/GameHub.tsx - modified
src/components/Game.tsx - modified
```

**You use the agent:**
```bash
npm run agent
agent> status
agent> commit "Improve GameHub UI"
agent> push
```

Done! Changes committed and pushed.

---

### Scenario 2: Build, Test, and Deploy

**Quick workflow:**
```bash
npm run agent
agent> build          # Runs npm run build
agent> test           # Runs tests
agent> commit "Build tested and ready"
agent> push           # Push to production
```

Or use the workflow command:
```bash
agent> build-push "Build tested"
```

---

### Scenario 3: Multiple Quick Commits

```bash
agent> commit-push "Fix GameHub pagination"
agent> commit-push "Update Music component"
agent> commit-push "Add OAuth routes"
```

Each command stages, commits, and pushes.

---

## How It Works

### The Hybrid Model

```
YOU                     DEV AGENT            ME
├─ What to build? ──→   Agent does ──→    Complex code
├─ Fix this bug? ───→   grunt work
└─ Deploy now?  ────→   Build, test, push
                        commit, repeat
```

**You decide WHAT**  
**Agent does HOW** (automatically)  
**I handle WHY** (architecture, complexity)

---

## Integration With My Work

When you tell me "Add AI to the Music page":

1. **I write the code** and create/modify files
2. **You see changes in VS Code**
3. **You use the agent to commit:**
   ```bash
   npm run agent
   agent> status        # Review changes
   agent> commit-push "Add AI playlist generator"
   ```

Done! No manual git commands needed.

---

## Automating Common Tasks

### Build Before Every Commit
```bash
npm run agent build-push "Your commit message"
```

### Test Every Feature
```bash
npm run agent
agent> test
agent> commit "Tests passing"
agent> push
```

### Deploy Multiple Changes
```bash
npm run agent
agent> commit-push "Feature A"
agent> commit-push "Feature B"
agent> commit-push "Feature C"
```

---

## What the Agent CAN'T Do

- ❌ Make code decisions (that's my job)
- ❌ Understand requirements (that's your job)
- ❌ Refactor code intelligently (that's me)
- ❌ Have conversations (that's you + me)

---

## What the Agent CAN Do

- ✅ Run builds automatically
- ✅ Run tests automatically
- ✅ Stage and commit automatically
- ✅ Push to GitHub automatically
- ✅ Show git status
- ✅ Read files
- ✅ List directories
- ✅ Run any npm command

---

## Pro Tips

1. **Use `commit-push` for quick changes:**
   ```bash
   agent> commit-push "Update ads.txt"
   ```

2. **Check status before committing:**
   ```bash
   agent> status
   agent> commit "message"
   ```

3. **Build before pushing big changes:**
   ```bash
   agent> build
   agent> commit-push "Major refactor"
   ```

4. **Use log to check what you're committing:**
   ```bash
   agent> log 3
   agent> commit "message"
   ```

---

## Exit the Agent

```bash
agent> exit
```

Or press `Ctrl+C` in the terminal.

---

## Troubleshooting

**Agent says "Command failed"?**
- Check git status: `agent> status`
- Make sure files are saved in VS Code
- Try staging specific files: `agent> add src/pages/Music.tsx`

**Push says "your branch is behind"?**
- Pull first: `git pull origin production`
- Then try pushing again

**Build fails?**
- Check errors in terminal
- Fix issues in VS Code
- Try building again: `agent> build`

---

## The Philosophy

This agent is NOT trying to replace me. It's a **tool to handle repetitive work** so you can focus on strategy and I can focus on complex development.

**You shouldn't need to type git commands anymore.** Just tell me what you want, use the agent for grunt work, and we ship features faster.

---

## Questions?

- Agent not working? Check it's running with `npm run agent help`
- Need to build something? Tell me and I'll handle the code
- Want to automate a new workflow? Let me know and I'll add it

**Summary:**
```
YOU → Tell me what you want
ME → Build the code
AGENT → Push it to GitHub
```

Let's ship! 🚀
