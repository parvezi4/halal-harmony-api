import { Router } from 'express';
import { z } from 'zod';

import { searchProfiles } from '../../modules/search/search.service.js';

const searchQuerySchema = z.object({
  q: z.string().trim().min(2, 'q must be at least 2 characters long'),
});

export const searchRouter = Router();

searchRouter.get('/search', (req, res) => {
  const parsedQuery = searchQuerySchema.safeParse({ q: req.query.q });

  if (!parsedQuery.success) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: parsedQuery.error.issues[0]?.message ?? 'Invalid query parameters',
      },
    });
    return;
  }

  const data = searchProfiles(parsedQuery.data.q);

  res.status(200).json({
    success: true,
    data,
  });
});
