import { getTranslations } from 'next-intl/server';
import PathnamesContent from '@/components/PathnamesContent';

export async function generateMetadata() {
  const t = await getTranslations('PathnamesPage');
  return {
    title: t('title')
  };
}

export default function PathnamesPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
      <PathnamesContent />
    </main>
  );
}
