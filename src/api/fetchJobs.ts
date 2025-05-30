import axiosInstance from './axiosConfig';
import { isValidJobs, Jobs } from "@/schemas/jobsSchema";
import { z } from "zod";

const fetchJobsParamsSchema = z.object({
  lang: z.string().optional(),
  q: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
}).strict();

export const fetchJobs = async (params: unknown = {}): Promise<Jobs> => {
  try {
    const parsedParams = fetchJobsParamsSchema.parse(params);
    const { data } = await axiosInstance.get('/', { params: parsedParams });
    if (!isValidJobs(data)) {
      throw new Error('Invalid jobs data');
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(`Error fetching jobs: ${error.message}`);
    } else {
        throw new Error(`An unexpected error occurred: ${JSON.stringify(error)}`);
    }
  }
};
