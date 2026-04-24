import { z } from 'zod';

// Strict contract to prevent accidental extra fields in API responses.
export const healthResponseSchema = z
  .object({
    success: z.literal(true),
    service: z.literal('halal-harmony-api'),
  })
  .strict();

export type HealthResponse = z.infer<typeof healthResponseSchema>;
