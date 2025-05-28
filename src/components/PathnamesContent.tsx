'use client';

import { useTranslations } from 'next-intl';

export default function PathnamesContent() {
    const t = useTranslations('PathnamesPage');

    return (
        <div>
            <p>{t('description.intro')}</p>
            <p>
                {t('description.english')}
                <code>/en/pathnames</code>
            </p>
            <p>
                {t('description.greek')}
                <code>/el/ονομα</code>
            </p>
        </div>
    );
}
