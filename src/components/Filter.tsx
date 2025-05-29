import { useTranslations } from 'next-intl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface FilterProps {
    value: string;
    options?: { slug: string }[];
    onChange: (value: string) => void;
    type: 'location' | 'category';
}

export function Filter({ value, options, onChange, type }: FilterProps) {
    const t = useTranslations('Filters');

    return (
        <Select
            onChange={(e) => onChange(e.target.value)}
            aria-label={t(`${type}Label`)}
            value={value}
            displayEmpty
        >
            <MenuItem key={`all${type}`} value="">{t(`all${type}s`)}</MenuItem>
            {options?.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                    {option.slug}
                </MenuItem>
            ))}
        </Select>
    );
}
