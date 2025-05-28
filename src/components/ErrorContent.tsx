'use client';

import { useTranslations } from 'next-intl';

export default function ErrorContent() {
    const t = useTranslations('Error');

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="space-y-4">
            <p className="text-gray-600">{t('description.part1')}</p>
            <p className="text-gray-600">
                {t('description.part2')}{' '}
                <button
                    onClick={handleRetry}
                    className="text-blue-500 hover:text-blue-700 underline focus:outline-none"
                >
                    {t('description.retry')}
                </button>
            </p>
        </div>
    );
}
