# CloudHop

## Project info

CloudHop is a Vite + React + TypeScript web app.

## How can I edit this code?

Use your preferred IDE and standard Git workflow.

Requirements:

- Node.js
- npm

Quick start:

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
npm run preview
```

## Container Workflow

CloudHop now includes a Docker-first workspace flow for developing from inside a container while still using GitHub and Vercel.

Quick start:

```sh
vercel link
vercel env pull .env.docker.local
docker compose --env-file .env.docker.local up --build
docker compose exec dev sh
```

The full setup is documented in [DOCKER_AGENT_WORKFLOW.md](./DOCKER_AGENT_WORKFLOW.md).

## What technologies are used for this project?

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

Deploy the generated `dist/` folder to your own hosting platform or server.
