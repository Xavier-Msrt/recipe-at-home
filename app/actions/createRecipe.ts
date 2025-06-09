'use server';

import minioClient from '@/lib/minio';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import {
    sanitizeRecipe,
    sanitizeIngredients,
    sanitizeSteps,
} from '@/lib/sanitize';
import { IngredientFormList } from '@/types/Ingredient';
import { RecipeForm } from '@/types/Recipe';
import { StepFormList } from '@/types/Step';
import { Ingredient, Recipe } from '@/generated/prisma';

const MAX_IMAGE_SIZE_MB = 3;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

function isEmpty(value: any) {
    return (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '')
    );
}

export async function createRecipe(
    recipe: RecipeForm,
    ingredients: IngredientFormList,
    steps: StepFormList,
    picture: File
): Promise<{
    success: boolean;
    errors?: Record<string, boolean>;
    recipe?: Recipe;
}> {
    const errors = {
        title: false,
        description: false,
        ingredientsName: false,
        ingredientsQuantity: false,
        stepNum: false,
        stepDescription: false,
        picture: false,
        pictureSize: false,
    };

    if (!recipe.title?.trim()) errors.title = true;
    if (!recipe.description?.trim()) errors.description = true;

    if (ingredients.some((i) => !i.name?.trim())) {
        errors.ingredientsName = true;
    } else if (ingredients.some((i) => i.quantity <= 0)) {
        errors.ingredientsQuantity = true;
    }

    if (steps.some((s) => !s.description?.trim())) {
        errors.stepDescription = true;
    } else if (steps.some((s) => s.num <= 0)) {
        errors.stepNum = true;
    }

    if (!picture) {
        errors.picture = true;
    } else if (picture.size > MAX_IMAGE_SIZE_BYTES) {
        errors.pictureSize = true;
    }

    const hasErrors = Object.values(errors).some((v) => v === true);
    if (hasErrors) return { success: false, errors };

    const cleanRecipe = sanitizeRecipe(recipe);
    const cleanIngredients = sanitizeIngredients(ingredients);
    const cleanSteps = sanitizeSteps(steps);

    const buffer = Buffer.from(await picture.arrayBuffer());
    const extension = picture.name.split('.').pop();
    const fileName = uuidv4() + '.' + extension;

    const exists = await minioClient.bucketExists(
        process.env.MINIO_BUCKET as string
    );
    if (!exists) {
        await minioClient.makeBucket(process.env.MINIO_BUCKET as string);
    }

    await minioClient.putObject(
        process.env.MINIO_BUCKET as string,
        fileName,
        buffer,
        buffer.length,
        {
            'Content-Type': picture.type,
        }
    );

    const recipeCreated = await prisma.$transaction(async (tr) => {
        const currentRecipe = await tr.recipe.create({
            data: {
                ...cleanRecipe,
                picture: fileName,
            },
        });

        if (ingredients.length > 0) {
            await tr.ingredient.createMany({
                data: cleanIngredients.map((ingredient) => ({
                    ...ingredient,
                    recipeId: currentRecipe.id,
                })),
            });
        }

        if (steps.length > 0) {
            await tr.step.createMany({
                data: cleanSteps.map((step) => ({
                    ...step,
                    recipeId: currentRecipe.id,
                })),
            });
        }

        return currentRecipe;
    });

    return { success: true, recipe: recipeCreated };
}
