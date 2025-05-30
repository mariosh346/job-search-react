'use client';

import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function ErrorBoundary() {
    const t = useTranslations('Error');

    return (
        <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-md">
            <h2 className="font-bold mb-2">{t('title')}</h2>
            <p>{t('description.part1')} {t('description.part2')}</p>
            <Button
                onClick={() => window.location.reload()}
                color="error"
            >
                {t('description.retry')}
            </Button>
            <Button
                onClick={() => window.history.back()}
            >
                {t('goBack')}
            </Button>
        </div>
    );
}
