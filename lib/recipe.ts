import sql from "@/lib/data";
import {Recipe} from "@/types/Recipe";

export default async function getRecipe() {
    return sql<Recipe[]>`SELECT * FROM recipeathome.recipes;`;
}