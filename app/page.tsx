import { searchRecipes } from './actions/searchRecipes';
import SearchBar from '@/components/SearchBar';
import RecipeList from '@/components/RecipeList';
import Pagination from '@/components/Pagination';

export default async function Home({
    searchParams,
}: {
    searchParams: { query?: string; page?: string };
}) {
    const params = await searchParams;
    const query = params.query || '';
    const page = parseInt(searchParams.page || '1');
    const pageSize = 9;

    const { recipes, total } = await searchRecipes(query, page, pageSize);
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className='mb-20'>
            <SearchBar initialQuery={query} />
            <RecipeList recipes={recipes} />
            <Pagination page={page} totalPages={totalPages} query={query} />
        </div>
    );
}
