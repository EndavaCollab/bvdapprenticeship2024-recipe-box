import React from "react";
import IngredientItem from "./IngredientListItem";

interface Ingredient {
    id: number;
    name: string;
    category: string;
    unit: string;
    kcal: number;
    carbs: number;
    fat: number;
    protein: number;
    quantity: number;
}

const ingredients: Ingredient[] = [
    { id: 1, name: 'Ingredient 1', category: 'Grain', unit: 'g', kcal: 100, carbs: 100, fat: 100, protein: 100, quantity: 100 },
    { id: 2, name: 'Ingredient 2', category: 'Nuts', unit: 'ml', kcal: 30, carbs: 30, fat: 30, protein: 30, quantity: 30 },
    // Add more ingredient data here
];
const IngredientList: React.FC = () => {
    return(
        <table>
            <thead>
            <tr>
                <th></th>
                <th>Ingredient</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Kcal</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th>Protein</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {ingredients.map((ingredient: Ingredient) => (
                <IngredientItem key={ingredient.id} ingredient={ingredient}/>
            ))}
            </tbody>
        </table>
    );
}

export default IngredientList;
