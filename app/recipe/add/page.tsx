"use client";
import { Step } from "@/types/Step";
import { useState } from "react";
import { Ingredient } from "@/types/Ingredient";
import Button from "@/components/Button";
import { SendRecipe } from "@/types/Recipe";
import FormDetailRecipe from "@/components/RecipeAdd/FormDetailRecipe";
import FormIngredient from "@/components/RecipeAdd/FormIngredient";
import FormStep from "@/components/RecipeAdd/FormStep";
import { useTranslations } from "next-intl";

export default function AddRecipePage() {
  const t = useTranslations("AddRecipePage");

  const [recipe, setRecipe] = useState<SendRecipe>({
    title: "",
    description: "",
  });
  const [picture, setPicture] = useState<File>();

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      name: "",
      quantity: 0,
      unit: "",
    },
  ]);

  const [steps, setSteps] = useState<Step[]>([
    {
      num: 1,
      description: "",
    },
  ]);

  const handleCreateBtn = async () => {
    const formData = new FormData();

    formData.append("recipe", JSON.stringify(recipe));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("steps", JSON.stringify(steps));
    if (picture) formData.append("picture", picture);

    await fetch("/api/recipe", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold mt-4">{t("title")}</h1>
        <form>
          <FormDetailRecipe
            detail={{ recipe, setRecipe }}
            picture={{ picture, setPicture }}
          />
          <FormIngredient
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <FormStep steps={steps} setSteps={setSteps} />

          <div className="flex justify-center mt-4">
            <Button text={t("btn-create")} handle={handleCreateBtn} />
          </div>
        </form>
      </div>
    </div>
  );
}
