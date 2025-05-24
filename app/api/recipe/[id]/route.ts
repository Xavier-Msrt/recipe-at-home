import sql from '@/lib/data';
// import { Ingredient } from '@/types/Ingredient';
// import { Recipe } from '@/types/Recipe';
// import { Step } from '@/types/Step';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET(
//     req: Request,
//     { params }: { params: { id: number } }
// ) {
//     const { id } = await params;
//     if (id < 0 || id > 9999)
//         return NextResponse.json({ error: 'id not correct' }, { status: 400 });

//     let recipe = {};

//     try {
//         const detail = await sql<
//             Recipe[]
//         >`SELECT * FROM recipeathome.recipes WHERE id = ${id};`;
//         recipe = detail[0];

//         const ingredients = await sql<
//             Ingredient[]
//         >`SELECT * FROM recipeathome.ingredients WHERE recipe = ${id};`;
//         recipe = { ...recipe, ingredients };

//         const steps = await sql<
//             Step[]
//         >`SELECT * FROM recipeathome.steps WHERE recipe = ${id};`;
//         recipe = { ...recipe, steps };
//     } catch {
//         return NextResponse.json({ error: 'Server error' }, { status: 500 });
//     }
//     return NextResponse.json(JSON.stringify(recipe));
// }

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;

        await sql.begin(async (sql) => {
            await sql`DELETE FROM recipeathome.ingredients WHERE recipe = ${id};`;
        });

        await sql.begin(async (sql) => {
            await sql`DELETE FROM recipeathome.steps WHERE recipe = ${id};`;
        });

        await sql.begin(async (sql) => {
            await sql`DELETE FROM recipeathome.recipes WHERE id = ${id};`;
        });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
    return NextResponse.json({ status: 204 });
}
