'use client';

import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { useJobsQuery } from '@/hooks/useJobsQuery';
import ErrorBoundary from './ErrorBoundary';
import { useSearchParams } from 'next/navigation';

export default function JobList() {
    const t = useTranslations('Jobs');
    const searchParams = useSearchParams();
    const { data: jobs, isLoading, error } = useJobsQuery({ searchParams });

    if (isLoading) {
        return (
            <div role="status">{t('loading')}</div>
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
