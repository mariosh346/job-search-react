import { z } from "zod";
import { filterSchema } from "./filterSchema";

export const filtersSchema = z.object({
  locations: z.array(filterSchema),
  categories: z.array(filterSchema),
});

export type Filters = z.infer<typeof filtersSchema>;

export function isValidFilters(obj: unknown): obj is Filters {
  return filtersSchema.safeParse(obj).success;
}
