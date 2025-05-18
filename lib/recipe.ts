import sql from "@/lib/data";
import { Ingredient } from "@/types/Ingredient";
import { Recipe } from "@/types/Recipe";
import { Step } from "@/types/Step";
import fs from 'fs';
import path from 'path';

export async function getRecipe() {
  return sql<Recipe[]>`SELECT * FROM recipeathome.recipes;`;
}

export async function getOneRecipeDetail(id: number) {
  if(id < 0 || id > 9999) throw new Error("id not correct");
  
  let recipe = {};


  try {
    const detail = await sql<Recipe[]>`SELECT * FROM recipeathome.recipes WHERE id = ${id};`;
    recipe = detail[0];

    const ingredients: Ingredient[] = await sql<Ingredient[]>`SELECT id, name, quantity, unit FROM recipeathome.ingredients WHERE recipe = ${id};`;
    recipe = {...recipe, ingredients};

    const steps = await sql<Step[]>`SELECT * FROM recipeathome.steps WHERE recipe = ${id};`;
    recipe = {...recipe, steps};

  }catch (error) {
    throw new Error("Server error");
  }
  return recipe;
}

export async function getRecipePicture(id : number) {
  if(id < 0 || id > 9999) throw new Error("id not correct");
  
  const extensions = ['.png', '.jpeg']
  const publicPath = process.cwd() + "/public/uploads";

  for (let ext of extensions) {
    const filePath = path.join(publicPath, `${id}${ext}`)
    if (fs.existsSync(filePath)) {
        return `/uploads/${id}${ext}`;
    }
  }
  throw new Error("Server error");
}