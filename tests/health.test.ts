import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { buildApp } from '../src/app.js';

describe('GET /health', () => {
  it('returns healthy service metadata', async () => {
    const response = await request(buildApp()).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, service: 'halal-harmony-api' });
    expect(response.headers['x-request-id']).toBeDefined();
  });
});
