import IngredientListItem from "@/components/IngredientListItem";
import StepListItem from "@/components/StepListItem";
import { getOneRecipeDetail, getRecipePicture } from "@/lib/recipe";
import { FullRecipe } from "@/types/Recipe";
import { getTranslations } from "next-intl/server";


export default async function RecipeDetail({
    params,
}: {
    params: Promise<{ id: number}>
}) {
    const { id } = await params;
    const t = await getTranslations('DetailRecipePage');

    let recipe: FullRecipe;
    let picture: String;
    try {
        recipe = await getOneRecipeDetail(id) as FullRecipe;
        picture = (await getRecipePicture(id)).apiPath as string;
    } catch (error) {
        return (
            <>
                <h1 className="text-center font-bold text-3xl">{t('not-found-recipe')}</h1>
            </>
        );
    }

    return(
        <>
            <div className="flex flex-row justify-between gap-5">
                <div className="shadow-2xl rounded-2xl bg-orange-200 w-1/4 h-full">
                    <div className="flex justify-center">
                        <img 
                            src={picture}
                            className=" rounded-t-2xl object-center"
                            />
                    </div>
                    <div className="p-2 pt-0 text-white">
                        <h3 className="my-4 font-bold text-xl">{t('list-ingredients-title')}</h3>
                        <ul className="m-2">
                            {recipe.ingredients.map((v, index) => {
                                return <IngredientListItem key={v.id} ingredient={v} />
                            })} 
                        </ul>
                    </div> 
                </div>
                <div className="shadow-2xl rounded-2xl w-3/4 p-4">
                    <h2 className="text-4xl font-bold mb-4">{recipe.title}</h2>
                    <p className="break-all mb-4 m-4">{recipe.description}</p>
                    <div>
                        {recipe.steps.sort((a, b) => a.num - b.num).map((v, index) => {
                            return <StepListItem key={v.num} step={v}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}