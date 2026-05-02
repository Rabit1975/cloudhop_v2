# CloudHop Docker Agent Setup Guide

## Overview

This guide explains how to use CloudHop's Docker-based agent system:

1. **Dev Agent** — Autonomous agent that can edit your repo and run commands
2. **AI Sidecar** — Companion service that handles AI operations
3. **Multi-container Dev Environment** — Frontend, API, OAuth, all isolated

---

## Architecture

```
Your PC (Host)
    ↓
Docker Desktop
    ├─ cloudhop-agent (dev-agent container)
    │   └─ Can edit files, run npm, commit/push
    ├─ cloudhop-frontend (Vite React)
    │   └─ Port 5173
    ├─ cloudhop-api (Express backend)
    │   └─ Port 3002
    ├─ cloudhop-oauth (OAuth handler)
    │   └─ Port 3001
    └─ cloudhop-ai-sidecar (AI service)
        └─ Port 3003 (exposed) / 3002 (internal)
```

**Key Point:** Everything runs in isolated containers. Your PC RAM only hosts Docker itself (~300MB base).

---

## Quick Start

### 1. Setup

```bash
# Copy the agent config
cp .env.agent .env

# Edit .env and add your API keys
# - OPENAI_API_KEY (for AI sidecar)
# - GITHUB_TOKEN (for agent commits)
```

### 2. Start the Dev Environment

```bash
# Start all services (frontend, API, OAuth, AI sidecar)
docker-compose up

# In another terminal, access the agent
docker-compose run --rm agent
```

### 3. Use the Agent Interactively

Once inside the agent container:

```bash
# Show help
> help

# Build CloudHop
> build

# Run tests
> test

# Check git status
> status

# Make changes, then commit
> commit "Update feature X"

# Push to GitHub
> push main

# Or just use bash commands directly
> npm install
> npm run lint:fix
> git log --oneline
```

---

## Services & What They Do

### Frontend (`cloudhop-frontend`)
- **Image:** Dockerfile.dev (Node.js + npm)
- **Port:** 5173
- **Command:** `npm run dev`
- **What:** Vite React development server with hot reload

**Access:** http://localhost:5173

---

### API (`cloudhop-api`)
- **Image:** Node 20 Alpine
- **Port:** 3002
- **Command:** `npm run dev:server`
- **What:** Express backend for CloudHop

