'use server';

import prisma from '@/lib/prisma';

export async function searchRecipes(query: string) {
    return await prisma.recipe.findMany({
        where: {
            title: {
                contains: query,
                mode: 'insensitive',
            },
        },
    });
}
