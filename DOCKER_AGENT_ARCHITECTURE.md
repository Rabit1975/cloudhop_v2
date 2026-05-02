# CloudHop Docker Agent: Visual Architecture

## How Everything Connects

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          YOUR PC (HOST MACHINE)                             │
│                                                                             │
│  • VS Code (edit files)                                                     │
│  • Browser (http://localhost:5173)                                         │
│  • Terminal (docker-compose commands)                                      │
│                                                                             │
│  Docker Desktop (~300MB RAM)                                                │
│  ├─ Runs containers                                                         │
│  └─ Manages networks                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
        ┌───────────────────────────────────────────────────────────┐
        │              DOCKER INTERNAL NETWORK                      │
        │                                                            │
        │  ┌────────────────┐  ┌────────────────┐                   │
        │  │  Frontend      │  │  OAuth         │                   │
        │  │  (Vite React)  │  │  (Google Auth) │                   │
        │  │  Port 5173     │  │  Port 3001     │                   │
        │  └────────────────┘  └────────────────┘                   │
        │          ↓                    ↓                            │
        │  ┌────────────────────────────────────┐                   │
        │  │  API (Express Backend)             │                   │
        │  │  Port 3002                         │                   │
        │  │  • Handles requests from Frontend  │                   │
        │  │  • Talks to Supabase               │                   │
        │  │  • Talks to AI Sidecar             │                   │
        │  └────────────────────────────────────┘                   │
        │          ↓                                                 │
        │  ┌────────────────────────────────────┐                   │
        │  │  AI Sidecar Service                │                   │
        │  │  Port 3002 (internal)              │                   │
        │  │  • ChatGPT integration             │                   │
        │  │  • Image generation                │                   │
        │  │  • Text generation                 │                   │
        │  │  • Talks to OpenAI API             │                   │
        │  └────────────────────────────────────┘                   │
        │                                                            │
        │  ┌────────────────────────────────────┐                   │
        │  │  Dev Agent (on demand)             │                   │
        │  │  • Can edit files                  │                   │
        │  │  • Can run npm commands            │                   │
        │  │  • Can commit/push to GitHub       │                   │
        │  │  • Can run Docker commands         │                   │
        │  └────────────────────────────────────┘                   │
        │                                                            │
        └───────────────────────────────────────────────────────────┘
                    ↓                                    ↓
            ┌─────────────────┐            ┌──────────────────────┐
            │  Supabase       │            │  OpenAI API          │
            │  (Database)     │            │  (ChatGPT, DALL-E)   │
            └─────────────────┘            └──────────────────────┘
                    ↓                                    ↓
            ┌─────────────────┐            ┌──────────────────────┐
            │  GitHub         │            │  External Services   │
            │  (Git push)     │            │  (Email, etc.)       │
            └─────────────────┘            └──────────────────────┘
```

---

## Data Flow Examples

### Example 1: Frontend → API → AI Sidecar

```
Browser (localhost:5173)
    ↓
    POST /api/ai/chat
    body: { prompt: "Help me..." }
    ↓
Frontend Container (Vite)
    ↓
    fetch("http://api:3002/api/ai")
    ↓
API Container (Express)
    ↓
    fetch("http://ai-sidecar:3002/api/ai/chat")
    ↓
AI Sidecar Container
    ↓
    POST https://api.openai.com/v1/chat/completions
    ↓
OpenAI API (External)
    ↓
    Returns response
    ↓
[Response flows back through containers]
    ↓
Browser receives AI response
```

### Example 2: Dev Agent Making Changes

```
docker-compose run --rm agent
    ↓
Agent Container starts (reads ./workspace which is your project)
    ↓
> build
    ↓
npm run build (runs inside container)
    ↓
Edits compiled files in ./dist
    ↓
> commit "Update component"
    ↓
git add && git commit (inside container)
    ↓
> push production
    ↓
git push origin production (from inside container)
    ↓
Changes appear on GitHub
    ↓
> exit
    ↓
Agent container stops (temporary container removed)
```

### Example 3: Volume Mounts (How Container Sees Your Files)

```
Your PC File System                 Inside Containers
───────────────────────            ────────────────
C:\Users\rebel\Desktop\
  cloudhop_v2/                      /workspace/  (Agent sees)
    src/
    package.json
    .env
    docker-compose.yml

When you edit a file in VS Code on your PC:
    ↓
File changes immediately in container
    ↓
Frontend detects change (hot reload)
    ↓
Browser refreshes automatically

When Agent edits a file in container:
    ↓
File changes on your PC immediately
    ↓
You can see it in VS Code
```

---

## Memory Isolation

```
Your PC RAM (Example: 16GB total)
├─ Windows/System ────── ~3GB
├─ VS Code ──────────── ~1GB
├─ Other apps ───────── ~10.5GB
│
└─ Docker Desktop ────── ~1GB (isolated containers inside)
   ├─ Frontend ──────── 200MB (isolated from PC)
   ├─ API ──────────── 150MB (isolated from PC)
   ├─ OAuth ────────── 100MB (isolated from PC)
   ├─ AI Sidecar ───── 150MB (isolated from PC)
   └─ Base ────────---- 300MB (host Docker)

Key: Docker containers don't steal from your PC's RAM.
     They use memory, but it's managed separately.
     If a container is idle, its memory is released.
```

---

## Network Communication Inside Docker

```
Service names are aliases inside Docker network:

localhost (Your PC)              Service names (Docker network)
─────────────────────────────── ──────────────────────────────
http://localhost:5173      →     frontend (internal)
http://localhost:3002      →     api (internal)
http://localhost:3001      →     oauth (internal)
http://localhost:3003      →     ai-sidecar (internal: 3002)

From Frontend Container:
    fetch('http://api:3002/api/data')  ← Works! (service name)
    fetch('http://localhost:3002/...')  ← Fails! (no localhost inside container)

From React Component (inside Frontend):
    fetch('http://localhost:3003/...')  ← Works! (mapped to port 3003)
    fetch('http://ai-sidecar:3002/...')  ← Works! (service name)
```

---

## Container Lifecycle

### Dev Agent (Temporary)

```
docker-compose run --rm agent
    ↓ Creates agent container
    ↓ Mounts ./:/workspace
    ↓ Shows interactive shell
    ↓ Agent ready to receive commands
    ↓
(User exits)
    ↓ Container stops
    ↓ Container removed (--rm flag)
    ↓ Files on PC unchanged ✓
```

### AI Sidecar (Always Running)

```
docker-compose up ai-sidecar
    ↓ Creates container
    ↓ Runs: npx tsx src/server/ai-service.ts
    ↓ Listens on port 3002 (internal) / 3003 (external)
    ↓ Health check every 10 seconds
    ↓
(Continuously running)
    ↓ Accepts requests
    ↓ Responds to health checks
    ↓ Stays alive
    ↓
docker-compose down
    ↓ Container stops gracefully
    ↓ Container removed
```

### Frontend (Long-Running Dev)

```
docker-compose up frontend
    ↓ Builds image if needed
    ↓ Creates container
    ↓ Runs: npm run dev -- --host 0.0.0.0
    ↓ Listens on port 5173
    ↓
(Continuously running with hot reload)
    ↓ Watches for file changes in ./src
    ↓ Recompiles on save
    ↓ Browser refreshes automatically
    ↓
(Make changes in VS Code)
    ↓ Change reflected immediately
    ↓
docker-compose down
    ↓ Container stops
    ↓ Server shuts down
```

---

## File Permissions & Ownership

```
Your PC                     Inside Container
────────────────────────    ─────────────────
src/App.tsx (yours)    →    /workspace/src/App.tsx
                              ↓
                            Can edit freely
                              ↓
                            Changes saved back to PC
                              ↓
                            Changes visible in VS Code

Agent inside container edits file:
    ↓
File updated in /workspace/src/App.tsx (container)
    ↓
Volume mount syncs changes
    ↓
File updated at C:\Users\rebel\Desktop\cloudhop_v2\src\App.tsx (PC)
    ↓
VS Code detects file change
    ↓
You see it updated in your editor
```

---

## Environment Variables Flow

```
.env (Your PC)
    ↓
docker-compose.yml
    ↓
    Reads environment variables from .env
    ↓
Each container gets environment:
    ├─ Frontend
    │   ├─ VITE_API_BASE_URL=http://api:3002/api
    │   ├─ NODE_ENV=development
    │   └─ ...
    ├─ API
    │   ├─ PORT=3002
    │   ├─ SUPABASE_URL=...
    │   ├─ STRIPE_SECRET_KEY=...
    │   └─ ...
    ├─ AI Sidecar
    │   ├─ OPENAI_API_KEY=sk-...
    │   ├─ OPENAI_MODEL=gpt-4o-mini
    │   └─ ...
    └─ Agent
        ├─ GITHUB_TOKEN=ghp_...
        ├─ OPENAI_API_KEY=sk-...
        └─ ...

Containers access via: process.env.OPENAI_API_KEY
```

---

## Port Mapping

```
Your PC (Host)              Container
──────────────              ──────────
localhost:5173      →       5173 (Frontend)
localhost:3002      →       3002 (API)
localhost:3001      →       3001 (OAuth)
localhost:3003      →       3002 (AI Sidecar, remapped)

Inside Docker Network:
Frontend    → api:3002        (no port remapping)
Frontend    → oauth:3001      (no port remapping)
Frontend    → ai-sidecar:3002 (no port remapping)
```

---

## Summary of Data Paths

```
                    ┌──────────────────────┐
                    │  Your PC (Host)      │
                    │  - VS Code           │
                    │  - Terminal          │
                    │  - Browser           │
                    └──────────────────────┘
                              ↓
        ┌─────────────────────────────────────────┐
        │     Docker Network (Isolated)           │
        │                                         │
        │  ┌──────────┐  ┌─────────────────────┐ │
        │  │ Frontend │←→│ API ← AI Sidecar    │ │
        │  │ Container│  │ Container Container │ │
        │  └──────────┘  └─────────────────────┘ │
        │       ↑                                 │
        │       │ (volume mount)                  │
        │       ↓                                 │
        │  ┌──────────────────────────────────┐  │
        │  │ Dev Agent Container (on demand)  │  │
        │  │ • Edits ./src → reflects on PC   │  │
        │  │ • Runs git commands              │  │
        │  │ • Can exec Docker commands       │  │
        │  └──────────────────────────────────┘  │
        │                                         │
        └─────────────────────────────────────────┘
              ↓                        ↓
        ┌──────────────┐         ┌─────────────┐
        │ GitHub       │         │ OpenAI API  │
        │ (git push)   │         │ (ChatGPT)   │
        └──────────────┘         └─────────────┘
```

---

## Ready to Use!

This architecture gives you:
- ✅ **Isolation** - Services don't interfere with each other
- ✅ **Flexibility** - Stop/start services independently
- ✅ **Efficiency** - Memory-efficient containers
- ✅ **Automation** - Agent can run commands automatically
- ✅ **Scalability** - Easy to add more services

Sources:
- https://docs.docker.com/compose/networking/
- https://docs.docker.com/storage/volumes/
