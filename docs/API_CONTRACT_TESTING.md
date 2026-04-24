# API Contract Testing

This repository enforces API compatibility using contract tests.

## Purpose

- Catch breaking response-shape changes before web/mobile clients break.
- Add explicit contracts for each migrated endpoint group.
- Keep compatibility checks in CI for every PR.

## Current Coverage

- `GET /health`
  - status code contract: `200`
  - body contract: strict `{ success: true, service: 'halal-harmony-api' }`
  - required header: `x-request-id`
- `GET /search`
  - success contract: strict `{ success: true, data: { query, total, results[] } }`
  - validation contract: strict `{ success: false, error: { code: 'VALIDATION_ERROR', message } }`
  - query validation: `q` is required and must be at least 2 characters
  - required header: `x-request-id`
- `GET /dashboard`
  - success contract: strict `{ success: true, data: { userId, metrics, quickActions[] } }`
  - auth failure contract: strict `{ success: false, error: { code: 'UNAUTHORIZED', message } }`
  - auth requirement: `x-user-id` header is required
  - required header: `x-request-id`

## Commands

```bash
npm run test:contract
npm test
```

## When Adding Endpoints

1. Add/extend contract schema in `src/contracts`.
2. Add a contract test under `tests/contracts`.
3. Keep one success and one failure/validation contract test for the endpoint.
4. Run `npm run lint && npm run typecheck && npm run test:contract`.

## Migration Guidance

During dual-run migration from halal-harmony:

- Compare old/new status codes.
- Compare old/new response keys and types.
- Keep additive changes backward-compatible.
- Do not remove/rename fields without coordination with web/mobile clients.

## Slice 1 Extraction Notes

- Slice 1 in this repo is intentionally read-only (`/health`, `/search`, `/dashboard`).
- `GET /health` remains unchanged to avoid any compatibility regression.
- For newly extracted endpoints, response contracts are now the compatibility baseline for web/mobile adapters.
- Any future shape changes must be introduced with contract updates and explicit migration notes before merge.
