import {Step} from "@/types/Step";
import { Ingredient } from "./Ingredient";

export type CompleteRecipe = {
    id: number | undefined;
    title: string;
    description: string;
    image: string;
    steps: Step[];
    ingredients: Ingredient[];
}