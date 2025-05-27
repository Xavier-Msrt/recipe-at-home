'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useTranslations } from 'next-intl';

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
    const [query, setQuery] = useState(initialQuery);
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations('SearchBar');

    const updateQuery = debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set('query', value);
        else params.delete('query');
        router.push(`/?${params.toString()}`);
    }, 500);

    useEffect(() => {
        updateQuery(query);
        return () => updateQuery.cancel();
    }, [query]);

    return (
        <div className="flex justify-center mb-4">
            <label className="input">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    className="grow"
                    placeholder={t('search')}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </label>
        </div>
    );
}
