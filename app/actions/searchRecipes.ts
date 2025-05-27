'use server';

import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma';

export async function searchRecipes(
    query: string,
    page: number,
    pageSize: number
) {
    const where: Prisma.RecipeWhereInput = {
        title: {
            contains: query,
            mode: 'insensitive',
        },
    };

    const [recipes, total] = await Promise.all([
        prisma.recipe.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: {
                title: 'asc',
            },
        }),
        prisma.recipe.count({ where }),
    ]);

    return { recipes, total };
}
