export interface Ingredient {
    id: number,
    name: string;
    quantity: number;
    unit: string;
}

export interface Recipe {
    id: number;
    ownerId: number;
    name: string;
    description: string;
    recipeIngredients: Ingredient[];
    imageUrl: string;
    preparationTime: number;
    difficulty: string;
    servings: number;
    kcalServing: number;
}
