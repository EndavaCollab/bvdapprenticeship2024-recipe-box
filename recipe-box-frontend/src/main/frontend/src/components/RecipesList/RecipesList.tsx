import "./RecipesList.css";
import RecipesGrid from "./RecipesGrid";
import Categories from "./Categories";
import React, { useState } from "react";

interface RecipesListProps {
    privateRecipes?: boolean;
}

export default function RecipesList({
    privateRecipes = false,
}: RecipesListProps) {
    const [mealType, setMealType] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="recipes-list">
            <Categories
                onChangeMealType={setMealType}
                onChangeSearchQuery={setSearchQuery}
            />

            <RecipesGrid
                key={`${mealType}-${searchQuery}`}
                privateRecipes={privateRecipes}
                mealType={mealType}
                searchQuery={searchQuery}
            />
        </div>
    );
}
