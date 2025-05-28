'use client';

import { useTranslations } from 'next-intl';

export default function IndexPageContent() {
    const t = useTranslations('IndexPage');

    return (
        <div>
            {t('description.text')}{' '}
            <code>next-intl</code>{' '}
            {t('description.withRouter')}{' '}
            <span>{t('description.tryChanging')}</span>
        </div>
    );
}
