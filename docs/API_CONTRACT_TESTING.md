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
