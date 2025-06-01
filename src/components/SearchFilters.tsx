'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFiltersQuery } from '@/hooks/useJobsQuery';
import { Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Filter } from './Filter';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

export default function SearchFilters() {
    const t = useTranslations('Filters');
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [inputValue, setInputValue] = useState(query);

    const { data: filters } = useFiltersQuery();

    const handleFilterChange = (type: string, value: unknown) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, String(value));
        params.delete('page');
        router.push(`?${params.toString()}`);
    };

    const debouncedSearch = useCallback(
        (value: string) => {
            handleFilterChange('q', value);
        },
        [handleFilterChange]
    );

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (inputValue !== query) {
                debouncedSearch(inputValue);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [inputValue, debouncedSearch, query]);

    return (
        <div className="my-8 flex flex-wrap gap-4">
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                inputProps={{ 'aria-label': t('searchPlaceholder') }}
            />
            <Link href='/' className='content-center' aria-label={t('Clear filters')}> <DeleteIcon /> </Link>
        </div>
    );
}
