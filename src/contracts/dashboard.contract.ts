import { z } from 'zod';

export const dashboardResponseSchema = z
  .object({
    success: z.literal(true),
    data: z
      .object({
        userId: z.string().min(1),
        metrics: z
          .object({
            profileCompletionPercent: z.number().int().min(0).max(100),
            newMatches: z.number().int().nonnegative(),
            unreadMessages: z.number().int().nonnegative(),
          })
          .strict(),
        quickActions: z.array(z.string().min(1)),
      })
      .strict(),
  })
  .strict();

export const dashboardUnauthorizedErrorSchema = z
  .object({
    success: z.literal(false),
    error: z
      .object({
        code: z.literal('UNAUTHORIZED'),
        message: z.string().min(1),
      })
      .strict(),
  })
  .strict();

export type DashboardResponse = z.infer<typeof dashboardResponseSchema>;
export type DashboardUnauthorizedError = z.infer<typeof dashboardUnauthorizedErrorSchema>;
