import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSearchParams } from 'next/navigation';
import type { Filter } from '@/schemas/filterSchema';

interface FilterProps {
    options?: Filter[];
    onChange: (value: string) => void;
    type: 'location' | 'category';
}

export function Filter({ options, onChange, type }: FilterProps) {
    const t = useTranslations('Filters');
    const searchParams = useSearchParams();
    const locale = useLocale();
    const localeToLabel = (locale: string) => `label_${locale}` as keyof Filter

    const value = searchParams.get(type) || '';

    return (
        <Select
            onChange={(e) => onChange(String(e.target.value))}
            value={value}
            inputProps={{
                'aria-label': t(`${type} select`),
            }}
            displayEmpty
        >
            <MenuItem key={type} value="">{t(type)}</MenuItem>
            {options?.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                    {option[localeToLabel(locale)]}
                </MenuItem>
            ))}
        </Select>
    );
}
