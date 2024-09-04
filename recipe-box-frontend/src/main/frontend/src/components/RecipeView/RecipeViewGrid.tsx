import React, { useState, useEffect } from 'react';
import RecipeDetails from './RecipeDetails';
import RecipeImageDetails from './RecipeImageDetails';
import { Recipe } from './types';
import "./RecipeViewGrid.css";

const RecipeViewGrid: React.FC = () => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const recipeId = 10;
        const userId = 1;

        fetch(`http://localhost:8080/recipes/${recipeId}?userId=${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch the recipe.');
                }
                return response.json();
            })
            .then(data => {
                setRecipe(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="parent-grid">
            <div className="recipe-view-grid">
                {recipe && (
                    <>
                        <RecipeDetails
                            name={recipe.name}
                            description={recipe.description}
                            ingredients={recipe.recipeIngredients}
                        />
                        <RecipeImageDetails
                            imageUrl={recipe.imageUrl}
                            time={recipe.preparationTime}
                            difficulty={recipe.difficulty}
                            servings={recipe.servings}
                            calories={recipe.kcalServing}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default RecipeViewGrid;
