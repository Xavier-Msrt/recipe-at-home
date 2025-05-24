'use client';
import { Step } from '@/types/Step';
import { useState } from 'react';
import { Ingredient } from '@/types/Ingredient';
import Button from '@/components/Button';
import { SendRecipe } from '@/types/Recipe';
import FormDetailRecipe from '@/components/RecipeAdd/FormDetailRecipe';
import FormIngredient from '@/components/RecipeAdd/FormIngredient';
import FormStep from '@/components/RecipeAdd/FormStep';
import { useTranslations } from 'next-intl';

export default function AddRecipePage() {
    const t = useTranslations('AddRecipePage');
    const [error, setError] = useState('');

    const [recipe, setRecipe] = useState<SendRecipe>({
        title: '',
        description: '',
    });
    const [picture, setPicture] = useState<File>();

    const [ingredients, setIngredients] = useState<Ingredient[]>([
        {
            id: 0,
            name: '',
            quantity: 0,
            unit: '',
        },
    ]);

    const [steps, setSteps] = useState<Step[]>([
        {
            num: 1,
            description: '',
        },
    ]);

    const handleCreateBtn = async () => {
        const formData = new FormData();

        formData.append('recipe', JSON.stringify(recipe));
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('steps', JSON.stringify(steps));
        if (picture) formData.append('picture', picture);

        const data = await fetch('/api/recipe', {
            method: 'POST',
            body: formData,
        });
        if (data.status !== 201) {
            const body = await data.json();
            setError(body?.error);
        } else {
            setRecipe({
                title: '',
                description: '',
            });
            setIngredients([
                {
                    id: 0,
                    name: '',
                    quantity: 0,
                    unit: '',
                },
            ]);
            setSteps([
                {
                    num: 1,
                    description: '',
                },
            ]);
        }
    };

    return (
        <div className="flex justify-center">
            <div
                className={
                    'w-1/2 shadow-md rounded-lg p-4 ' +
                    (error !== '' ? 'border-2 border-red-600' : '')
                }
            >
                <h1 className="text-2xl font-bold mt-4">{t('title')}</h1>
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
                    {error !== '' ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        ''
                    )}
                    <div className="flex justify-center mt-4">
                        <Button
                            text={t('btn-create')}
                            handle={handleCreateBtn}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
