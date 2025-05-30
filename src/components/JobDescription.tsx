'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';

interface JobDescriptionProps {
    description: string;
}

export default function JobDescription({ description }: JobDescriptionProps) {
    const t = useTranslations('Jobs');
    const [isExpanded, setIsExpanded] = useState(false);

    if (!description) {
        return null;
    }

    return (
        <div className="text-gray-700">
            {isExpanded && <p className="mb-2">{description}</p>}
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 font-medium"
            >
                {isExpanded ? t('Read less') : t('Read more')}
            </Button>
        </div>
    );
}
