import sql from "@/lib/data";
import { Ingredient } from "@/types/Ingredient";
import { SendRecipe, Recipe } from "@/types/Recipe";
import { Step } from "@/types/Step";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import sharp from "sharp";

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
	if(detail instanceof NextResponse) return detail;

	const ingredients = checkIngredients(body.ingredients);
	if(ingredients instanceof NextResponse) return ingredients;

	const steps = checkSteps(body.steps);
	if(steps instanceof NextResponse) return steps;


	const file = (body.picture as File) || null;
	
	if (!file) {
		return NextResponse.json({ error: "Picture is required" }, { status: 400 });
	}


	await sql.begin(async sql => {
		const [recipe] = await sql`INSERT INTO recipeathome.recipes ${sql(detail, 'title', 'description')} RETURNING id;`;

		const recipeId = recipe.id;
		
		const ingredientsWithRecipe = ingredients.map(ing => ({
			...ing,
			recipe: recipeId
		}));
		await sql`INSERT INTO recipeathome.ingredients ${sql(ingredientsWithRecipe, 'recipe', 'name', 'quantity', 'unit')};`;

		// TODO STEPS
		const stepsWithRecipe = steps.map(step => ({
			...step,
			recipe: recipeId
		}));
		await sql`INSERT INTO recipeathome.steps ${sql(stepsWithRecipe, 'recipe', 'num', 'description')};`;

		savePicture(file, recipeId);
	});

	return new Response();
}


async function savePicture(file: Blob, fileName: string){
	

	if (!file.type.startsWith("image/png") && !file.type.startsWith("image/jpeg")) {
		return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
	}

	if (file.size > 5 * 1024 * 1024) { // 5MB limit
		return NextResponse.json({ error: "File too large" }, { status: 400 });
	}

	let extension = '';
	if (file.type === 'image/png') extension = '.png';
	else if (file.type === 'image/jpeg') extension = '.jpg';

	//save pic
	const bufferRawImage = Buffer.from(await file.arrayBuffer());
	const bufferCompressImage = await compressImage(bufferRawImage, file.type);
	if (!fs.existsSync(UPLOAD_DIR)) {
		fs.mkdirSync(UPLOAD_DIR);
	}
	fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName+extension), bufferCompressImage);

}


async function compressImage(buffer: Buffer, mimeType: string): Promise<Buffer> {
  if (mimeType === 'image/jpeg') {
    return sharp(buffer)
      .jpeg({
        quality: 85,
        mozjpeg: true
      })
      .toBuffer();
  }

  if (mimeType === 'image/png') {
    return sharp(buffer)
      .png({
        compressionLevel: 6,
        adaptiveFiltering: true
      })
      .toBuffer();
  }

  throw new Error('Unsupported image type');
}



function checkDetail(recipe: FormDataEntryValue): SendRecipe | NextResponse {
	if (!recipe) {
		return NextResponse.json(
			{ error: "recipe detail missing" },
			{ status: 400 }
		);
	}

	const recipeDetail: Recipe = JSON.parse(recipe.toString());
	const schemaRecipeDetail = Joi.object({
		title: Joi.string().alphanum().min(3).max(150).required(),
		description: Joi.string().alphanum().min(10).max(700).required()
	});

	const { error } = schemaRecipeDetail.validate(recipeDetail);
	if (error) {
		return NextResponse.json(
			{ error: "title or description not correct" },
			{ status: 400 }
		);
	}

	return recipeDetail;
}

function checkIngredients(ingredients: FormDataEntryValue): Ingredient[] | NextResponse {
	if (!ingredients) {
	 	return NextResponse.json({ error: "ingredients missing" }, { status: 400 });
	}

	const schemaIngredient = Joi.object({
		name: Joi.string().alphanum().min(3).max(30).required(),
		quantity: Joi.number().greater(0).less(100).required(),
		unit: Joi.string().alphanum().min(1).max(10).allow(null, '')
	})

	const ingredientsObj: Ingredient[] = JSON.parse(ingredients.toString());
	for (let i = 0; i < ingredientsObj.length; i++) {
		const element: Ingredient = ingredientsObj[i];
		
		const { error } = schemaIngredient.validate(element);
		if (error) {
			return NextResponse.json(
				{ error: "ingredient " + i + " not correct" },
				{ status: 400 }
			);
		}
	}

	return ingredientsObj;
}

function checkSteps(steps: FormDataEntryValue): Step[] | NextResponse {
	if (!steps) {
		return NextResponse.json({ error: "steps missing" }, { status: 400 });
	}
	
	const schemaStep = Joi.object({
		num: Joi.number().required().greater(0).less(100).required(),
		description: Joi.string().alphanum().min(5).max(700).required()
	})

	const stepsObj: Step[] = JSON.parse(steps.toString());
	for (let i = 0; i < stepsObj.length; i++) {
		const element: Step = stepsObj[i];
		const { error } = schemaStep.validate(element);
		if (error) {
			return NextResponse.json(
				{ error: "steps " + i + " not correct" },
				{ status: 400 }
			);
			
		}
	}

	return stepsObj;
}
