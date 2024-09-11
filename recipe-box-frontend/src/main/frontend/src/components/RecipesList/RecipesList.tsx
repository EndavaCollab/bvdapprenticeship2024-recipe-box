import "./RecipesList.css";
import RecipesGrid from "./RecipesGrid";
import Categories from "./Categories";
import React, {useState} from "react";

export default function RecipesList() {
    const [mealType, setMealType] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="recipes-list">
            <Categories
                onChangeMealType={setMealType}
                onChangeSearchQuery={setSearchQuery}
            />
            <RecipesGrid mealType={mealType} searchQuery={searchQuery} />
        </div>
    );
}
