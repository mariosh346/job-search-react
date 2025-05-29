'use client';

import { useTranslations } from 'next-intl';
import ErrorBoundary from './ErrorBoundary';
import { useJobsQuery } from '@/hooks/useJobsQuery';

export default function IndexPageContent() {
    const { data: jobs, isLoading, error } = useJobsQuery();
    const t = useTranslations('IndexPage');

    if (error) {
        return <ErrorBoundary />;
    }

    return (
        <div>
            {t('description.text')}{' '}
            <code>next-intl</code>{' '}
            {t('description.withRouter')}{' '}
            <span>{t('description.tryChanging')}</span>
        </div>
    );
}
