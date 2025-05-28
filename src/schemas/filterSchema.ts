import { z } from "zod";

export const filterSchema = z.object({
  slug: z.string(),
  label_en: z.string(),
  label_el: z.string(),
});

export type Filter = z.infer<typeof filterSchema>;

export function isValidFilter(obj: unknown): obj is Filter {
  return filterSchema.safeParse(obj).success;
}
