import { searchRecipes } from './actions/searchRecipes';
import SearchBar from '@/components/SearchBar';
import RecipeList from '@/components/RecipeList';
import Pagination from '@/components/Pagination';

export default async function Page({
    searchParams,
}: {
    searchParams: { query?: string; page?: string };
}) {
    const params = await searchParams;
    const query = params.query || '';
    const page = parseInt(params.page || '1');
    const pageSize = 9;

    const { recipes, total } = await searchRecipes(query, page, pageSize);
    const totalPages = Math.ceil(total / pageSize);

    return (
        <>
            <SearchBar initialQuery={query} />
            <RecipeList recipes={recipes} />
            {total > 0 && (
                <Pagination page={page} totalPages={totalPages} query={query} />
            )}
        </>
    );
}
