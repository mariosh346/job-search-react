import axios from "axios";
import { isValidJobs } from "@/schemas/jobsSchema";
import { z } from "zod";
const baseUrl = 'https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs';

const fetchJobsParamsSchema = z.object({
  lang: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
}).strict();

type FetchJobsParams = z.infer<typeof fetchJobsParamsSchema>;

export const fetchJobs = async (params: FetchJobsParams = {}) => {
  try {
    const parsedParams = fetchJobsParamsSchema.parse(params);
    const response = await axios.get(baseUrl, { params: parsedParams });
    if (!isValidJobs(response.data)) {
      throw new Error('Invalid jobs data');
    }
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(`Error fetching jobs: ${error.message}`);
    } else {
        throw new Error(`An unexpected error occurred: ${JSON.stringify(error)}`);
    }
  }
};
