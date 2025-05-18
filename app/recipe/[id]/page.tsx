import { Recipe } from "@/types/Recipe";

export default async function RecipeDetail({
    params,
}: {
    params: Promise<{ id: number}>
}) {
    const { id } = await params;
    const data = await fetch(`/api/recipe/${id}`)
    const recipe: Recipe = await data.json()

    return(
        <>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
        </>
    )
}