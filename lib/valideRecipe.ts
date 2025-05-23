import {
    InvalidIngredientFormat,
    InvalidRecipeFormat,
    InvalidStepFormat,
    MissingDetailRecipe,
    MissingIngredientRecipe,
    MissingStepRecipe,
} from './erros';
import Joi from 'joi';
import { Ingredient } from '@/types/Ingredient';
import { SendRecipe, Recipe } from '@/types/Recipe';
import { Step } from '@/types/Step';

export function checkDetail(recipe: FormDataEntryValue): SendRecipe {
    if (!recipe) {
        throw new MissingDetailRecipe();
    }

    const recipeDetail: Recipe = JSON.parse(recipe.toString());
    const schemaRecipeDetail = Joi.object({
        title: Joi.string()
            .pattern(/^[\p{L}\p{N} ^¨`´'.!?,-—]*$/u)
            .min(3)
            .max(200)
            .required(),
        description: Joi.string()
            .pattern(/^[\p{L}\p{N} ^¨`´'.!?,-—]*$/u)
            .min(10)
            .max(2000)
            .required(),
    });

    const { error } = schemaRecipeDetail.validate(recipeDetail);
    if (error) {
        throw new InvalidRecipeFormat();
    }

    return recipeDetail;
}

export function checkIngredients(
    ingredients: FormDataEntryValue
): Ingredient[] {
    if (!ingredients) {
        throw new MissingIngredientRecipe();
    }

    const schemaIngredient = Joi.object({
        id: Joi.number().default(0),
        name: Joi.string()
            .pattern(/^[\p{L}\p{N} ^¨`´'.!?,-]*$/u)
            .min(3)
            .max(30)
            .required(),
        quantity: Joi.number().greater(0).less(9999).required(),
        unit: Joi.string()
            .pattern(/^[\p{L}\p{N} ^¨`´'.!?,-]*$/u)
            .min(1)
            .max(10)
            .allow(null, ''),
    });

    const ingredientsObj: Ingredient[] = JSON.parse(ingredients.toString());
    for (let i = 0; i < ingredientsObj.length; i++) {
        const element: Ingredient = ingredientsObj[i];

        const { error } = schemaIngredient.validate(element);
        if (error) {
            throw new InvalidIngredientFormat(i);
        }
    }

    return ingredientsObj;
}

export function checkSteps(steps: FormDataEntryValue): Step[] {
    if (!steps) {
        throw new MissingStepRecipe();
    }

    const schemaStep = Joi.object({
        num: Joi.number().required().greater(0).less(100).required(),
        description: Joi.string()
            .pattern(/^[\p{L}\p{N} ^¨`´'.!?,-]*$/u)
            .min(5)
            .max(700)
            .required(),
    });

    const stepsObj: Step[] = JSON.parse(steps.toString());
    for (let i = 0; i < stepsObj.length; i++) {
        const element: Step = stepsObj[i];
        const { error } = schemaStep.validate(element);
        if (error) {
            throw new InvalidStepFormat(i);
        }
    }

    return stepsObj;
}
