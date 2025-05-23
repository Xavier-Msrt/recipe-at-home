import { Ingredient } from '@/types/Ingredient';
import { Dispatch, SetStateAction } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useTranslations } from 'next-intl';

export default function FormIngredient({
    ingredients,
    setIngredients,
}: {
    ingredients: Ingredient[];
    setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
}) {
    const t = useTranslations('FormIngredient');

    const handleIngredientsChange = (
        index: number,
        key: keyof Ingredient,
        value: string
    ) => {
        const updatedIngredient = [...ingredients];
        updatedIngredient[index] = {
            ...updatedIngredient[index],
            [key]: value,
        };
        setIngredients(updatedIngredient);
    };

    const handleAddIngredient = () => {
        const originalIngredients = [...ingredients];
        originalIngredients.push({
            id: 0,
            name: '',
            quantity: 0,
            unit: '',
        });
        setIngredients(originalIngredients);
    };

    return (
        <>
            <h3 className="text-xl font-bold">Ingredients</h3>
            <div className="ml-4">
                {ingredients.map((v, index) => {
                    return (
                        <div className="flex gap-4" key={index}>
                            <Input
                                type="text"
                                label={t('name')}
                                value={v.name}
                                setValue={(v) =>
                                    handleIngredientsChange(index, 'name', v)
                                }
                            />
                            <Input
                                type="text"
                                label={t('quantity')}
                                value={v.quantity}
                                setValue={(v) =>
                                    handleIngredientsChange(
                                        index,
                                        'quantity',
                                        v
                                    )
                                }
                            />
                            <Input
                                type="text"
                                label={t('unit')}
                                value={v.unit}
                                setValue={(v) =>
                                    handleIngredientsChange(index, 'unit', v)
                                }
                            />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-end mt-2">
                <Button text={t('btn-add')} handle={handleAddIngredient} />
            </div>
        </>
    );
}
