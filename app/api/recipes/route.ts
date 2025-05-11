import sql from "@/lib/data";
import { Ingredient } from "@/types/Ingredient";
import { Recipe } from '@/types/Recipe'
import { Step } from "@/types/Step";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return new Response(JSON.stringify(await sql<Recipe[]>`SELECT * FROM recipeathome.recipes;`));
}

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.formData();

    const detail = checkDetail(data);
    const ingredients = checkIngredients(data);
    const steps = checkSteps(data);

    const picture = data.get('picture');
    if(!picture) {
        return NextResponse.json({error: 'picture missing'}, {status: 400});
    }

    // SAVE picture
    // DB SAVE

    return new Response();
}

function checkDetail(data: FormData) {
    const recipe = data.get('recipe');
    if(!recipe){
        return NextResponse.json({error: 'recipe detail missing'}, {status: 400});
    }

    const recipeDetail: Recipe = JSON.parse(recipe.toString());
    if(!recipeDetail.title ||
        !recipeDetail.description
    ){
        return NextResponse.json({ error: 'title or description missing'}, {status: 400});
    }


    return recipeDetail;
}

function checkIngredients(data: FormData) {
    const ingredients = data.get('ingredients');
    if(!ingredients){
        return NextResponse.json({error: 'ingredients missing'}, {status: 400});
    }

    const ingredientsObj: Ingredient[] = JSON.parse(ingredients.toString());
    for (let i = 0; i < ingredientsObj.length; i++) {
        const element: Ingredient = ingredientsObj[i];
        if(!element.name || !element.quantity) {
            return NextResponse.json({error: "ingredient " + i + " missing name or quantity"}, {status: 400});
        }
    }

    return ingredientsObj;
}

function checkSteps(data: FormData) {
    const steps = data.get('steps');
    if(!steps){
        return NextResponse.json({error: 'steps missing'}, {status: 400});
    }

    const stepsObj: Step[] = JSON.parse(steps.toString());
    for (let i = 0; i < stepsObj.length; i++) {
        const element: Step = stepsObj[i];
        if(!element.description) {
            return NextResponse.json({error: "steps " + i + " missing description"}, {status: 400});
        }
    }

    return stepsObj;    
}