
export interface SendRecipe {
    title: string
    description: string
}

export interface Recipe extends SendRecipe {
    id: number
    image: string
}