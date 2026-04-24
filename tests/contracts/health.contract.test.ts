import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { buildApp } from '../../src/app.js';
import { healthResponseSchema } from '../../src/contracts/health.contract.js';

describe('API Contract: GET /health', () => {
  it('matches the published response contract', async () => {
    const response = await request(buildApp()).get('/health');

    expect(response.status).toBe(200);

    const parsed = healthResponseSchema.safeParse(response.body);
    expect(parsed.success).toBe(true);

    // Header-level compatibility check for traceability across clients.
    expect(response.headers['x-request-id']).toBeDefined();
  });
});
