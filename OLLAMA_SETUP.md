# CloudHop with Ollama: Free Local AI Setup

## What is Ollama?

**Ollama** is a free tool that downloads and runs open-source LLMs (Language Models) locally on your PC.

- ✅ **Free** - No API keys, no billing
- ✅ **Local** - Runs in Docker, everything on your machine
- ✅ **Fast** - Optimized for local inference
- ✅ **Models** - Mistral, Llama2, Neural-Chat, Zephyr, and more
- ✅ **Private** - Your data never leaves your PC

**Memory**: ~5-8GB per model (downloaded once, reused)

---

## Quick Start (5 Minutes)

### Step 1: Copy Environment Config
```bash
cp .env.ollama .env
```

### Step 2: Start Ollama + Services
```bash
# First time (downloads the model, ~3-5GB):
docker-compose up ollama ai-sidecar frontend api oauth

# Wait for Ollama to download the model (~5-10 min depending on model size)
# You'll see: "pulled mistral" or similar
```

### Step 3: Test It Works
```bash
# In another terminal
curl http://localhost:3002/health
# Should see: {"status":"ok","provider":"ollama","model":"mistral"}
```

### Step 4: Use It
```bash
# Frontend at: http://localhost:5173
# AI Sidecar at: http://localhost:3003/health
# Ollama API at: http://localhost:11434/api/tags
```

Done! You now have a free local AI system running.

---

## How It Works

```
Your PC
    ↓
Docker Compose
    ├─ Ollama Container
    │  └─ Downloads + runs LLM model (Mistral by default)
    │     └─ ~7B parameters, ~5GB disk
    │
    ├─ AI Sidecar (Express server)
    │  └─ Listens on port 3002
    │  └─ Talks to Ollama at http://ollama:11434
    │
    ├─ Frontend (Vite React)
    │  └─ Calls AI Sidecar at http://ai-sidecar:3002
    │
    └─ API, OAuth
       └─ Backend services
```

**Data Flow:**
```
Frontend → AI Sidecar → Ollama (local LLM) → Response
```

No external API calls. Everything stays on your PC.

---

## Available Models

### Fast & Efficient (Recommended for development)
```
mistral         - 7B, ~5GB, fastest, best quality
orca-mini       - 3B, ~2GB, super fast, lower quality
neural-chat     - 7B, ~5GB, good for chat
```

### High Quality
```
zephyr          - 7B, ~5GB, newer, great reasoning
starling-lm     - 7B, ~5GB, highest quality
```

### Larger (Need 16GB+ RAM)
```
llama2          - 7B, ~5GB
mistral-large   - 34B, ~20GB, very powerful
```

### Download a Model

Ollama auto-downloads your configured model on first run. To manually pull:

```bash
docker-compose run ollama ollama pull mistral
docker-compose run ollama ollama pull orca-mini
docker-compose run ollama ollama pull zephyr
```

### Switch Models

Edit `.env`:
```
OLLAMA_MODEL=zephyr
```

Then restart:
```bash
docker-compose restart ai-sidecar
```

---

## Configuration

### Use Ollama (Default, FREE)
```bash
# .env
AI_PROVIDER=ollama
OLLAMA_MODEL=mistral
```

```bash
docker-compose up ollama ai-sidecar frontend api oauth
```

### Switch to OpenAI (Paid)
```bash
# .env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-proj-your-key
```

```bash
# Ollama not needed
docker-compose up ai-sidecar frontend api oauth
```

### Hybrid (Use Ollama, keep OpenAI as backup)
```bash
# .env
AI_PROVIDER=ollama
OLLAMA_MODEL=mistral
OPENAI_API_KEY=sk-proj-your-key  # Only used if Ollama fails
```

---

## Common Commands

### Start Ollama + AI
```bash
docker-compose up ollama ai-sidecar
```

### Start Everything (Ollama + CloudHop)
```bash
docker-compose up
```

### Just Frontend + Ollama (no backend)
```bash
docker-compose up frontend ollama ai-sidecar
```

### View Ollama logs
```bash
docker-compose logs -f ollama
```

### View AI Sidecar logs
```bash
docker-compose logs -f ai-sidecar
```

### Check if models are downloaded
```bash
docker-compose run ollama ollama list
```

### Remove old models to free disk space
```bash
docker-compose run ollama ollama rm mistral
# Then pull a smaller one:
docker-compose run ollama ollama pull orca-mini
```

---

## Endpoints

### AI Sidecar (Port 3003 external / 3002 internal)

**Chat with AI:**
```bash
curl -X POST http://localhost:3003/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello, what is 2+2?"}'
```

**Generate text:**
```bash
curl -X POST http://localhost:3003/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Generate a playlist for focus","type":"playlist"}'
```

