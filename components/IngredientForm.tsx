import { Ingredient } from '@/generated/prisma';
import type { IngredientForm, IngredientFormList } from '@/types/Ingredient';
import { useTranslations } from 'next-intl';

export default function IngredientForm({
    ingredients,
    setIngredients,
}: {
    ingredients: IngredientFormList;
    setIngredients: React.Dispatch<React.SetStateAction<IngredientFormList>>;
}) {
    const t = useTranslations('IngredientForm');

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIngredients([...ingredients, { name: '', quantity: 1, unit: '' }]);
    };

    const handleFieldChange = (
        index: number,
        field: keyof IngredientForm,
        value: string | number
    ) => {
        setIngredients(
            ingredients.map((ingredient, i) =>
                index === i ? { ...ingredient, [field]: value } : ingredient
            )
        );
    };

    const handleRemoveIngredient = (
        e: React.MouseEvent<React.SetStateAction<HTMLButtonElement>>,
        index: number
    ) => {
        e.preventDefault();
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    return (
        <>
            {ingredients.map((ingredient: Partial<Ingredient>, index) => {
                return (
                    <div key={index} className="flex items-end gap-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                {t('name')}
                            </legend>
                            <input
                                type="text"
                                className="input validator"
                                placeholder={t('quantity-placeholder')}
                                value={ingredient.name}
                                onChange={(e) =>
                                    handleFieldChange(
                                        index,
                                        'name',
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                {t('quantity')}
                            </legend>
                            <input
                                type="number"
                                className="input validator"
                                min={1}
                                max={999}
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    handleFieldChange(
                                        index,
                                        'quantity',
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </fieldset>

                        <fieldset className="fieldset flex">
                            <legend className="fieldset-legend">
                                {t('unite')}
                            </legend>
                            <input
                                type="text"
                                className="input validator"
                                placeholder={t('unite-placeholder')}
                                value={ingredient.unit ?? ''}
                                onChange={(e) =>
                                    handleFieldChange(
                                        index,
                                        'unit',
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </fieldset>
                        {index !== 0 && (
                            <div className="flex flex-col justify-end pb-[4px]">
                                <button
                                    className="btn btn-error"
                                    onClick={(e) =>
                                        handleRemoveIngredient(e, index)
                                    }
                                >
                                    −
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}

            <div className="flex justify-end my-4">
                <button
                    className="btn btn-active"
                    onClick={handleAddIngredient}
                >
                    {t('add-ingredient-btn')}
                </button>
            </div>
        </>
    );
}
