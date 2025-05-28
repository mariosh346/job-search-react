import { isValidFilters } from "@/schemas/filtersSchema";
import axios from "axios";
const baseUrl = 'https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs';

export const fetchFilters = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/filters`);
    if (!isValidFilters(data)) {
      throw new Error('Invalid filters data fetched');
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(`Error fetching filters: ${error.message}`);
    } else {
        throw new Error(`An unexpected error occurred: ${JSON.stringify(error)}`);
    }
  }
};
