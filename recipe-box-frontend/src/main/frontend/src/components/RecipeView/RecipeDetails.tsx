import React, {useState} from 'react';
import { Ingredient } from './types';
import "./RecipeDetails.css"
import {ReactComponent as Check} from "../../assets/icons/check.svg";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import {UserType} from "../../enums/User";
import {useNavigate} from "react-router-dom";

interface RecipeDetailsProps {
    recipeId:number,
    userId:number,
    name: string;
    description: string;
    ingredients: Ingredient[];
    userType?: UserType;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId, userId, name, description, ingredients, userType }) => {

    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = () =>{
        setShowDialog(true);
    }

    const handleDialogClose = () =>{
        setShowDialog(false);
    }

    const deleteRecipe = async (recipeId: number, userId: number) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        try {
            const response = await fetch(`${backendUrl}/recipes/${recipeId}?userId=${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }

            const result = await response.text();
            navigate('/recipes/list');
        } catch (error) {
            console.error('Error:', error);
            console.log("Cannot delete Recipe");
        }
    };

    const handleDeleteConfirm = () =>{
        deleteRecipe(recipeId,userId);
        setShowDialog(false);
    }

    return (
        <div className="recipe-details">
            <h1 style={{fontSize: '3rem'}}>{name}</h1>
            {
                userType === UserType.CHEF && (
                    <div className="grid-buttons">
                        <button className="edit-button">Edit</button>
                        <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
                    </div>
                )
            }
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


            {showDialog && (
                <>
                    <div className="overlay" onClick={handleDialogClose}></div>
                    <div className="dialog">
                        <CloseButton
                            className="dialog-close-button"
                            onClick={handleDialogClose}
                        />
                        <p>Your recipe will be permanently deleted! <br/>
                            <br/>
                            Are you sure?</p>
                        <div className="dialog-buttons">
                            <button className="confirm-button" onClick={handleDeleteConfirm}>YES, DELETE</button>
                            <button className="cancel-button" onClick={handleDialogClose}>NO, CANCEL</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default RecipeDetails;
