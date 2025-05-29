import { useTranslations } from 'next-intl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSearchParams } from 'next/navigation';

interface FilterProps {
    options?: { slug: string }[];
    onChange: (value: string) => void;
    type: 'location' | 'category';
}

export function Filter({ options, onChange, type }: FilterProps) {
    const t = useTranslations('Filters');
    const searchParams = useSearchParams();

    const value = searchParams.get(type) || '';

    return (
        <Select
            onChange={(e) => onChange(e.target.value)}
            aria-label={t(`${type} select`)}
            value={value}
            displayEmpty
        >
            <MenuItem key={type} value="">{t(type)}</MenuItem>
            {options?.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                    {option.slug}
                </MenuItem>
            ))}
        </Select>
    );
}
