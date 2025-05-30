'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Typography, Skeleton, Pagination } from '@mui/material';
import { useJobsQuery } from '@/hooks/useJobsQuery';
import ErrorBoundary from './ErrorBoundary';
import { useSearchParams, useRouter } from 'next/navigation';
import { useJobs } from '@/contexts/JobsContext';
import JobDescription from './JobDescription';
import { useEffect, useState } from 'react';

export default function JobList() {
    const t = useTranslations('Jobs');
    const searchParams = useSearchParams();
    const router = useRouter();
    const { jobs: initialJobs } = useJobs();
    const { data: jobs, isLoading, error } = useJobsQuery({
        searchParams,
        initialData: initialJobs
    });
    const locale = useLocale();
    const getPageFromParams = () => {
        const pageParam = searchParams.get('page');
        return pageParam ? parseInt(pageParam, 10) : 1;
    }
    const [page, setPage] = useState(() => {
        return getPageFromParams();
    });

    const skeletonComponent = () => <Skeleton variant="rectangular" height={200} className='mb-4' />
    if (isLoading) {
        return (
            <div role="status">
                {skeletonComponent()}
                {skeletonComponent()}
                {skeletonComponent()}
            </div>
        )
    }

    if (error) {
        return <ErrorBoundary />;
    }

    if (!jobs?.results?.length) {
        return (
            <div>
                {t('No jobs found')}
            </div>
        )
    }

    const tagComponent = (tag: string) => <span key={tag} className="p-2 text-sm mr-2 mb-1 bg-gray-100 rounded-md">
        {tag}
    </span>
    const dateTagComponent = (postedAt: string) => tagComponent(new Date(postedAt).toLocaleDateString(locale))

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value.toString());
        setPage(value);
        router.push(`/?${params.toString()}`);
    };
    const pages = jobs ? Math.ceil(jobs.total / jobs.pageSize) : 1

    useEffect(() => {
        setPage(getPageFromParams());
    }, [getPageFromParams]);

    return (
        <div className="gap-4">
            {jobs?.results.map((job) => (
                <article
                    key={job.id}
                    className="p-4 border rounded-lg mb-6"
                >
                    <Typography variant="h4" component="h2">
                        {job.title}
                    </Typography>
                    <div className="mt-2">
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                    </div>
                    <div className="mt-4 mb-4">
                        <JobDescription description={job.description} />
                    </div>
                    <div className="mt-4 flex flex-wrap">
                        {tagComponent(job.category)}
                        {dateTagComponent(job.postedAt)}
                        {job.tags.map((tag) => (
                            tagComponent(tag)
                        ))}
                    </div>
                </article>
            ))}
            <Pagination
                count={pages}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                className='pb-10'
            />
        </div>
    );
}
