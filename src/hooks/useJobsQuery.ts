import { fetchJobs } from '@/api/fetchJobs';
import { fetchFilters } from '@/api/fetchFilters';
import { useQuery } from '@tanstack/react-query';
import { z } from "zod";
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

function searchParamsToObject(params: unknown) {
    if (params instanceof ReadonlyURLSearchParams) {
        const obj: Record<string, string | number> = {};
        for (const [key, value] of params.entries()) {
            obj[key] = value;
        }
        if (obj.page) obj.page = Number(obj.page);
        if (obj.pageSize) obj.pageSize = Number(obj.pageSize);
        return obj;
    }
    return params;
}

export const useJobsQuery = () => {
    const searchParams = useSearchParams();
    const parsedParams = searchParamsToObject(searchParams);
    return useQuery({
        queryKey: ['jobs', parsedParams],
        queryFn: () => fetchJobs(parsedParams),
    });
};

export const useFiltersQuery = () => {
  return useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
    staleTime: Infinity, // Filters rarely change
  });
};
