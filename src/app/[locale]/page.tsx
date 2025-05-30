import IndexPageContent from '@/components/IndexPageContent';
import { fetchJobs } from '@/api/fetchJobs';
import { JobsProvider } from '@/contexts/JobsContext';
import { headers } from 'next/headers';
import type { JobPosting } from 'schema-dts';
import { generateJobPostingsSchema, generateWebPageSchema, generateMetaData } from '@/utils/schemaGenerator';

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const generateMetadata = generateMetaData

export default async function IndexPage({ params, searchParams }: Props) {
  const searchParamsAwaited = (await searchParams)
  const jobsParams = {
    ...searchParamsAwaited,
    lang: (await params).locale,
    page: searchParamsAwaited.page && Number(searchParamsAwaited.page),
    pageSize: searchParamsAwaited.pageSize && Number(searchParamsAwaited.pageSize),
  };
  const jobs = await fetchJobs(jobsParams);

  const jobPostingsSchema: JobPosting[] = generateJobPostingsSchema(jobs.results);

  const { title, description } = await generateMetadata({ params, searchParams })

  const webPageSchema = generateWebPageSchema(title, description, await headers(), (await params).locale);

  return (
    <main className="h-full gap-2 p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {jobPostingsSchema.map((jobLd, index) => (
        <script
          key={`${jobLd.title}${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }}
        />
      ))}

      <JobsProvider jobs={jobs}>
        <IndexPageContent />
      </JobsProvider>
    </main>
  );
}
