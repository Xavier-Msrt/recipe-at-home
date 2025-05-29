'use client';

import IngredientForm from '@/components/IngredientForm';
import StepFrom from '@/components/StepForm';
import { IngredientFormList } from '@/types/Ingredient';
import { RecipeForm } from '@/types/Recipe';
import { StepFormList } from '@/types/Step';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Page() {
    const t = useTranslations('AddPage');

    const [recipe, setRecipe] = useState<RecipeForm>({
        title: '',
        description: '',
    });

    const [picture, setPicture] = useState<File>();

    const [ingredients, setIngredients] = useState<IngredientFormList>([
        { name: '', quantity: 1, unit: '' },
    ]);

    const [steps, setSteps] = useState<StepFormList>([
        { num: 1, description: '' },
    ]);

    const handleTitleChange = (value: string) => {
        setRecipe({ ...recipe, title: value });
    };

    const handleDescriptionChange = (value: string) => {
        setRecipe({ ...recipe, description: value });
    };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPicture(e.target.files[0]);
        }
    };

    const handleCreate = (
        e: React.MouseEvent<React.SetStateAction<HTMLButtonElement>>
    ) => {
        e.preventDefault();
        // TODO
    };

    return (
        <div className="flex justify-center">
            <div>
                <h1 className="text-center text-3xl my-8">{t('title')}</h1>
                <div className="card bg-base-100 shadow-sm p-10">
                    <form>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                {t('title-legend')}
                            </legend>
                            <input
                                type="text"
                                className="input w-full validator"
                                placeholder={t('title-placeholder')}
                                value={recipe.title}
                                onChange={(e) =>
                                    handleTitleChange(e.target.value)
                                }
                                required
                            />

                            <legend className="fieldset-legend">
                                {t('description-legend')}
                            </legend>
                            <textarea
                                className="textarea w-full validator"
                                placeholder={t('description-placeholder')}
                                value={recipe.description}
                                onChange={(e) =>
                                    handleDescriptionChange(e.target.value)
                                }
                            ></textarea>

                            <legend className="fieldset-legend">
                                {t('picture-legend')}{' '}
                            </legend>
                            <input type="file" className="file-input" onChange={handleFileChange}/>
                            <label className="label">
                                {t('picture-max-size')}
                            </label>
                        </fieldset>

                        <IngredientForm
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                        />

                        <StepFrom steps={steps} setSteps={setSteps} />

                        <div className="flex justify-center">
                            <button
                                className="btn btn-wide"
                                onClick={handleCreate}
                            >
                                {t('create-btn')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
