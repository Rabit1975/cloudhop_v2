# CloudHop Docker Agent Startup Script (Windows)
# Helps you quickly set up and run the agent environment

Write-Host "╔════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  CloudHop Docker Agent Setup       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker ps > $null 2>&1
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host ""
    Write-Host "📝 Creating .env from .env.agent..." -ForegroundColor Yellow
    Copy-Item .env.agent .env
    Write-Host "✓ Created .env" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  Please edit .env and add your API keys:" -ForegroundColor Yellow
    Write-Host "   - OPENAI_API_KEY (for AI sidecar)"
    Write-Host "   - GITHUB_TOKEN (for agent commits)"
    Write-Host ""
    Read-Host "Press Enter once you've updated .env"
}

Write-Host ""
Write-Host "🔨 Building Docker images..." -ForegroundColor Cyan
docker-compose build --quiet

Write-Host ""
Write-Host "✓ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  # Start all services (frontend, API, OAuth, AI sidecar)"
Write-Host "  docker-compose up"
Write-Host ""
Write-Host "  # Access the dev agent"
Write-Host "  docker-compose run --rm agent"
Write-Host ""
Write-Host "  # View logs"
Write-Host "  docker-compose logs -f frontend"
Write-Host "  docker-compose logs -f ai-sidecar"
Write-Host ""
Write-Host "  # Stop everything"
Write-Host "  docker-compose down"
Write-Host ""
Write-Host "Full documentation: https://github.com/Rabit1975/cloudhop_v2/blob/production/AGENT_SETUP.md" -ForegroundColor Gray
Write-Host ""
