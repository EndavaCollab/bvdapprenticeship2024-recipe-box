import React, { useState } from "react";
import { Ingredient } from "./types";
import "./RecipeDetails.css";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import { UserType } from "../../enums/User";
import { useNavigate } from "react-router-dom";

interface RecipeDetailsProps {
    recipeId: number;
    userId?: number;
    name: string;
    description: string;
    ingredients: Ingredient[];
    userType?: UserType;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
    recipeId,
    userId,
    name,
    description,
    ingredients,
    userType,
}) => {
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();

    const deleteRecipe = async (
        recipeId: number,
        userId: number | undefined
    ) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        let response;
        try {
            response = await fetch(
                `${backendUrl}/recipes/${recipeId}?userId=${userId ?? null}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete recipe");
            }

            const result = await response.text();
            if (result === "The recipe has been successfully deleted") {
                navigate("/recipes/list");
            } else {
                throw new Error(result);
            }
        } catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) {
                alert("Cannot delete Recipe: " + error.message);
            } else {
                alert("Cannot delete Recipe due to an unknown error.");
            }
        }
    };

    return (
        <div className="recipe-details">
            <h1>{name}</h1>
            {userType === UserType.CHEF && (
                <div className="grid-buttons">
                    <button
                        className="edit-button"
                        onClick={() =>
                            navigate(`/recipes/editRecipe/${recipeId}`)
                        }
                    >
                        Edit
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => setShowDialog(true)}
                    >
                        Delete
                    </button>
                </div>
            )}
            <h3>Description:</h3>
            <p>{description}</p>
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
                {ingredients.map((ingredient) => (
                    <li key={ingredient.ingredientId}>
                        <Check className="check-icon" />{" "}
                        <span className="ingredient-name">
                            {ingredient.name}
                        </span>{" "}
                        {ingredient.quantity} {ingredient.unit}
                    </li>
                ))}
            </ul>

            {showDialog && (
                <>
                    <div
                        className="overlay"
                        onClick={() => setShowDialog(false)}
                        aria-hidden="true"
                    />
                    <div className="dialog">
                        <CloseButton
                            className="dialog-close-button"
                            onClick={() => setShowDialog(false)}
                        />
                        <p>
                            Your recipe will be permanently deleted! <br />
                            <br /> Are you sure?
                        </p>
                        <div className="dialog-buttons">
                            <button
                                className="confirm-button"
                                onClick={() => {
                                    deleteRecipe(recipeId, userId);
                                    setShowDialog(false);
                                }}
                            >
                                YES, DELETE
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => setShowDialog(false)}
                            >
                                NO, CANCEL
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default RecipeDetails;
