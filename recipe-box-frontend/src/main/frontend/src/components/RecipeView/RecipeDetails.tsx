import React from 'react';
import { Ingredient } from './types';
import "./RecipeDetails.css"
import {ReactComponent as Check} from "../../assets/icons/check.svg";

interface RecipeDetailsProps {
    name: string;
    description: string;
    ingredients: Ingredient[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ name, description, ingredients }) => {
    return (
        <div className="recipe-details">
            <h1 style={{fontSize: '3rem'}}>{name}</h1>
            <h3 style={{fontSize: '1.5rem'}}>Description:</h3>
            <p>{description}</p>
            <h3 style={{fontSize: '1.5rem'}}>Ingredients:</h3>
            <ul className="ingredients-list">
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        <Check className="check-icon" /> <span className="ingredient-name">{ingredient.name} </span> {ingredient.quantity} {ingredient.unit}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeDetails;
