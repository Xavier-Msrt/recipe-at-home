import sql from '@/lib/data';
import { Ingredient } from '@/types/Ingredient';
import { Recipe } from '@/types/Recipe';
import { Step } from '@/types/Step';
import fs from 'fs';
import path from 'path';
import { InvalidId } from './erros';

export async function getRecipe() {
    return sql<Recipe[]>`SELECT * FROM recipeathome.recipes;`;
}

export async function getOneRecipeDetail(id: number) {
    if (id < 0 || id > 9999) throw new InvalidId();

    let recipe = {};

    try {
        const detail = await sql<
            Recipe[]
        >`SELECT * FROM recipeathome.recipes WHERE id = ${id};`;
        recipe = detail[0];

        const ingredients = await sql<
            Ingredient[]
        >`SELECT id, name, quantity, unit FROM recipeathome.ingredients WHERE recipe = ${id};`;
        recipe = { ...recipe, ingredients };

        const steps = await sql<
            Step[]
        >`SELECT * FROM recipeathome.steps WHERE recipe = ${id};`;
        recipe = { ...recipe, steps };
    } catch {
        throw new Error('Server error');
    }
    return recipe;
}

export async function getRecipePicture(id: number) {
    if (id < 0 || id > 9999) throw new InvalidId;

    const extensions = ['.png', '.jpeg', '.jpg'];
    const publicPath = process.cwd() + '/public/uploads';

    for (const ext of extensions) {
        const filePath = path.join(publicPath, `${id}${ext}`);
        if (fs.existsSync(filePath)) {
            return {
                apiPath: `/uploads/${id}${ext}`,
                filePath,
                ext,
            };
        }
    }
    throw new Error('Server error');
}
