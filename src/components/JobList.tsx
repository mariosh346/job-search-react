'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Typography, Skeleton } from '@mui/material';
import { useJobsQuery } from '@/hooks/useJobsQuery';
import ErrorBoundary from './ErrorBoundary';
import { useSearchParams } from 'next/navigation';
import { useJobs } from '@/contexts/JobsContext';

export default function JobList() {
    const t = useTranslations('Jobs');
    const searchParams = useSearchParams();
    const { jobs: initialJobs } = useJobs();
    const { data: jobs, isLoading, error } = useJobsQuery({
        searchParams,
        initialData: initialJobs
    });
    const locale = useLocale();

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
                    <div className="mt-4 flex flex-wrap">
                        {tagComponent(job.category)}
                        {dateTagComponent(job.postedAt)}
                        {job.tags.map((tag) => (
                            tagComponent(tag)
                        ))}
                    </div>
                </article>
            ))}
        </div>
    );
}
