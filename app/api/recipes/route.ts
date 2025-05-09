import sql from "@/lib/data";
import { Recipe } from '@/types/Recipe'
// import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return new Response(JSON.stringify(await sql<Recipe[]>`SELECT * FROM recipeathome.recipes;`));
}

// export async function POST(req: NextRequest, res: NextResponse) {
//     const body = req.body;
    
// }