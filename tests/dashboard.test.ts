import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { buildApp } from '../src/app.js';

describe('GET /dashboard', () => {
  it('returns dashboard snapshot when x-user-id is provided', async () => {
    const response = await request(buildApp()).get('/dashboard').set('x-user-id', 'member_123');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.userId).toBe('member_123');
    expect(response.body.data.metrics).toEqual({
      profileCompletionPercent: 70,
      newMatches: 3,
      unreadMessages: 0,
    });
    expect(response.body.data.quickActions).toEqual([
      'complete_profile',
      'review_matches',
      'reply_messages',
    ]);
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('returns unauthorized when x-user-id is missing', async () => {
    const response = await request(buildApp()).get('/dashboard');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'x-user-id header is required',
      },
    });
  });
});
