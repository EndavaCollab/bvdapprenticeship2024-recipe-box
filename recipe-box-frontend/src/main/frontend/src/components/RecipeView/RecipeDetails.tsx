import React, { useState } from "react";
import { Ingredient } from "./types";
import "./RecipeDetails.css";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import { UserType } from "../../enums/User";
import { useNavigate } from "react-router-dom";
import { storedUserId } from "../../Utils/User";
import Checkbox from "../Checkbox/Checkbox";

interface RecipeDetailsProps {
    recipeId: number;
    userId?: number;
    ownerId: number;
    name: string;
    description: string;
    ingredients: Ingredient[];
    userType?: UserType;
    userIngredients: {
        id: number;
        name: string;
        unit: string;
        quantity: number;
    }[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
    recipeId,
    userId,
    ownerId,
    name,
    description,
    ingredients = [],
    userType,
    userIngredients,
}) => {
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const availableIngredients = Array.isArray(userIngredients)
        ? ingredients.filter((ingredient) =>
              userIngredients.find(
                  (userIngredient) =>
                      ingredient.ingredientId === userIngredient.id &&
                      ingredient.quantity <= userIngredient.quantity
              )
          )
        : [];

    const unavailableIngredients = ingredients.filter(
        (ingredient) => !availableIngredients.includes(ingredient)
    );

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
            {(userType === UserType.ADMIN || ownerId === storedUserId()) && (
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
            {userType === UserType.CHEF ? (
                <div className="available-and-unavailable-ingredients">
                    <div>
                        <h3>Available ingredients:</h3>
                        {availableIngredients.map((ingredient) => (
                            <Checkbox
                                key={`${ingredient.ingredientId}`}
                                isAvailable={true}
                                ingredientName={ingredient.name}
                                quantity={ingredient.quantity}
                                unit={ingredient.unit}
                            />
                        ))}
                    </div>
                    <div>
                        <h3>Unavailable ingredients:</h3>
                        {unavailableIngredients.map((ingredient) => (
                            <Checkbox
                                key={`${ingredient.ingredientId}`}
                                isAvailable={false}
                                ingredientName={ingredient.name}
                                quantity={ingredient.quantity}
                                unit={ingredient.unit}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <>
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
                </>
            )}

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
