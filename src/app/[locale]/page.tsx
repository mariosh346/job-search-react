import { getTranslations } from 'next-intl/server';
import IndexPageContent from '@/components/IndexPageContent';

export async function generateMetadata() {
  const t = await getTranslations('IndexPage');
  return {
    title: t('title')
  };
}

export default function IndexPage() {
  return (
    <main className="h-full gap-2 p-4">
      <IndexPageContent />
    </main>
  );
}
