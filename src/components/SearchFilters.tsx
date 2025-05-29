'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFiltersQuery } from '@/hooks/useJobsQuery';
import { Input } from '@mui/material';
import { Filter } from './Filter';

export default function SearchFilters() {
    const t = useTranslations('Filters');
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: filters } = useFiltersQuery();

    const handleFilterChange = (type: string, value: unknown) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, String(value));
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="my-8 flex gap-4">
            <Filter
                type="location"
                options={filters?.locations}
                onChange={(value) => handleFilterChange('location', value)}
            />

            <Filter
                type="category"
                options={filters?.categories}
                onChange={(value) => handleFilterChange('category', value)}
            />

            <Input
                type="search"
                placeholder={t('searchPlaceholder')}
                className="p-2"
                onChange={(e) => handleFilterChange('q', e.target.value)}
            />
        </div>
    );
}
