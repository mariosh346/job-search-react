'use client';

import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function ErrorBoundary() {
    const t = useTranslations('Errors');

    return (
        <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-md">
            <h2 className="font-bold mb-2">{t('errorTitle')}</h2>
            <p>{t('genericError')}</p>
            <Button
                onClick={() => window.location.reload()}
                color="error"
            >
                {t('retry')}
            </Button>
            <Button
                onClick={() => window.history.back()}

            >
                {t('Go back')}
            </Button>
        </div>
    );
}
