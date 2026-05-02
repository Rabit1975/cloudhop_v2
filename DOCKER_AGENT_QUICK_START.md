# CloudHop Docker Agent: Quick Reference

## Three-Part System Explained Simply

### Part 1: Dev Agent (The Robot That Edits Your Code)

**What it does:**
- Reads and edits files in your project
- Runs npm commands (build, test, lint)
- Commits and pushes to GitHub
- All inside a container (doesn't touch your PC directly)

**Memory impact:** ~150MB (only when running)

```bash
# Start the agent
docker-compose run --rm agent

# Inside the agent, you can do:
> build              # npm run build
> test               # npm test
> lint               # npm run lint
> commit "My changes"
> push main
> read src/App.tsx   # Read a file
> run git log        # Run any command
```

---

### Part 2: AI Sidecar (The AI Companion Service)

**What it does:**
- Runs independently alongside your app
- Handles all AI requests (ChatGPT, image generation, etc.)
- Can be restarted without affecting the main app
- Talks to OpenAI API from inside the container

**Memory impact:** ~150MB (always runs)

**Available endpoints:**
```
POST http://localhost:3003/api/ai/chat       # Chat with AI
POST http://localhost:3003/api/ai/image      # Generate images
POST http://localhost:3003/api/ai/generate   # Generate text
GET  http://localhost:3003/health            # Health check
```

**Inside containers, use:** `http://ai-sidecar:3002` (no port translation needed)

---

### Part 3: Multi-Container Dev Environment

**Services running:**

```
┌─ Frontend (Vite React)
│  Port: 5173
│  Command: npm run dev
│  Access: http://localhost:5173

├─ API (Express Backend)
│  Port: 3002
│  Command: npm run dev:server
│  Access: http://localhost:3002

├─ OAuth (Google Auth)
│  Port: 3001
│  Command: npm run dev:oauth
│  Access: http://localhost:3001

├─ AI Sidecar (OpenAI Service)
│  Port: 3003 (external) / 3002 (internal)
│  Command: npx tsx src/server/ai-service.ts
│  Access: http://localhost:3003/health

└─ Dev Agent (on demand)
   Command: Interactive CLI
   Access: docker-compose run --rm agent
```

---

## Memory Reality

| Service | RAM | Location |
|---------|-----|----------|
| Docker base | 300MB | Your PC |
| Frontend | 200MB | Container |
| API | 150MB | Container |
| OAuth | 100MB | Container |
| AI Sidecar | 150MB | Container |
| **Total** | **900MB** | **All isolated** |

**Your PC:** Only ~300MB used by Docker Desktop itself. Containers are isolated, not stealing from Windows.

---

## Setup (5 minutes)

### Step 1: Copy environment
```bash
cp .env.agent .env
```

### Step 2: Edit .env
Add these to your `.env` file:
```
OPENAI_API_KEY=sk-your-key-here
GITHUB_TOKEN=ghp_your-token-here
```

### Step 3: Start everything
```bash
docker-compose up
```

This starts: Frontend, API, OAuth, AI Sidecar

### Step 4: In another terminal, start the agent
```bash
docker-compose run --rm agent
```

---

## Real-World Example Workflow

### Scenario: Fix a bug, run tests, push to GitHub

```bash
# Terminal 1: Start all services
docker-compose up
# Now you have frontend at http://localhost:5173
# API at http://localhost:3002
# AI at http://localhost:3003

# Terminal 2: Access the agent
docker-compose run --rm agent

# Inside the agent container, you can now:
> read src/App.tsx
# (Agent reads and shows you the file)

# Make a change using your PC's editor, then:
> build
# (Agent runs npm run build inside the container)

> test
# (Agent runs npm test)

> status
# (Agent shows git status)

> commit "Fix App.tsx bug"
# (Agent stages all files and commits)

> push main
# (Agent pushes to GitHub)

> exit
# (Agent shuts down)
```

---

## Common Commands

### Start services
```bash
# All services
docker-compose up

# Just frontend + AI (no backend)
docker-compose up frontend ai-sidecar

# Everything except production build
docker-compose up -d
```

### Access agent
```bash
# Interactive mode
docker-compose run --rm agent

# Run one command then exit
docker-compose run --rm agent npm run build
```

### Stop everything
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f frontend
docker-compose logs -f ai-sidecar
docker-compose logs -f api
```

### Check container status
```bash
docker-compose ps
```

### Rebuild images (after code changes)
```bash
docker-compose build
```

---

## Where Everything Lives

```
Your CloudHop Project
├── Dockerfile.agent      ← Dev agent image (git, npm, Docker CLI)
├── Dockerfile.ai         ← AI sidecar image (Node + OpenAI SDK)
├── Dockerfile.dev        ← Dev image (Node + npm)
├── docker-compose.yml    ← All 5 services defined here
├── scripts/
│   └── local-agent.ts    ← Agent interactive CLI
├── src/server/
│   └── ai-service.ts     ← AI sidecar Express server
├── .env.agent            ← Environment config template
├── AGENT_SETUP.md        ← Full documentation
└── setup-agent.sh        ← Setup helper script
```

---

## Troubleshooting

### Q: Agent can't edit files
**A:** Make sure `.env` has the correct paths and docker-compose.yml has:
```yaml
volumes:
  - ./:/workspace
```

### Q: AI sidecar not responding
**A:** Check if OpenAI API key is set:
```bash
docker-compose logs ai-sidecar
curl http://localhost:3003/health
```

### Q: Frontend can't reach API
**A:** Check API is running:
```bash
docker-compose ps
docker-compose logs api
```

### Q: Out of memory
**A:** Stop unused containers:
```bash
docker-compose down
docker system prune
```

### Q: How do I use the AI from my frontend?
**A:**
```typescript
const response = await fetch('http://ai-sidecar:3002/api/ai/chat', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Hello' }),
});
```

From outside Docker, use `http://localhost:3003` instead of `http://ai-sidecar:3002`.

---

## Next Steps

1. ✅ Edit `.env` with your API keys
2. ✅ Run `docker-compose up`
3. ✅ Open http://localhost:5173
4. ✅ In another terminal: `docker-compose run --rm agent`
5. ✅ Inside agent: `> build` then `> test`

---

## Questions?

See the full guide: `AGENT_SETUP.md`

Or run: `docker-compose run --rm agent help`
