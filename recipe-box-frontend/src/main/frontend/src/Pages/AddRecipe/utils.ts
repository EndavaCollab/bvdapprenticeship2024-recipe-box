export interface RecipeAddRequestDTO {
    name: string;
    description: string;
    imageUrl: string | undefined;
    mealType: string;
    ingredients: IngredientRequestDTO[];
    cookingTime: number;
    difficulty: string;
    servings: number;
}

export interface IngredientRequestDTO {
    ingredientID: number;
    ingredientName: string;
    quantity: number;
    unit: string;
}

export interface ImageFile {
    fileName: string;
    fileData: string;
}
export const ingredientOptions = [
    { id: 1, name: 'Flour' },
    { id: 2, name: 'Sugar' },
    { id: 3, name: 'Butter' },
    { id: 4, name: 'Eggs' },
];

export const quantityOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 100, label: '100' },
];

export const preparationHoursValues = [
    { value: 1, label: '1 hour' },
    { value: 2, label: '2 hours' },
    { value: 3, label: '3 hours' },
];

export const preparationMinutesValues = [
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
];

export const difficultyValues = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
];

export const categoryValues = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'snack', label: 'Snack' },
];

export const servingsValues = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
];
