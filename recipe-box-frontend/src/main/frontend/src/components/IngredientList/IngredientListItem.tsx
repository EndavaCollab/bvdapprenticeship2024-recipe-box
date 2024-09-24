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

    const getQuantityClass = (quantity: number) => {
        if (quantity < 10) return 'low';
        if (quantity < 100) return 'medium';
        return 'high';
    };

    return (
        <tr>
            <td>#{ingredient.id}</td>
            <td>{name}</td>
            <td>{category}</td>
            <td>{unit}</td>
            <td>{kcal}</td>
            <td>{carbs}</td>
            <td>{fat}</td>
            <td>{protein}</td>
            <td>
                <span className={`ingredient-quantity ${getQuantityClass(quantity)}`}>
                    <span className="circle"></span>
                    <span className='ingredient-quantity-text'>{quantity}</span>
                </span>
            </td>
            <td>
                <div className="button-container">
                    <button className="ingredient-button">Edit</button>
                    <button className="ingredient-button">Delete</button>
                </div>
            </td>
        </tr>
    );
}

export default IngredientItem;
