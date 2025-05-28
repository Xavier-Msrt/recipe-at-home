import { Ingredient } from '@/generated/prisma';

export type IngredientForm = Omit<Ingredient, 'id' | 'recipeId'>;

export type IngredientFormList = IngredientForm[];
