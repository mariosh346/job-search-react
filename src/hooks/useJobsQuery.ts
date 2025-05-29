import { fetchJobs } from '@/api/fetchJobs';
import { fetchFilters } from '@/api/fetchFilters';
import { useQuery } from '@tanstack/react-query';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Jobs } from '@/schemas/jobsSchema';

export function searchParamsToObject(params: unknown) {
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

export const useJobsQuery = ({initialData, searchParams}: {initialData?: Jobs, searchParams?: ReadonlyURLSearchParams}) => {
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
