import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { buildApp } from '../src/app.js';

describe('GET /search', () => {
  it('returns matching profiles for a valid query', async () => {
    const response = await request(buildApp()).get('/search').query({ q: 'London' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.query).toBe('London');
    expect(response.body.data.total).toBe(1);
    expect(response.body.data.results).toEqual([
      {
        id: 'mem_001',
        displayName: 'Amina R',
        ageRangeLabel: '25-30',
        city: 'London',
        practicingLevel: 'Practicing',
      },
    ]);
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('returns validation error when q is missing', async () => {
    const response = await request(buildApp()).get('/search');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Required',
      },
    });
  });
});
