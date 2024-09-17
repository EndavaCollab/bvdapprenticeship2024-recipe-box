import React from 'react';
import './IngredientListItem.css';

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

interface IngredientItemProps {
    ingredient: Ingredient;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient }) => {
    const { name, category, unit, kcal, carbs, fat, protein, quantity } = ingredient;

    return (
        <tr>
            <td></td>
            <td>{name}</td>
            <td>{category}</td>
            <td>{unit}</td>
            <td>{kcal}</td>
            <td>{carbs}</td>
            <td>{fat}</td>
            <td>{protein}</td>
            <td>
        <span className={`quantity ${quantity > 100 ? 'high' : quantity > 50 ? 'medium' : 'low'}`}>
          {quantity}
        </span>
            </td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    );
}

export default IngredientItem;
