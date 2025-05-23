import { Ingredient } from '@/types/Ingredient';

export default function IngredientListItem({
    ingredient,
}: {
    ingredient: Ingredient;
}) {
    return (
        <div className="flex justify-between">
            <p>{ingredient.name}</p>
            <div>
                <span className="m-2">{ingredient.quantity}</span>
                {ingredient.unit ? <span>{ingredient.unit}</span> : ''}
            </div>
        </div>
    );
}
