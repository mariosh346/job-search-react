import { z } from 'zod';
import { jobSchema } from './jobSchema';

const jobsSchema = z.object({
  results: z.array(jobSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type Jobs = z.infer<typeof jobsSchema>;

export const isValidJobs = (jobs: any): boolean => {
  const result = jobsSchema.safeParse(jobs);
  return result.success;
};