**Access:** http://localhost:3002
**Used by:** Frontend (VITE_API_BASE_URL=http://api:3002/api)

---

### OAuth Service (`cloudhop-oauth`)
- **Image:** Node 20 Alpine
- **Port:** 3001
- **Command:** `npm run dev:oauth`
- **What:** Google OAuth 2.0 handler

**Access:** http://localhost:3001
**Used by:** Frontend for login

---

### AI Sidecar (`cloudhop-ai-sidecar`)
- **Image:** Dockerfile.ai (Node.js + OpenAI SDK)
- **Port:** 3003 (external) / 3002 (internal)
- **Command:** `npx tsx src/server/ai-service.ts`
- **What:** Autonomous AI service running independently

**Endpoints:**
```
POST http://ai-sidecar:3002/api/ai/chat       # Chat with AI
POST http://ai-sidecar:3002/api/ai/image      # Generate images
POST http://ai-sidecar:3002/api/ai/generate   # Generate text
GET  http://ai-sidecar:3002/health            # Health check
```

**From outside Docker:** http://localhost:3003

---

### Dev Agent (`cloudhop-agent`)
- **Image:** Dockerfile.agent (Node.js + git + Docker CLI)
- **Volume:** Maps your entire project as `/workspace`
- **Command:** `npx tsx scripts/local-agent.ts`
- **What:** Interactive agent for repo management

**Access:**
```bash
docker-compose run --rm agent
```

---

## Memory Usage & Impact

| Component | RAM | Where |
|-----------|-----|-------|
| Docker base | ~300MB | Your PC (background) |
| Frontend container | ~200MB | Container (isolated) |
| API container | ~150MB | Container (isolated) |
| OAuth container | ~100MB | Container (isolated) |
| AI sidecar | ~150MB | Container (isolated) |
| Agent (when running) | ~150MB | Container (temporary) |
| **TOTAL** | ~1.05GB | All containerized |

**Your PC:** Only Docker Desktop itself uses ~300MB. Containers are isolated.

**Unused containers:** Can be stopped to free memory:
```bash
docker-compose stop api oauth  # Keep frontend and sidecar
docker system prune            # Remove unused images/volumes
```

---

## Common Commands

### Start all services
```bash
docker-compose up
```

### Start only frontend + AI sidecar
```bash
docker-compose up frontend ai-sidecar
```

### Start only the dev environment (for local testing)
```bash
docker-compose up frontend api oauth ai-sidecar
```

### Access the agent
```bash
docker-compose run --rm agent
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f frontend
docker-compose logs -f api
docker-compose logs -f ai-sidecar
```

### Rebuild images (after Dockerfile changes)
```bash
docker-compose build --no-cache
```

---

## Using the Dev Agent

### Interactive Mode

```bash
docker-compose run --rm agent

# Inside the container:
> build
> npm run lint:fix
> commit "Fix linting errors"
> push main
```

### Commands Available

| Command | What it does |
|---------|---|
| `build` | Run `npm run build` |
| `lint` | Run linter |
| `test` | Run tests |
| `install` | Install dependencies |
| `status` | Show git status |
| `commit <msg>` | Stage and commit changes |
| `push [branch]` | Push to GitHub |
| `docker` | Show running containers |
| `read <file>` | Read a file |
| `ls [dir]` | List directory |
| `run <cmd>` | Run any shell command |

### Example Workflow

```bash
# 1. Start the agent
docker-compose run --rm agent

# 2. Inside the agent container:
> npm install
> npm run build
> npm run lint:fix
> status
> commit "Optimize build and linting"
> push production
> exit
```

---

## AI Sidecar Usage

### From Frontend (JavaScript)

```typescript
// Call the AI sidecar from your React component
const response = await fetch('http://ai-sidecar:3002/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Help me write code',
    context: 'User is in the Dashboard view',
  }),
});

const { response: aiResponse } = await response.json();
console.log(aiResponse);
```

### From Backend (Node.js)

```typescript
// In your API service
const aiResponse = await fetch('http://ai-sidecar:3002/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Generate a playlist for focus',
    context: 'User is in Music section',
  }),
});
```

### Health Check

```bash
curl http://localhost:3003/health
# Returns: { "status": "ok", "service": "ai-sidecar", "openaiConfigured": true }
```

---

## Troubleshooting

### Agent can't edit files

**Problem:** Agent container can't write to your project

**Solution:** Check volume mount in docker-compose.yml:
```yaml
volumes:
  - ./:/workspace  # Current directory mapped to /workspace
```

### Frontend can't reach API

**Problem:** Frontend gets CORS error or connection refused

**Solution:** Make sure API container is running:
```bash
docker-compose logs api
docker-compose ps
```

And check the environment variable in frontend:
```yaml
VITE_API_BASE_URL: http://api:3002/api
```

### AI sidecar fails to start

**Problem:** `OPENAI_API_KEY not configured`

**Solution:** 
```bash
# Check .env file
echo $OPENAI_API_KEY

# If empty, add it:
echo "OPENAI_API_KEY=sk-..." >> .env

# Restart:
docker-compose up ai-sidecar
```

### Out of memory

**Problem:** Docker containers consuming too much RAM

**Solution:**
```bash
# Stop unused containers
docker-compose down

# Remove unused images/volumes
docker system prune -a

# Check resource usage
docker stats
```

---

## Advanced: Custom Agent Commands

You can extend the agent by editing `scripts/local-agent.ts`:

```typescript
case 'mycommand':
  const result = await this.runCommand('ls -la');
  console.log(result.stdout);
  break;
```

Then rebuild and run:
```bash
docker-compose build agent
docker-compose run --rm agent
```

---

## Files Reference

| File | Purpose |
|------|---------|
| `Dockerfile.agent` | Dev agent image (git, Docker, npm) |
| `Dockerfile.ai` | AI sidecar image (Node + OpenAI SDK) |
| `Dockerfile.dev` | Development image (Node + build tools) |
| `docker-compose.yml` | All 5 services defined |
| `scripts/local-agent.ts` | Agent interactive CLI |
| `src/server/ai-service.ts` | AI sidecar Express server |
| `.env.agent` | Example environment config |

---

## Next Steps

1. ✅ Copy `.env.agent` → `.env`
2. ✅ Add OPENAI_API_KEY and GITHUB_TOKEN
3. ✅ Run `docker-compose up`
4. ✅ Access frontend at http://localhost:5173
5. ✅ Start the agent: `docker-compose run --rm agent`
6. ✅ Try: `> build` then `> test`

---

## Questions?

- **Agent not starting:** Check `docker-compose logs agent`
- **Can't push to GitHub:** Ensure GITHUB_TOKEN in .env
- **AI sidecar fails:** Check OPENAI_API_KEY and `curl localhost:3003/health`
- **Out of memory:** Run `docker system prune` and reduce containers

Sources:
- https://docs.docker.com/compose/
- https://docs.docker.com/reference/cli/docker/container/run/
