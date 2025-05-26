'use client';

import { setUserLocale } from '@/services/locale';
import { useLocale } from 'next-intl';
import { MouseEvent, useTransition } from 'react';

export default function LocalSwitcher() {
    const [, startTransition] = useTransition();
    const currentLocal = useLocale();

    function onChange(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        startTransition(() => {
            setUserLocale(currentLocal == 'fr' ? 'en' : 'fr');
        });
    }

    return (
        <>
            <button onClick={onChange}>
                {currentLocal == 'fr' ? '🇬🇧' : '🇫🇷'}
            </button>
        </>
    );
}
