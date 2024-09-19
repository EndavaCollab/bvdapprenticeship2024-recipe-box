import React, {useState} from 'react';
import {useLoaderData, useRouteError} from 'react-router-dom';
import RecipeDetails from '../../components/RecipeView/RecipeDetails';
import RecipeImageDetails from '../../components/RecipeView/RecipeImageDetails';
import {Recipe} from '../../components/RecipeView/types';
import "./RecipeViewPage.css";
import {UserType} from "../../enums/User";

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
    const storedUserId = sessionStorage.getItem("userId");
    const UserId = storedUserId !== null ? parseInt(storedUserId, 10) : undefined;

    const storedRole = sessionStorage.getItem("role");
    const role = storedRole ? (storedRole as UserType) : undefined;



    return (
        <div className="parent-grid">
            <div className="recipe-view-grid">
                {(
                    <>
                        <RecipeDetails
                            userId={UserId}
                            recipeId={recipeDetails.id}
                            name={recipeDetails.name}
                            description={recipeDetails.description}
                            ingredients={recipeDetails.recipeIngredients}
                            userType={role}
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


