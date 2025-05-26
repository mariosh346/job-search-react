import axios from "axios";
const baseUrl = 'https://ka-fe-jobboard-assignment-api.azurewebsites.net/jobs';

export const fetchJobs = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(`Error fetching jobs: ${error.message}`);
    } else {
        throw new Error(`An unexpected error occurred: ${JSON.stringify(error)}`);
    }
  }
};
//fetchJobs().then((data) => console.log(data));
export const fetchFilters = async () => {
  try {
    const response = await axios.get(`${baseUrl}/filters`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(`Error fetching filters: ${error.message}`);
    } else {
        throw new Error(`An unexpected error occurred: ${JSON.stringify(error)}`);
    }
  }
};
