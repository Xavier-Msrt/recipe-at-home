import { Recipe } from '@/generated/prisma';

export type RecipeForm = Omit<Recipe, 'id' | 'picture'>;
