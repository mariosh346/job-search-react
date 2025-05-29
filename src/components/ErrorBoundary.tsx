'use client';

import { useTranslations } from 'next-intl';

export default function ErrorBoundary() {
    const t = useTranslations('Errors');

    return (
        <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-md">
            <h2 className="font-bold mb-2">{t('errorTitle')}</h2>
            <p>{t('genericError')}</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                {t('retry')}
            </button>
        </div>
    );
}
