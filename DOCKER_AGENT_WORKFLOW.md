# CloudHop Docker Agent Workflow

This setup gives you a container-first development workspace with:

- a long-running `dev` workspace container for editing files and running commands
- a `frontend` service for Vite on `http://localhost:5173`
- an `oauth` service for YouTube Music auth on `http://localhost:3001`
- an `api` service for subscriptions/payments on `http://localhost:3002`
- optional OpenAI-ready env wiring

## What To Commit

Commit:

- `.env.example`
- `docker-compose.yml`
- `Dockerfile.dev`
- `.devcontainer/devcontainer.json`

Do not commit:

- `.env.docker.local`
- `.vercel/`

## One-Time Setup

1. Link the repo to Vercel on your machine:

```sh
vercel link
```

2. Pull Vercel env vars into an untracked Docker env file:

```sh
vercel env pull .env.docker.local
```

3. Add your OpenAI values to `.env.docker.local` if you want agent-style tooling in the container:

```env
OPENAI_API_KEY=your_key_here
OPENAI_BASE_URL=
OPENAI_MODEL=
```

## Start The Stack

```sh
docker compose --env-file .env.docker.local up --build
```

If you want the optional AI sidecar container too:

```sh
docker compose --env-file .env.docker.local --profile ai up --build
```

## Work Inside The Container

Open a shell in the workspace container:

```sh
docker compose exec dev sh
```

From there you can:

- edit repo files in a devcontainer-compatible workspace
- run `npm run build`
- run `npm test`
- run `git status`, `git commit`, and `git push`
- run `vercel whoami`, `vercel env pull`, or `vercel deploy`

## Service URLs

- Frontend: `http://localhost:5173`
- OAuth/YouTube service: `http://localhost:3001/health`
- API service: `http://localhost:3002/health`
- Production nginx image: `http://localhost`

## VS Code / Dev Container

This repo is configured so VS Code can attach directly to the `dev` container using `.devcontainer/devcontainer.json`.

The `dev` container is intentionally idle so it can act as your workspace shell while `frontend`, `oauth`, and `api` run separately.

## Typical Daily Flow

```sh
vercel env pull .env.docker.local
docker compose --env-file .env.docker.local up --build
docker compose exec dev sh
```

Then inside the container:

```sh
git status
npm run build
vercel whoami
```
