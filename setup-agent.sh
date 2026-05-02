#!/bin/bash

# CloudHop Docker Agent Startup Script
# Helps you quickly set up and run the agent environment

set -e

echo "╔════════════════════════════════════╗"
echo "║  CloudHop Docker Agent Setup       ║"
echo "╚════════════════════════════════════╝"
echo ""

# Check if Docker is running
if ! docker ps > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "✓ Docker is running"

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env from .env.agent..."
    cp .env.agent .env
    echo "✓ Created .env"
    echo ""
    echo "⚠️  Please edit .env and add your API keys:"
    echo "   - OPENAI_API_KEY (for AI sidecar)"
    echo "   - GITHUB_TOKEN (for agent commits)"
    echo ""
    read -p "Press Enter once you've updated .env..."
fi

echo ""
echo "🔨 Building Docker images..."
docker-compose build --quiet

echo ""
echo "✓ Setup complete!"
echo ""
echo "Available commands:"
echo ""
echo "  # Start all services (frontend, API, OAuth, AI sidecar)"
echo "  docker-compose up"
echo ""
echo "  # Access the dev agent"
echo "  docker-compose run --rm agent"
echo ""
echo "  # View logs"
echo "  docker-compose logs -f frontend"
echo "  docker-compose logs -f ai-sidecar"
echo ""
echo "  # Stop everything"
echo "  docker-compose down"
echo ""
echo "Full documentation: https://github.com/Rabit1975/cloudhop_v2/blob/production/AGENT_SETUP.md"
echo ""
