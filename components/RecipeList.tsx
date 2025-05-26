export default function RecipeList({
    recipes,
}: {
    recipes: { id: string; title: string }[];
}) {
    if (recipes.length === 0) {
        return <p>Aucune recette trouvée.</p>;
    }

    return (
        <ul className="space-y-2">
            {recipes.map((recipe) => (
                <li key={recipe.id} className="p-4 border rounded-md">
                    {recipe.title}
                </li>
            ))}
        </ul>
    );
}
