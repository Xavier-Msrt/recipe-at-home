import { Ingredient } from './Ingredient';
import { Step } from './Step';

export interface SendRecipe {
  title: string;
  description: string;
}

export interface Recipe extends SendRecipe {
  id: number;
  image: string;
}

export interface FullRecipe extends SendRecipe {
  steps: Step[];
  ingredients: Ingredient[];
}
