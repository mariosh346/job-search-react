'use client';

import { useTranslations } from 'next-intl';
import { Typography, Skeleton } from '@mui/material';
import { useJobsQuery } from '@/hooks/useJobsQuery';
import ErrorBoundary from './ErrorBoundary';
import { useSearchParams } from 'next/navigation';
import { fetchJobs } from '@/api/fetchJobs';
import { Jobs } from '@/schemas/jobsSchema';

export async function getServerSideProps() {
    const searchParams = useSearchParams();
    const jobs = await fetchJobs(searchParams)
    return { props: { jobs } }
}

export default function JobList(props: { jobs?: Jobs }) {
    const t = useTranslations('Jobs');
    const searchParams = useSearchParams();
    const { data: jobs, isLoading, error } = useJobsQuery({
        searchParams,
        initialData: props.jobs
    });

    if (isLoading) {
        return (
            <div role="status">
                <Skeleton variant="rectangular" height={200} className='mb-4' />
                <Skeleton variant="rectangular" height={200} className='mb-4' />
                <Skeleton variant="rectangular" height={200} className='mb-4' />
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
                    <div className="mt-4">
                        <span className="p-2 text-sm mr-2 bg-gray-100 rounded-md">
                            {job.category}
                        </span>
                    </div>
                </article>
            ))}
        </div>
    );
}
