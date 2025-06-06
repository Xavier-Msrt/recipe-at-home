'use client';

import IngredientForm from '@/components/IngredientForm';
import StepFrom from '@/components/StepForm';
import { IngredientFormList } from '@/types/Ingredient';
import { RecipeForm } from '@/types/Recipe';
import { StepFormList } from '@/types/Step';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { createRecipe } from '../actions/createRecipe';
import { redirect } from 'next/navigation';

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

    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const handleCreate = async (
        e: React.MouseEvent<React.SetStateAction<HTMLButtonElement>>
    ) => {
        e.preventDefault();
        if (!picture) return;

        const result = await createRecipe(recipe, ingredients, steps, picture);
        if (!result.success) {
            setErrors(result.errors || {});
            return;
        }

        setErrors({});
        redirect(`/${result.recipe?.id}`);
    };

    return (
        <div className="flex justify-center mt-4 ">
            <div className="card bg-base-100 shadow-sm py-6 px-8 ">
                <h1 className="text-center text-3xl ">{t('title')}</h1>

                {Object.entries(errors).map(([key, value]) =>
                    value ? (
                        <div
                            key={key}
                            role="alert"
                            className="alert alert-error my-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{t(`errors.${key}`)}</span>
                        </div>
                    ) : null
                )}

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
                            onChange={(e) => handleTitleChange(e.target.value)}
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
                        <input
                            type="file"
                            className="file-input"
                            onChange={handleFileChange}
                        />
                        <label className="label">{t('picture-max-size')}</label>
                    </fieldset>

                    <IngredientForm
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                    />

                    <StepFrom steps={steps} setSteps={setSteps} />

                    <div className="flex justify-center">
                        <button className="btn btn-wide" onClick={handleCreate}>
                            {t('create-btn')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
