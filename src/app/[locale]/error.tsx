'use client';

import { useTranslations } from 'next-intl';
import ErrorContent from '@/components/ErrorContent';

export default function Error() {
  const t = useTranslations('Error');

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-2">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">{t('title')}</h1>
        <ErrorContent />
      </div>
    </main>
  );
}
