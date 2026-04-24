import { Router } from 'express';

import { getDashboardSnapshot } from '../../modules/dashboard/dashboard.service.js';

export const dashboardRouter = Router();

dashboardRouter.get('/dashboard', (req, res) => {
  const userId = req.header('x-user-id');

  if (!userId || userId.trim().length === 0) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'x-user-id header is required',
      },
    });
    return;
  }

  const data = getDashboardSnapshot(userId);

  res.status(200).json({
    success: true,
    data,
  });
});
