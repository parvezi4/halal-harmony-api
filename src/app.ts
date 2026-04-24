import cors from 'cors';
import express from 'express';

import { requestIdMiddleware } from './http/request-id.js';

export function buildApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(requestIdMiddleware);

  app.get('/health', (_req, res) => {
    res.status(200).json({ success: true, service: 'halal-harmony-api' });
  });

  return app;
}
