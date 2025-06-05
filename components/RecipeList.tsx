'use client';

import { Recipe } from '@/generated/prisma';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
    const t = useTranslations('RecipeList');

    const handleView = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        redirect(`/${id}`);
    };

    if (recipes.length === 0) {
        return <p className='flex justify-center font-bold text-2xl'>{t('empty-list')}</p>;
    }

    return (
        <div className="flex justify-center flex-wrap gap-4">
            {recipes.map((recipe: Recipe) => (
                <div
                    key={recipe.id}
                    className="card bg-base-100 w-1/4 shadow-sm"
                >
                    <figure>
                        <Image
                            src="/image.jpg"
                            alt={recipe.title}
                            width="1920"
                            height="1080"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={(e) => handleView(e, recipe.id)}
                            >
                                {t('btn-see')}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
