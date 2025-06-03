// lib/sanitize.ts
import xss from 'xss';
import { RecipeForm } from '@/types/Recipe';
import { IngredientFormList } from '@/types/Ingredient';
import { StepFormList } from '@/types/Step';

const sanitize = (input: string) => xss(input.trim());

export function sanitizeRecipe(recipe: RecipeForm): RecipeForm {
    return {
        ...recipe,
        title: sanitize(recipe.title),
        description: sanitize(recipe.description),
    };
}

export function sanitizeIngredients(
    ingredients: IngredientFormList
): IngredientFormList {
    return ingredients.map((ingredient) => ({
        ...ingredient,
        name: sanitize(ingredient.name),
        quantity: Number(ingredient.quantity),
        unit: sanitize(ingredient.unit ?? ''),
    }));
}

export function sanitizeSteps(steps: StepFormList): StepFormList {
    return steps.map((step) => ({
        ...step,
        num: Number(step.num),
        description: sanitize(step.description),
    }));
}
