'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
    const [query, setQuery] = useState(initialQuery);
    const router = useRouter();
    const searchParams = useSearchParams();

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
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une recette..."
            className="w-full p-2 border rounded-md mb-4"
        />
    );
}
