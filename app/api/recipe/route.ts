import sql from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';
import { getRecipe } from '@/lib/recipe';
import { savePicture } from '@/lib/picture';
import { checkDetail, checkIngredients, checkSteps } from '@/lib/valideRecipe';
import { AppError } from '@/lib/erros';

export async function GET() {
    return new Response(JSON.stringify(await getRecipe()));
}

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const body = Object.fromEntries(data);

    try {
        const detail = checkDetail(body.recipe);
        const ingredients = checkIngredients(body.ingredients);
        const steps = checkSteps(body.steps);

        const file = (body.picture as File) || null;
        if (!file) {
            return NextResponse.json(
                { error: 'Picture is required' },
                { status: 400 }
            );
        }

        await sql.begin(async (sql) => {
            const [recipe] = await sql`INSERT INTO recipeathome.recipes ${sql(
                detail,
                'title',
                'description'
            )} RETURNING id;`;

            const recipeId = recipe.id;

            const ingredientsWithRecipe = ingredients.map((ing) => ({
                ...ing,
                recipe: recipeId,
            }));
            await sql`INSERT INTO recipeathome.ingredients ${sql(
                ingredientsWithRecipe,
                'recipe',
                'name',
                'quantity',
                'unit'
            )};`;

            const stepsWithRecipe = steps.map((step) => ({
                ...step,
                recipe: recipeId,
            }));
            await sql`INSERT INTO recipeathome.steps ${sql(
                stepsWithRecipe,
                'recipe',
                'num',
                'description'
            )};`;

            savePicture(file, recipeId);
        });
    } catch (error) {
        if (error instanceof AppError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }

    return Response.json({}, { status: 201 });
}
