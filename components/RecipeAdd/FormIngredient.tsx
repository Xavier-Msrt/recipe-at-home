import { Ingredient } from "@/types/Ingredient";
import { Dispatch, SetStateAction } from "react";
import Input from "../Input";
import Button from "../Button";

export default function FormIngredient(
    {
        ingredients,
        setIngredients
    } : {
        ingredients: Ingredient[],
        setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
    }
)  {

    const handleIngredientsChange = (index: number, key: keyof Ingredient, value: string) => {
        const updatedIngredient = [...ingredients];
        updatedIngredient[index] = {
            ...updatedIngredient[index],
            [key]: value
        };
        setIngredients(updatedIngredient);
    }

    const handleAddIngredient = () => {
        const originalIngredients = [...ingredients];
        originalIngredients.push({
            name: "",
            quantity: "",
            unit: ""
        })
        setIngredients(originalIngredients);
    }


    return (
        <>
            <h3 className="text-xl font-bold">Ingredients</h3>
            <div className="ml-4">
                {ingredients.map((v, index) => {
                    return (
                        <div className="flex gap-4" key={index}>
                            <Input type="text" label="Nom" setValue={v => handleIngredientsChange(index, "name", v)} />
                            <Input type="text" label="Quantité" setValue={v => handleIngredientsChange(index, "quantity", v)} />
                            <Input type="text" label="Unité" setValue={v => handleIngredientsChange(index, "unit", v)} />
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-end mt-2">
                <Button 
                text="Ajouter un ingredient" 
                handle={handleAddIngredient}/>
            </div>  
        </>
    )
}