**Health check:**
```bash
curl http://localhost:3003/health
```

### Ollama API (Port 11434)

**Chat directly with Ollama:**
```bash
curl -X POST http://localhost:11434/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistral",
    "messages": [{"role":"user","content":"Hello"}],
    "stream": false
  }'
```

**List available models:**
```bash
curl http://localhost:11434/api/tags
```

---

## Troubleshooting

### "Ollama connection refused"
**Problem:** AI Sidecar can't reach Ollama

**Solution:**
```bash
# Check if Ollama is running
docker-compose ps ollama
# Should show: "Up"

# If not:
docker-compose up ollama

# Wait 30 seconds for startup, then:
curl http://localhost:11434/health
```

### "Model not found"
**Problem:** `OLLAMA_MODEL=mistral` but model not downloaded

**Solution:**
```bash
# First time, Ollama auto-downloads (~5-10 min)
# Or manually:
docker-compose run ollama ollama pull mistral

# Check:
docker-compose run ollama ollama list
```

### "Out of memory"
**Problem:** Model is too large for your system

**Solution:** Use a smaller model
```bash
# .env
OLLAMA_MODEL=orca-mini  # Only 3GB
```

```bash
docker-compose up ollama ai-sidecar
```

### "AI Sidecar returns 500 error"
**Problem:** Something in the AI service failed

**Solution:**
```bash
# Check logs
docker-compose logs ai-sidecar

# Look for:
# - "Ollama error" → Check Ollama is running
# - "Model not found" → Check OLLAMA_MODEL setting
# - "Connection refused" → Check OLLAMA_BASE_URL

# Restart:
docker-compose restart ai-sidecar
```

### "Slow responses"
**Problem:** Model is running slowly

**Causes & solutions:**
- Using a large model on low-end PC → Switch to `orca-mini`
- Ollama still downloading → Wait for download to finish
- Insufficient RAM → Close other apps or use smaller model
- Disk is full → Run `docker system prune`

### "Disk space filling up"
**Problem:** Models taking too much disk

**Solution:**
```bash
# Check model sizes
docker-compose run ollama ollama list

# Remove unused models
docker-compose run ollama ollama rm mistral

# Clean up Docker
docker system prune -a
```

---

## Performance Tips

### 1. Use Smaller Models for Development
```bash
# Fast (2-3 seconds per response)
OLLAMA_MODEL=orca-mini

# vs slower
OLLAMA_MODEL=mistral-large
```

### 2. Optimize for Your Hardware

**Low-end PC (4GB RAM):**
```
OLLAMA_MODEL=orca-mini
```

**Mid-range PC (8GB RAM):**
```
OLLAMA_MODEL=neural-chat or mistral
```

**High-end PC (16GB+ RAM):**
```
OLLAMA_MODEL=zephyr or mistral-large
```

### 3. Keep Models Off Slow Drives
- **Fast**: SSD (put Ollama here)
- **Slow**: USB drive, network drive (avoid for Ollama)

### 4. Don't Run Too Many Models
- Only keep models you actively use
- Delete unused models to free space

---

## Integration Examples

### React Component Using Ollama
```typescript
// In your React component
const response = await fetch('http://localhost:3003/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Help me write TypeScript code',
    context: 'User is in the Code Editor'
  })
});

const { response: aiResponse } = await response.json();
console.log(aiResponse);
```

### Backend Using Ollama
```typescript
// In your Express backend
const aiResponse = await fetch('http://ai-sidecar:3002/api/ai/chat', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Generate a playlist for focus' })
});
```

---

## Next Steps

1. **Start Ollama**: `docker-compose up ollama ai-sidecar`
2. **Wait for model download** (~5-10 minutes first time)
3. **Test**: `curl http://localhost:3003/health`
4. **Use**: Build AI features in CloudHop without API costs!

---

## Key Differences: Ollama vs OpenAI

| Feature | Ollama | OpenAI |
|---------|--------|--------|
| Cost | Free | $0.15/1M tokens |
| Speed | Local (~2-5s) | Cloud (~0.5-2s) |
| Privacy | Local only | Sent to servers |
| Models | Open-source | Proprietary |
| Image gen | Not supported | DALL-E 3 |
| Setup | Docker | API key |
| Offline | Works | Requires internet |

---

## Resources

- **Ollama**: https://ollama.ai
- **Models**: https://ollama.ai/library
- **Docker Compose**: https://docs.docker.com/compose/

---

## Summary

✅ Free local AI with Ollama  
✅ No API keys, no billing  
✅ Everything runs in Docker  
✅ Easy to switch models  
✅ Hybrid mode (Ollama + OpenAI fallback)  

**Ready to go!** Start with: `docker-compose up ollama ai-sidecar`

Sources:
- https://ollama.ai
- https://docs.docker.com/compose/
