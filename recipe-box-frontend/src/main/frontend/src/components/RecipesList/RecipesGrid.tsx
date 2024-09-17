import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import "./RecipesGrid.css";
import { backendUrl } from "../../App";

interface Recipe {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    mealType: string;
}

interface RecipesGridProps {
    userId?: number,
    privateRecipes?: boolean;
    mealType?: string;
    searchQuery?: string;
}
export default function RecipesGrid({
    userId = 1,
    privateRecipes = false,
    mealType,
    searchQuery = "",
}: RecipesGridProps) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        let url = `${backendUrl}/recipes/${mealType ? `?mealType=${mealType}` : ""}`;
        console.log(mealType);

        fetch(
            privateRecipes ? `${backendUrl}/recipes/search/private?userId=${userId}` : 
            searchQuery ? `${backendUrl}/recipes/search?recipeName=${searchQuery}${mealType ? `&mealType=${mealType}` : ""}` : url,
            {
                signal,
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Bad response: ${response.status}`);
                }
                return response.json();
            })
            .then((data: Recipe[]) => {
                if (!signal.aborted) {
                    setRecipes(data);
                }
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    console.error("Fetch error:", error);
                }
            });

        return () => {
            controller.abort();
        };
    }, [privateRecipes, mealType, searchQuery]);


    return (
        <div className="recipes-grid">
            {recipes.map((recipe) => (
                <RecipeCard
                    id={recipe.id}
                    key={recipe.id}
                    title={recipe.name}
                    description={recipe.description}
                    imageUrl={recipe.imageUrl}
                />
            ))}
        </div>
    );
}
