"use client";
import {Step} from "@/types/Step";
import {useState} from "react";
import Input from "@/components/Input";
import { Ingredient } from "@/types/Ingredient";
import Button from "@/components/Button";
import { Recipe } from "@/types/Recipe";
import FormDetailRecipe from "@/components/RecipeAdd/FormDetailRecipe";
import FormIngredient from "@/components/RecipeAdd/FormIngredient";
import FormStep from "@/components/RecipeAdd/FormSteps";

export default function AddRecipePage() {
    const [recipe, setRecipe] = useState<Recipe>({
        id: 0,
        image: "",
        title: "",
        description: ""
    });
    const [picture, setPicture] = useState();

    const [ingredients, setIngredients] = useState<Ingredient[]>([
        {
            name: "",
            quantity: "",
            unit: ""
        }
    ]);

    const [steps, setSteps] = useState<Step[]>([
        {
            id: 1,
            description: ""
        }
    ])



    const handleCreateBtn = async () => {
        const formData = new FormData();

        formData.append('recipe', JSON.stringify(recipe));
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('steps', JSON.stringify(steps));
        if(picture)
            formData.append('picture', picture);

        await fetch('/api/recipes', {
            method: "POST",
            body: formData
        })
    }

    return (
        <div className="flex justify-center">
             <div className="w-1/2 shadow-md rounded-lg p-4">
                 <h1 className="text-2xl font-bold mt-4">Création d'une recette</h1>
                 <form>
                        <FormDetailRecipe 
                            detail={{recipe, setRecipe}}
                            picture={{picture, setPicture}}
                        />
                        <FormIngredient
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                        />
                        <FormStep
                            steps={steps}
                            setSteps={setSteps}   
                        />                     

                        <div className="flex justify-center mt-4">
                            <Button 
                            text="Creer la recette" 
                            handle={handleCreateBtn}/>
                        </div>
                 </form>
             </div>
        </div>
    )
}