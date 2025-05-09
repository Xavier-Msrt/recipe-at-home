"use client";
import {CompleteRecipe} from "@/types/CompleteRecipe";
import {Step} from "@/types/Step";
import {useState} from "react";
import Input from "@/components/Input";
import { Ingredient } from "@/types/Ingredient";
import Button from "@/components/Button";

export default function AddRecipePage() {
    const [recipe, setRecipe] = useState<CompleteRecipe>({
        id: 0,
        image: "",
        title: "",
        description: "",
        ingredients: [
            {
                name: "",
                quantity: "",
                unit: ""
            }
        ],
        steps: [
            {
                id: 1,
                description: ""
            }
        ],
    });
    const handleTitleChange = (title: string) => {
        setRecipe({...recipe, title});
    }

    const handleDescriptionChange = (description: string) => {
        setRecipe({...recipe, description});
    }

    const handleIngredientsChange = (index: number, key: keyof Ingredient, value: string) => {
        const updatedIngredient = [...recipe.ingredients];
        updatedIngredient[index] = {
            ...updatedIngredient[index],
            [key]: value
        };
        setRecipe({...recipe, ingredients: updatedIngredient});
    }

    const handleStepChange = (index: number, key: keyof Step, value: string) => {
        const updatedSteps = [...recipe.steps];
        updatedSteps[index] = {
            ...updatedSteps[index],
            [key]: value
        };
        setRecipe({...recipe, steps: updatedSteps});
    };

    const handleAddIngredient = () => {
        const ingredients = recipe.ingredients;
        ingredients.push({
            name: "",
            quantity: "",
            unit: ""
        });
        setRecipe({...recipe, ingredients});
    }

    const handleAddStep = () => {
        const steps = recipe.steps;
        steps.push({
            id: steps.length + 1,
            description: ""
        });
        setRecipe({...recipe, steps});
    }

    const handleCreateBtn = () => {
        console.log(JSON.stringify(recipe));
    }

    return (
        <div className="flex justify-center">
             <div className="w-1/2 shadow-md rounded-lg p-4">
                 <h1 className="text-2xl font-bold mt-4">Création d'une recette</h1>

                 <form>
                    <div className="ml-4">
                        <Input type="text" label="Titre" setValue={handleTitleChange} />
                        <Input type="area" label="Description" setValue={handleDescriptionChange} />
                    </div>
                     <h3 className="text-xl font-bold">Ingredients</h3>
                     <div className="ml-4">
                        {recipe.ingredients.map((v, index) => {
                            return (
                                <div className="flex gap-4" key={index}>
                                    <Input type="text" label="Nom" setValue={v => handleIngredientsChange(index, "name", v)} />
                                    <Input type="text" label="Quantité" setValue={v => handleIngredientsChange(index, "quantity", v)} />
                                    <Input type="text" label="Unité" setValue={v => handleIngredientsChange(index, "unit", v)} />
                                </div>
                            )
                        })}
                     </div>
                     <Button 
                        text="Ajouter un ingredient" 
                        handle={handleAddIngredient}/>

                     <h3 className="text-xl font-bold">Etapes</h3>
                     <div className="ml-4">
                        {recipe.steps.map((v, index) => {
                            return (
                                <div key={v.id}>
                                    <Input type="text" label="Description" setValue={v => handleStepChange(index, "description", v)} />
                                </div>
                            )
                        })}
                     </div>
                     <Button 
                        text="Ajouter une étape" 
                        handle={handleAddStep}/>

                     <Button 
                        text="Creer la recette" 
                        handle={handleCreateBtn}/>
                 </form>
             </div>
        </div>
    )
}