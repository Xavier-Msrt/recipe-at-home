import { searchRecipes } from './actions/searchRecipes';
import SearchBar from '@/components/SearchBar';
import RecipeList from '@/components/RecipeList';

export default async function Home({
    searchParams,
}: {
    searchParams: { query?: string };
}) {
    const params = await searchParams;
    const query = params.query || '';
    const recipes = await searchRecipes(query);

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <SearchBar initialQuery={query} />
            <RecipeList recipes={recipes} />
        </main>
    );
}
