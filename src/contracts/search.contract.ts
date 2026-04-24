import { z } from 'zod';

export const searchResultItemSchema = z
  .object({
    id: z.string().min(1),
    displayName: z.string().min(1),
    ageRangeLabel: z.string().min(1),
    city: z.string().min(1),
    practicingLevel: z.string().min(1),
  })
  .strict();

export const searchResponseSchema = z
  .object({
    success: z.literal(true),
    data: z
      .object({
        query: z.string().min(2),
        total: z.number().int().nonnegative(),
        results: z.array(searchResultItemSchema),
      })
      .strict(),
  })
  .strict();

export const searchValidationErrorSchema = z
  .object({
    success: z.literal(false),
    error: z
      .object({
        code: z.literal('VALIDATION_ERROR'),
        message: z.string().min(1),
      })
      .strict(),
  })
  .strict();

export type SearchResponse = z.infer<typeof searchResponseSchema>;
export type SearchValidationError = z.infer<typeof searchValidationErrorSchema>;
