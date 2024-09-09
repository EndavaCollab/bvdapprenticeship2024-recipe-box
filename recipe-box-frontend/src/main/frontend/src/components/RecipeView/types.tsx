export interface Ingredient {
    id: number,
    name: string;
    quantity: number;
    unit: string;
}

export interface Recipe {
    name: string;
    description: string;
    recipeIngredients: Ingredient[];
    imageUrl: string;
    preparationTime: number;
    difficulty: string;
    servings: number;
    kcalServing: number;
}
