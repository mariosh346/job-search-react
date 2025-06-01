import type { JobPosting } from 'schema-dts';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { headers } from 'next/headers';
import { Job } from '@/schemas/jobSchema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const generateJobPostingsSchema = (jobs: Job[]): JobPosting[] => {
  return jobs.map(job => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.postedAt,
    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location
      }
    },
    "industry": job.category,
    "skills": job.tags
  }));
};

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export async function generateMetaData({ params, searchParams }: Props) {
  const t = await getTranslations('IndexPage');
  const locale = (await params).locale;
  const searchQuery = (await searchParams).q as string;

  const title = searchQuery
    ? t('title', { query: searchQuery })
    : t('title');
  const description = t('description');

  const headersList = await headers();
  const fullPathWithQuery = headersList.get('x-invoke-path') || `/${locale}`;

  const canonicalUrl = `${SITE_URL}${fullPathWithQuery}`;

  const alternates: Record<string, string> = {};
  for (const lang of routing.locales) {
    const localizedPath = fullPathWithQuery.replace(`/${locale}`, `/${lang}`);
    alternates[lang] = `${SITE_URL}${localizedPath}`;
  }

  alternates['x-default'] = `${SITE_URL}/${routing.locales[0] || 'en'}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true
    },
  };
}

export const generateWebPageSchema = (title: string, description: string, headers: Headers, lang: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${SITE_URL}${headers.get('x-invoke-path') || `/${lang}`}`,
  };
};
