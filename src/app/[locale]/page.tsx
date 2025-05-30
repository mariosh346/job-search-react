import { getTranslations } from 'next-intl/server';
import IndexPageContent from '@/components/IndexPageContent';
import { fetchJobs } from '@/api/fetchJobs';
import { JobsProvider } from '@/contexts/JobsContext';

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props) {
  const t = await getTranslations('IndexPage');
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function IndexPage({
  params, searchParams
}: Props) {
  const jobsParams = {
    ...await searchParams,
    lang: (await params).locale
  }
  const jobs = await fetchJobs(jobsParams);

  return (
    <main className="h-full gap-2 p-4">
      <JobsProvider jobs={jobs}>
        <IndexPageContent />
      </JobsProvider>
    </main>
  );
}
