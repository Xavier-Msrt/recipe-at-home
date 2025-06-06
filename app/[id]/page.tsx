import { Ingredient, Recipe } from '@/generated/prisma';
import { getRecipeById } from '../actions/getRecipeById';
import Image from 'next/image';
import { redirect } from 'next/navigation';

interface PageProps {
    params: { id: string };
}

export default async function Page({ params }: PageProps) {
    const id = (await params).id;
    const { recipe, picture, error } = await getRecipeById(Number(id));
    if (error || !recipe) {
        redirect('/');
    }

    return (
        <div className='flex-grow flex flex-col justify-center w-full'>
            <div className="flex justify-between gap-10 w-full">
                <div className="w-3/8 bg-orange-200 rounded-xl h-150">
                    <div className="w-full h-1/2 relative">
                        <Image
                            src={picture as string}
                            alt={recipe.title}
                            fill
                            className="object-cover rounded-t-xl"
                        />
                    </div>
                    <div className="mt-4 w-full overflow-y-auto px-5 ">
                        <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
                        <ul className="list-disc list-inside">
                            {recipe.ingredients.map((ingredient: Ingredient) => (
                                <li key={ingredient.id}> {ingredient.quantity}{ingredient.unit ? " " + ingredient.unit : "x"} {ingredient.unit} {ingredient.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-5/8 p-5 rounded-xl h-150 shadow">
                    <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
                    <p className="text-gray-700 mb-8 ml-4">{recipe.description}</p>

                    <h2 className="text-xl font-semibold mb-2 ml-4">Steps</h2>
                    <ol className="list-decimal list-inside space-y-2 ml-8">
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step.description}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}
