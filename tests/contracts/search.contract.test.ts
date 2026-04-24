import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { buildApp } from '../../src/app.js';
import {
  searchResponseSchema,
  searchValidationErrorSchema,
} from '../../src/contracts/search.contract.js';

describe('API Contract: GET /search', () => {
  it('matches success response contract', async () => {
    const response = await request(buildApp()).get('/search').query({ q: 'ami' });

    expect(response.status).toBe(200);

    const parsed = searchResponseSchema.safeParse(response.body);
    expect(parsed.success).toBe(true);
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('matches validation error response contract', async () => {
    const response = await request(buildApp()).get('/search').query({ q: 'a' });

    expect(response.status).toBe(400);

    const parsed = searchValidationErrorSchema.safeParse(response.body);
    expect(parsed.success).toBe(true);
    expect(response.headers['x-request-id']).toBeDefined();
  });
});
