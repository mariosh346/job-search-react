import { z } from 'zod';

export const jobSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  postedAt: z.string(),
});

export const isValidJob = (job: any): boolean => {
  const result = jobSchema.safeParse(job);
  return result.success;
};
