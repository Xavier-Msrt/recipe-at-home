import sql from "@/lib/data";
import { Ingredient } from "@/types/Ingredient";
import { Recipe } from "@/types/Recipe";
import { Step } from "@/types/Step";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export async function GET() {
	return new Response(
		JSON.stringify(await sql<Recipe[]>`SELECT * FROM recipeathome.recipes;`)
	);
}

export async function POST(req: NextRequest, res: NextResponse) {
	const data = await req.formData();
	const body = Object.fromEntries(data);

	const detail = checkDetail(body.recipe);
	const ingredients = checkIngredients(body.ingredient);
	const steps = checkSteps(body.step);


	// file upload
	const file = (body.picture as Blob) || null;
	
	if (!file) {
		return NextResponse.json({ error: "Picture is required" }, { status: 400 });
	}
	savePicture(file, "123.jpg")

	// DB SAVE

	return new Response();
}


async function savePicture(file: Blob, fileName: string){
	

	if (!file.type.startsWith("image/png") && !file.type.startsWith("image/jpeg")) {
		return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
	}

	if (file.size > 5 * 1024 * 1024) { // 5MB limit
		return NextResponse.json({ error: "File too large" }, { status: 400 });
	}

	//save pic
	const buffer = Buffer.from(await file.arrayBuffer());
	if (!fs.existsSync(UPLOAD_DIR)) {
		fs.mkdirSync(UPLOAD_DIR);
	}
	fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);

}


function checkDetail(recipe: FormDataEntryValue) {
	if (!recipe) {
		return NextResponse.json(
			{ error: "recipe detail missing" },
			{ status: 400 }
		);
	}

	const recipeDetail: Recipe = JSON.parse(recipe.toString());
	if (!recipeDetail.title || !recipeDetail.description) {
		return NextResponse.json(
			{ error: "title or description missing" },
			{ status: 400 }
		);
	}

	return recipeDetail;
}

function checkIngredients(ingredients: FormDataEntryValue) {
	if (!ingredients) {
		return NextResponse.json({ error: "ingredients missing" }, { status: 400 });
	}

	const ingredientsObj: Ingredient[] = JSON.parse(ingredients.toString());
	for (let i = 0; i < ingredientsObj.length; i++) {
		const element: Ingredient = ingredientsObj[i];
		if (!element.name || !element.quantity) {
			return NextResponse.json(
				{ error: "ingredient " + i + " missing name or quantity" },
				{ status: 400 }
			);
		}
	}

	return ingredientsObj;
}

function checkSteps(steps: FormDataEntryValue) {
	if (!steps) {
		return NextResponse.json({ error: "steps missing" }, { status: 400 });
	}

	const stepsObj: Step[] = JSON.parse(steps.toString());
	for (let i = 0; i < stepsObj.length; i++) {
		const element: Step = stepsObj[i];
		if (!element.description) {
			return NextResponse.json(
				{ error: "steps " + i + " missing description" },
				{ status: 400 }
			);
		}
	}

	return stepsObj;
}
