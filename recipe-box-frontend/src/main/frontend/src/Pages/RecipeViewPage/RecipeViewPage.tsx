import React, { useState } from 'react';
import {useRouteError, useLoaderData} from 'react-router-dom';
import RecipeDetails from '../../components/RecipeView/RecipeDetails';
import RecipeImageDetails from '../../components/RecipeView/RecipeImageDetails';
import { Recipe } from '../../components/RecipeView/types';
import "./RecipeViewPage.css";

const RecipeViewPage: React.FC = () => {
    const recipeDetails = useLoaderData() as Recipe | {error: string};
    const errorR = useRouteError() as Error;
    const [error] = useState<string | null>(null);

    if ('error' in recipeDetails) {
        return <p>Error: {recipeDetails.error}</p>;
    }

    if (error) {
        return <p>Error: {errorR.message}</p>;
    }


    return (
        <div className="parent-grid">
            <div className="recipe-view-grid">
                {(
                    <>
                        <RecipeDetails
                            name={recipeDetails.name}
                            description={recipeDetails.description}
                            ingredients={recipeDetails.recipeIngredients}
                        />
                        <RecipeImageDetails
                            imageUrl={recipeDetails.imageUrl}
                            time={recipeDetails.preparationTime}
                            difficulty={recipeDetails.difficulty}
                            servings={recipeDetails.servings}
                            calories={recipeDetails.kcalServing}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default RecipeViewPage;


