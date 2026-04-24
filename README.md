# Halal Harmony API

Dedicated backend service for Halal Harmony web and mobile clients.

## Goals

- Centralize domain rules in one backend repository.
- Keep web and mobile frontends separate from backend concerns.
- Use the existing Prisma schema and migrations as the initial source of truth.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Start development server:

```bash
npm run dev
```

Health check:

```bash
curl http://localhost:4000/health
```

Slice 1 read endpoints:

```bash
curl "http://localhost:4000/search?q=london"
curl -H "x-user-id: member_123" http://localhost:4000/dashboard
```

## Scripts

- `npm run dev` - run API in watch mode
- `npm run build` - compile TypeScript to `dist`
- `npm run start` - run compiled server
- `npm run lint` - lint source files
- `npm run typecheck` - TypeScript type checking
- `npm test` - run tests
- `npm run test:contract` - run API contract compatibility tests
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate:dev` - create and apply local migration
- `npm run prisma:migrate:deploy` - apply migrations in deployment

## Initial Architecture

- `src/http` - transport concerns (middleware/routes)
- `src/modules` - domain modules (auth, profile, messaging, subscription)
- `src/lib` - shared infrastructure utilities (Prisma, logging)
- `src/config` - environment and runtime configuration
- `prisma` - schema and migrations copied from the main app repo
- `tests` - API and module tests

## CI

GitHub Actions workflow runs on push/PR:

1. Install dependencies
2. Generate Prisma client
3. Lint
4. Typecheck
5. Test

## Contract Compatibility

See `docs/API_CONTRACT_TESTING.md` for the contract testing workflow used to prevent web/mobile breaking changes.

## Slice 1 Compatibility Notes

The Slice 1 extraction keeps the existing `GET /health` shape unchanged and adds read-only contracts for:

- `GET /search` (query param `q`, min length 2)
- `GET /dashboard` (requires `x-user-id` header)

Published compatibility guarantees:

- Success and failure response shapes are strict and covered by contract tests.
- `x-request-id` is present on all responses, including validation/auth failures.
- Existing `GET /health` contract remains stable.

Migration note:

- For web/mobile integration, treat search/dashboard as additive endpoints in Slice 1. Do not remove or rename response keys without coordinated contract updates in this repo and consumer updates in client repos.