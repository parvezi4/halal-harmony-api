import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { buildApp } from '../../src/app.js';
import {
  dashboardResponseSchema,
  dashboardUnauthorizedErrorSchema,
} from '../../src/contracts/dashboard.contract.js';

describe('API Contract: GET /dashboard', () => {
  it('matches success response contract', async () => {
    const response = await request(buildApp()).get('/dashboard').set('x-user-id', 'member_123');

    expect(response.status).toBe(200);

    const parsed = dashboardResponseSchema.safeParse(response.body);
    expect(parsed.success).toBe(true);
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('matches unauthorized error response contract', async () => {
    const response = await request(buildApp()).get('/dashboard');

    expect(response.status).toBe(401);

    const parsed = dashboardUnauthorizedErrorSchema.safeParse(response.body);
    expect(parsed.success).toBe(true);
    expect(response.headers['x-request-id']).toBeDefined();
  });
});
