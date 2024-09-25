export interface Ingredient {
    ingredientId: number;
    name: string;
    quantity: number;
    unit: string;
}

enum MealType {
    BREAKFAST = "Breakfast",
    LUNCH = "Lunch",
    DINNER = "Dinner",
    DESSERT = "Dessert",
    SNACK = "Snack",
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
    fileName: string;
    mealType: MealType;
    recipeStatus: "PUBLIC" | "PRIVATE";
}
