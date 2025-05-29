import { fetchJobs } from '@/api/fetchJobs';
import { fetchFilters } from '@/api/fetchFilters';
import { useQuery } from '@tanstack/react-query';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { Jobs } from '@/schemas/jobsSchema';

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

export const useJobsQuery = (initialData?: Jobs) => {
    const searchParams = useSearchParams();
    const parsedParams = searchParamsToObject(searchParams);
    return useQuery({
        queryKey: ['jobs', parsedParams],
        queryFn: () => fetchJobs(parsedParams),
        initialData
    });
};

export const useFiltersQuery = () => {
  return useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
    staleTime: Infinity, // Filters rarely change
  });
};
