'use client';
import { Recipe } from '@/types/Recipe';
import RecipeListCard from '@/components/RecipeList/RecipeListCard';
import { useEffect, useState } from 'react';

export default function RecipeList({ search }: { search: string }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch('/api/recipe');
      const data = await res.json();
      setRecipes(data);
    }
    fetchRecipes();
  }, []);

  const filterBySearch = (recipe: Recipe) => {
    if (search === '') return recipes;

    return recipe.title.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <div className="flex flex-row justify-center flex-wrap gap-10 mt-4">
      {recipes.filter(filterBySearch).map((recipe: Recipe) => {
        return <RecipeListCard key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
}
