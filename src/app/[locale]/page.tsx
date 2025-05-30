import { getTranslations } from 'next-intl/server';
import IndexPageContent from '@/components/IndexPageContent';
import { fetchJobs } from '@/api/fetchJobs';
import { JobsProvider } from '@/contexts/JobsContext';

export async function generateMetadata() {
  const t = await getTranslations('IndexPage');
  return {
    title: t('title')
  };
}

export default async function IndexPage({
  params, searchParams
}: {
  params: Promise<{ params: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  console.log("param object :", await params);
  console.log("query search param object :", await searchParams);
  const jobs = await fetchJobs(await searchParams);

  return (
    <main className="h-full gap-2 p-4">
      <JobsProvider jobs={jobs}>
        <IndexPageContent />
      </JobsProvider>
    </main>
  );
}
