'use server';

import minioClient from '@/lib/minio';
import { prisma } from '@/lib/prisma';

export async function getRecipeById(id: number) {
    const recipe = await prisma.recipe.findUnique({
        where: { id },
        include: {
            ingredients: true,
            steps: true,
        },
    });

    if (!recipe) {
        return { error: true };
    }

    let picture;
    try {
        picture = await minioClient.presignedGetObject(
            'recipes',
            recipe.picture,
            60 * 60
        );
    } catch (err) {
        console.error('MinIO error:', err);
    }

    return { recipe, picture };
}
