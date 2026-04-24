import cors from 'cors';
import express from 'express';

import { dashboardRouter } from './http/routes/dashboard.route.js';
import { requestIdMiddleware } from './http/request-id.js';
import { searchRouter } from './http/routes/search.route.js';

export function buildApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(requestIdMiddleware);
  app.use(searchRouter);
  app.use(dashboardRouter);

  app.get('/health', (_req, res) => {
    res.status(200).json({ success: true, service: 'halal-harmony-api' });
  });

  return app;
}
