'use client';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import RecipeList from '@/components/RecipeList/RecipeList';

export default function Home() {
    const [query, setQuery] = useState<string>('');

    return (
        <>
            <SearchBar query={query} setQuery={setQuery} />
            <RecipeList search={query} />
        </>
    );
}
