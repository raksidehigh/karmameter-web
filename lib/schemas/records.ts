import { z } from "zod";

export const recordSearchQuerySchema = z.object({
  q: z
    .string()
    .trim()
    .max(200, "Query is too long")
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  portal: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type RecordSearchQuery = z.infer<typeof recordSearchQuerySchema>;
