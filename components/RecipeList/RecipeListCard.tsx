'use client';
import Image from 'next/image';
import Button from '../Button';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { Recipe } from '@/types/Recipe';

export default function RecipeListCard({ recipe }: { recipe: Recipe }) {
    const t = useTranslations('RecipeListCard');

    const handleButtonSee = () => {
        redirect(`/recipe/${recipe.id}`);
    };
    const handleButtonDelete = async () => {
        if (confirm(t('confirm-delete') + ` (${recipe.title})`)) {
            await fetch(`/api/recipe/${recipe.id}`, {
                method: 'DELETE',
            });
        }
    };

    return (
        <div className="rounded-xl shadow-2xl w-1/3">
            <div className="flex justify-center">
                <Image
                    priority={true}
                    alt={t('picture-alt')}
                    src={`/api/recipe/${recipe.id}/picture`}
                    width={1920}
                    height={1080}
                    className="flex justify-center rounded-t-xl"
                />
            </div>
            <div className="m-4">
                <h3 className="text-2xl font-bold break-all">{recipe.title}</h3>
                <div className="mt-4">
                    <p className="break-all">{recipe.description}</p>
                    <div className="flex justify-end-safe mt-4 gap-4">
                        <Button
                            handle={handleButtonDelete}
                            text={t('delete-recipe')}
                        />
                        <Button
                            handle={handleButtonSee}
                            text={t('see-recipe')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
