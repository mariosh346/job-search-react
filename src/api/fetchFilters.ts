import { isValidFilters } from "@/schemas/filtersSchema";
import axios from "axios";
import axiosInstance from "./axiosConfig";

export const fetchFilters = async () => {
  try {
    const { data } = await axiosInstance.get('/filters');
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
